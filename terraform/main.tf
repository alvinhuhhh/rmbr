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

# Create a VPC
resource "aws_vpc" "jabberwocky" {
  cidr_block = "10.0.0.0/24"

  tags = {
    Name = "Jabberwocky"
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
}