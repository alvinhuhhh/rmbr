output "web_public_ip_address" {
  value = aws_instance.jabberwocky_web.public_ip
}