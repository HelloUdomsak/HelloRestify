# define firewall rules here
# use firewall/ingress_allow module to allow incoming traffic

module "fw_ssh" {
  source      = "./modules/firewall.community/ingress-allow"
  name        = "basic-web-configuration"
  description = "Allow basic web application port "
  network     = "${module.my_network.name}"
  protocol    = "tcp"
  ports       = ["22","80","443"] 
}
