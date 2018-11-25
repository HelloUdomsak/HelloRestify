output "cluster_node1_static_ip" {
  value = "${google_compute_global_address.cluster_node1_static_ip.address}"
}

output "cluster_node2_static_ip" {
  value = "${google_compute_address.cluster_node2_static_ip.address}"
}

output "kubconfig" {
  value = " ... \nRun command to configure access via kubectl:\n$ gcloud container clusters get-credentials ${module.my_cluster.name} --zone ${var.zone} --project ${var.project_id}"
}
