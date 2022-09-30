variable "api_ssh_public_key" {
  description = "SSH public key for API EC2 instance"
  type        = string
  default     = ""
}

variable "web_ssh_public_key" {
  description = "SSH public key for Web EC2 instance"
  type        = string
  default     = ""
}