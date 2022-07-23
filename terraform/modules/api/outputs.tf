output "api_public_ip_address" {
  value = aws_instance.jabberwocky_api.public_ip
}