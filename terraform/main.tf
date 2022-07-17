terraform {
  cloud {
    organization = "jjjabberwocky"
    workspaces {
      name = "Jabberwocky-Workspace"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

# Configure the AWS Provider
provider "aws" {
  region = "ap-southeast-1"
}

# Configure us-east-1 provider for use with public ECR repository
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

# Create a VPC
resource "aws_vpc" "jabberwocky" {
  cidr_block           = "10.0.0.0/24"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "Jabberwocky VPC"
  }
}

# Create IGW within VPC
resource "aws_internet_gateway" "jabberwocky-igw" {
  vpc_id = aws_vpc.jabberwocky.id

  tags = {
    Name = "Jabberwocky IGW"
  }
}

# Create a subnet in VPC
resource "aws_subnet" "jabberwocky-subnet" {
  vpc_id     = aws_vpc.jabberwocky.id
  cidr_block = "10.0.0.0/24"

  tags = {
    Name = "Jabberwocky Subnet"
  }
}

# Create route table
resource "aws_route_table" "jabberwocky-public" {
  vpc_id = aws_vpc.jabberwocky.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.jabberwocky-igw.id
  }

  tags = {
    Name = "Jabberwocky Route Table"
  }
}

# Create security group
resource "aws_security_group" "jabberwocky-sg" {
  vpc_id = aws_vpc.jabberwocky.id

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Jabberwocky SG"
  }
}

# Create IAM role for autoscaling group
data "aws_iam_policy_document" "ecs_agent" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_agent" {
  name               = "ecs-agent"
  assume_role_policy = data.aws_iam_policy_document.ecs_agent.json
}

resource "aws_iam_role_policy_attachment" "ecs_agent" {
  role       = aws_iam_role.ecs_agent.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs_agent" {
  name = "ecs-agent"
  role = aws_iam_role.ecs_agent.name
}

# Create autoscaling group from template
resource "aws_launch_configuration" "ecs_launch_config" {
  name_prefix          = "jabberwocky-asg-lc"
  image_id             = "ami-094d4d00fd7462815"
  iam_instance_profile = aws_iam_instance_profile.ecs_agent.name
  security_groups      = ["${aws_security_group.jabberwocky-sg.id}"]
  user_data            = "#!/bin/bash\necho ECS_CLUSTER=${aws_ecs_cluster.jabberwocky-api-cluster.name} >> /etc/ecs/ecs.config"
  instance_type        = "t2.micro"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "jabberwocky-asg" {
  name                 = "jabberwocky-asg"
  vpc_zone_identifier  = [aws_subnet.jabberwocky-subnet.id]
  launch_configuration = aws_launch_configuration.ecs_launch_config.name_prefix

  desired_capacity = 1
  min_size         = 1
  max_size         = 1
}

# Create S3 bucket for frontend hosting
resource "aws_s3_bucket" "jabberwocky-web" {
  bucket = "jabberwocky-web"

  tags = {
    Name = "Jabberwocky Web"
  }
}

# Configure S3 bucket ACL
resource "aws_s3_bucket_acl" "jabberwocky-web-acl" {
  bucket = aws_s3_bucket.jabberwocky-web.id
  acl    = "public-read"
}

# Configure S3 bucket policy
resource "aws_s3_bucket_policy" "jabberwocky-web-policy" {
  bucket = aws_s3_bucket.jabberwocky-web.id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "PublicReadGetObject",
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::jabberwocky-web/*"
      }
    ]
  })
}

# Configure S3 bucket website hosting
resource "aws_s3_bucket_website_configuration" "jabberwocky-web-config" {
  bucket = aws_s3_bucket.jabberwocky-web.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

# Create ECR repository
resource "aws_ecrpublic_repository" "jabberwocky-api" {
  provider = aws.us_east_1

  repository_name = "jabberwocky-api"

  catalog_data {
    description       = "Repository for Jabberwocky API"
    operating_systems = ["Linux"]
  }
}

# Create ECS cluster
resource "aws_ecs_cluster" "jabberwocky-api-cluster" {
  name = "jabberwocky-api-cluster"
}

# Create ECS task definition
resource "aws_ecs_task_definition" "jabberwocky-api-task-definition" {
  family = "jabberwocky-api"
  container_definitions = jsonencode([
    {
      "name" : "jabberwocky-api",
      "image" : "public.ecr.aws/f4k7k9n9/jabberwocky-api:latest",
      "cpu" : 512,
      "memory" : 1024,
      "essential" : true,
      "portMappings" : [
        {
          "containerPort" : 3000,
          "hostPort" : 3000,
        }
      ],
      "environment" : [
        {
          "name" : "PORT",
          "value" : "3000"
        },
        {
          "name" : "DB_CONNECTION_STRING",
          "value" : "mongodb+srv://admin:12wq%21%40WQ@todo.dacgkfn.mongodb.net/todo?retryWrites=true&w=majority"
        }
      ]
    }
  ])
}

# Create ECS service
resource "aws_ecs_service" "jabberwocky-api" {
  name            = "jabberwocky-api"
  cluster         = aws_ecs_cluster.jabberwocky-api-cluster.id
  task_definition = aws_ecs_task_definition.jabberwocky-api-task-definition.arn
  desired_count   = 1
}