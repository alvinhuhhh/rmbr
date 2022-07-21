resource "aws_instance" "jabberwocky_test" {
  subnet_id = var.jabberwocky_public_subnet_id

  ami = var.ec2_ami
  instance_type = var.ec2_instance_type
  associate_public_ip_address = true
}