resource "aws_key_pair" "jabberwocky_web" {
  key_name = "jabberwocky-web"
  public_key = var.ssh_public_key
}

resource "aws_instance" "jabberwocky_web" {
  subnet_id = var.jabberwocky_public_subnet_id

  ami = var.ec2_ami
  instance_type = var.ec2_instance_type
  private_ip = var.ec2_private_ip
  associate_public_ip_address = true

  iam_instance_profile = var.ecs_agent_instance_profile_name
  security_groups = ["${var.sg_id}"]
  key_name = aws_key_pair.jabberwocky_web.key_name

  user_data = "#!/bin/bash\necho ECS_CLUSTER=jabberwocky-web >> /etc/ecs/ecs.config"

  tags = {
    Name = "Jabberwocky Web ECS Instance"
  }
}

# Create ECS cluster
resource "aws_ecs_cluster" "jabberwocky_web" {
  name = "jabberwocky-web"
}