resource "google_compute_global_address" "cluster_node1_static_ip" {
  name = "cluster-node1-static-ip"
}

resource "google_compute_address" "cluster_node2_static_ip" {
  name = "cluster-node2-static-ip"
}
