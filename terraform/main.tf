terraform {
  cloud {
    organization = "alvinhuhhh"
    workspaces {
      name = "Rmbr"
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

  app_name    = "Rmbr"
  vpc_cidr    = "10.0.0.0/24"
  public_cidr = "10.0.0.0/24"
}

# Create ECR repositories
module "ecr" {
  source = "./modules/ecr"

  api_ecr_repository_name = "rmbr-api"
  web_ecr_repository_name = "rmbr-web"
}

# Create ECS IAM instance profile
module "iam" {
  source = "./modules/iam"
}

# Create API ECS cluster
module "api" {
  source = "./modules/api"

  ec2_ami           = "ami-08d3dadd770d42821"
  ec2_instance_type = "t4g.nano"
  ec2_private_ip    = "10.0.0.24"

  public_subnet_id                = module.vpc.public_subnet_id
  ecs_agent_instance_profile_name = module.iam.ecs_agent_instance_profile_name
  sg_id                           = module.vpc.api_sg_id
  ssh_public_key                  = var.api_ssh_public_key
}

# Create Web ECS cluster
module "web" {
  source = "./modules/web"

  ec2_ami           = "ami-08d3dadd770d42821"
  ec2_instance_type = "t4g.nano"
  ec2_private_ip    = "10.0.0.25"

  public_subnet_id                = module.vpc.public_subnet_id
  ecs_agent_instance_profile_name = module.iam.ecs_agent_instance_profile_name
  sg_id                           = module.vpc.web_sg_id
  ssh_public_key                  = var.web_ssh_public_key
}