output "vpc_id" {
  value = aws_vpc.app_vpc.id
}

output "public_subnet_id" {
  value = aws_subnet.app_public_subnet.id
}

output "api_sg_id" {
  value = aws_security_group.api_sg.id
}

output "web_sg_id" {
  value = aws_security_group.web_sg.id
}