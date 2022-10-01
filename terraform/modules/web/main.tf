resource "aws_key_pair" "rmbr_web" {
  key_name   = "rmbr-web"
  public_key = var.ssh_public_key
}

resource "aws_instance" "rmbr_web" {
  subnet_id = var.public_subnet_id

  ami                         = var.ec2_ami
  instance_type               = var.ec2_instance_type
  private_ip                  = var.ec2_private_ip
  associate_public_ip_address = false

  iam_instance_profile = var.ecs_agent_instance_profile_name
  security_groups      = ["${var.sg_id}"]
  key_name             = aws_key_pair.rmbr_web.key_name

  user_data = "#!/bin/bash\necho ECS_CLUSTER=rmbr-web >> /etc/ecs/ecs.config"

  tags = {
    Name = "Rmbr Web ECS Instance"
  }
}

resource "aws_eip" "rmbr_web" {
  instance = aws_instance.rmbr_web.id
  vpc      = true
}

# Create ECS cluster
resource "aws_ecs_cluster" "rmbr_web" {
  name = "rmbr-web"
}