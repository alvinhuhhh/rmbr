output "jabberwocky_vpc_id" {
  value = aws_vpc.jabberwocky_vpc.id
}

output "jabberwocky_public_subnet_id" {
  value = aws_subnet.jabberwocky_public_subnet.id
}

output "jabberwocky_private_subnet_id" {
  value = aws_subnet.jabberwocky_private_subnet.id
}