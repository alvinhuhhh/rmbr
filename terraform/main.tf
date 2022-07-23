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

  vpc_cidr     = "10.0.0.0/24"
  public_cidr  = "10.0.0.0/28"
  private_cidr = "10.0.0.16/28"
}