resource "aws_vpc" "jabberwocky_vpc" {
  cidr_block = var.vpc_cidr

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

resource "aws_subnet" "jabberwocky_private_subnet" {
  vpc_id = aws_vpc.jabberwocky_vpc.id

  cidr_block = var.private_cidr

  tags = {
    Name = "Jabberwocky Private Subnet"
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

resource "aws_route_table" "jabberwocky_private_route_table" {
  vpc_id = aws_vpc.jabberwocky_vpc.id

  tags = {
    Name = "Jabberwocky Private Route Table"
  }
}

resource "aws_route_table_association" "private" {
  subnet_id = aws_subnet.jabberwocky_private_subnet.id
  route_table_id = aws_route_table.jabberwocky_private_route_table.id
}

resource "aws_security_group" "jabberwocky_public_sg" {
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
    Name = "Jabberwocky Public Security Group"
  }
}

resource "aws_security_group" "jabberwocky_private_sg" {
  vpc_id = aws_vpc.jabberwocky_vpc.id

  tags = {
    Name = "Jabberwocky Private Security Group"
  }
}