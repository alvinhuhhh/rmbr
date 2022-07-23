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

# Create VPC
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr    = "10.0.0.0/24"
  public_cidr = "10.0.0.0/24"
}

# Create ECR repositories
module "ecr" {
  source = "./modules/ecr"

  api_ecr_repository_name = "jabberwocky-api"
  web_ecr_repository_name = "jabberwocky-web"
}

# Create ECS IAM instance profile
module "iam" {
  source = "./modules/iam"
}

# Create API ECS cluster
module "api" {
  source = "./modules/api"

  ec2_ami           = "ami-08222ba0572c64812"
  ec2_instance_type = "t2.micro"

  jabberwocky_public_subnet_id    = module.vpc.jabberwocky_public_subnet_id
  ecs_agent_instance_profile_name = module.iam.ecs_agent_instance_profile_name
  sg_id                           = module.vpc.api_sg_id
  ssh_public_key                  = var.api_ssh_public_key
}

# Create Web ECS cluster
module "web" {
  source = "./modules/web"

  ec2_ami           = "ami-08222ba0572c64812"
  ec2_instance_type = "t2.micro"

  jabberwocky_public_subnet_id    = module.vpc.jabberwocky_public_subnet_id
  ecs_agent_instance_profile_name = module.iam.ecs_agent_instance_profile_name
  sg_id                           = module.vpc.web_sg_id
  ssh_public_key                  = var.web_ssh_public_key
}