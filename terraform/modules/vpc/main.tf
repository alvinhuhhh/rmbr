resource "aws_vpc" "app_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.app_name} VPC"
  }
}

resource "aws_subnet" "app_public_subnet" {
  vpc_id = aws_vpc.app_vpc.id

  cidr_block = var.public_cidr

  tags = {
    Name = "${var.app_name} Public Subnet"
  }
}

resource "aws_internet_gateway" "app_igw" {
  vpc_id = aws_vpc.app_vpc.id

  tags = {
    Name = "${var.app_name} IGW"
  }
}

resource "aws_route_table" "app_public_route_table" {
  vpc_id = aws_vpc.app_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.app_igw.id
  }

  tags = {
    Name = "${var.app_name} Public Route Table"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.app_public_subnet.id
  route_table_id = aws_route_table.app_public_route_table.id
}

resource "aws_security_group" "api_sg" {
  vpc_id = aws_vpc.app_vpc.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["121.6.101.96/32"]
  }

  ingress {
    description = "Allow ping"
    from_port   = 8
    to_port     = 0
    protocol    = "icmp"
  }

  ingress {
    description = "Allow Internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name} API Security Group"
  }
}

resource "aws_security_group" "web_sg" {
  vpc_id = aws_vpc.app_vpc.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["121.6.101.96/32"]
  }

  ingress {
    description = "Allow ping"
    from_port   = 8
    to_port     = 0
    protocol    = "icmp"
  }

  ingress {
    description = "Allow Internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name} Web Security Group"
  }
}