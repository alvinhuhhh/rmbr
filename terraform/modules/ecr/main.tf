provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

resource "aws_ecrpublic_repository" "api" {
  provider = aws.us_east_1

  repository_name = var.api_ecr_repository_name
}

resource "aws_ecrpublic_repository" "web" {
  provider = aws.us_east_1

  repository_name = var.web_ecr_repository_name
}