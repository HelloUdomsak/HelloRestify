module "my_network" {
  source = "./modules/vpc.community"
  name   = "${var.ntw_name}"
}

# create cluster
module "my_cluster" {
  source             = "./modules/cluster.community"
  name               = "${var.name}"
  description        = "${var.description}"
  zone               = "${var.zone}"
  initial_node_count = "${var.initial_node_count}"
  network            = "${module.my_network.name}"
}