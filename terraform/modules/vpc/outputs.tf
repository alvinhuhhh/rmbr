output "jabberwocky_vpc_id" {
  value = aws_vpc.jabberwocky_vpc.id
}

output "jabberwocky_public_subnet_id" {
  value = aws_subnet.jabberwocky_public_subnet.id
}

output "api_sg_id" {
  value = aws_security_group.api_sg.id
}

output "web_sg_id" {
  value = aws_security_group.web_sg.id
}