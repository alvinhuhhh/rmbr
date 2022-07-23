resource "aws_vpc" "jabberwocky_vpc" {
  cidr_block = var.vpc_cidr
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "Jabberwocky VPC"
  }
}

resource "aws_subnet" "jabberwocky_public_subnet" {
  vpc_id = aws_vpc.jabberwocky_vpc.id

  cidr_block = var.public_cidr

  tags = {
    Name = "Jabberwocky Public Subnet"
  }
}

resource "aws_internet_gateway" "jabberwocky_igw" {
  vpc_id = aws_vpc.jabberwocky_vpc.id

  tags = {
    Name = "Jabberwocky IGW"
  }
}

resource "aws_route_table" "jabberwocky_public_route_table" {
  vpc_id = aws_vpc.jabberwocky_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.jabberwocky_igw.id
  }

  tags = {
    Name = "Jabberwocky Public Route Table"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id = aws_subnet.jabberwocky_public_subnet.id
  route_table_id = aws_route_table.jabberwocky_public_route_table.id
}

resource "aws_security_group" "api_sg" {
  vpc_id = aws_vpc.jabberwocky_vpc.id

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Jabberwocky API Security Group"
  }
}

resource "aws_security_group" "web_sg" {
  vpc_id = aws_vpc.jabberwocky_vpc.id

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Jabberwocky Web Security Group"
  }
}