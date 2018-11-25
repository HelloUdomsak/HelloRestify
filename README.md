# HelloRestify
This is HelloWorld project that represent Restify usage with Mongoose  

## NOTE

* This helloworld dev base on Windows OS.

# Prerequisite 

* **Require**  kubectl 
* **Require**  gcloud sdk with authentication 
* **Require**  kubectl
* **Optional** chocolatey ( choco )

# Component basic Install 

Install with choco ( base on my Laptop )

```
choco install -y vscode 7zip Cmder git gcloudsdk kubernetes-cli composer php python2 vcredist2015 nodejs vagrant

```
Sometime application can buggy so you will need additinal tool for dealing with. 

Download sysinternal suite from here: https://download.sysinternals.com/files/SysinternalsSuite.zip  


# Customize 

* I use Trafilk ingress with Letencrypt not binding pod directly to cluster IP.  

# Deployment 

* Image store on Docker Hub ( https://hub.docker.com ) 

* POD ( Container to run app ) get VARIABLE configuration and secret from Namespace, So POD ( container to run app ) can be run flexible no need to hardcode confguration just use env.

* Configuration and Secret have spearate with Secret value are encrypt but configuration not yet. this is best practise for security run.

Firstly you need to auticate with GCP service account before, Then authencate and deploy.

**NOTE** One options to use Google Cloud build as your CI, Currently i'm not include in this repo. stay tune. 


### Authentication 

```
gcloud auth activate-service-account --key-file={ your key file get from google }
gcloud auth application-default login --account   619115993177-compute@developer.gserviceaccount.com

# In case you use gcr.io need to config environment so we install more component.

gcloud components install docker-credential-gcr

```
### Check authenticate 

```
gcloud auth application-default print-access-token
```
### Setting up Google Cloud Build

Otional create Google Cloud Build for trigger ( CI ) in my case currently google support Oauth with Github and Bitbucket. y

* Setting up Google Cloud build Tricker

### Popup Infrastructure ( Google Kubernetes Container cluster )

#### List you zones install 

```
gcloud compute zones list
```

if you want to filter zone 

```
gcloud compute zones list --filter=asia 
```
#### Edit variable file for project 

```

 code .\terraform.d\terraform.tfvars

```

```
terraform init
teraform plan 
terraform apply 
 gcloud container clusters get-credentials helloworld-cluster --zone { your zone define } --project { your project name}
gcloud auth configure-docker
```
### Create Environment for Application Deploy. 

#### Create Namespace

```
kubectl create namespace dev
kubectl create namespace test
kubectl create namespace staging
kubectl create namespace production
```

#### Load Environment ( configmaps ) from file and apply per Kubernates namespace this will use when pod run. ( container app run )

Kubernetes namespace, your environment configuration can help you section environment variable apply per scope running and environment POD running in your cluster. 

```
kubectl.exe create configmap --namespace dev-helloworld mongodb-connection-string --from-file=deployment.conf.d\Dev\helloworld.env.dev.conf.properties

kubectl.exe create configmap --namespace test-helloworld mongodb-connection-string --from-file=deployment.conf.d\Test\helloworld.env.test.conf.properties

kubectl.exe create configmap --namespace=staging-helloworld mongodb-connection-string  --from-file=deployment.conf.d\Staging\helloworld.env.staging.conf.properties

kubectl.exe create configmap --namespace=production-helloworld mongodb-connection-string --from-file=deployment.conf.d\Production\helloworld.env.production.conf.properties

```
### Load Secret file this will use when pod run. ( container app run )

```
kubectl create secret generic mongodb-dev-password --namespace=dev --from-file=deployment.conf.d\Dev\mongodb.secret

kubectl create secret generic mongodb-test-password --namespace=test --from-file=deployment.conf.d\Test\mongodb.secret

kubectl create secret generic mongodb-staging-password --namespace=staging --from-file=deployment.conf.d\Staging\mongodb.secret

kubectl create secret generic mongodb-dev-password --namespace=production --from-file=deployment.conf.d\Production\mongodb.secret

```
#### Deploy HelloWorld application 

Mostly when you config same as my environment ( Google Cloud build it should automatic deploy ) deployment file is ``` .\terraform.d\deployment.conf.d\helloworld.spec.yml ``` 

#### Use kubectl to deploy. 

Default kubectl configuration file is ```%userprofile%/.kube/config```

#### Deploy Traefik ingress.

I'm use Traefik as ingress with Letencrypt SSL.

#### 1. Deploy Traefik as Ingress

```
kubectl apply -f .\deployment.conf.d\In-gress.Traefik\
```

#### 2. Deploy Application to GKE. 

```
kubectl apply -f .\deployment.conf.d\App.helloworld\

```



# Known Limitation & ISSUE

* Visaul studio code ( Windows ) can't result un-prdictable space indent. and kubectl verify can error with out warning you about indentation.

* Have an issue with kubectl create configMap environment from file work in wrong way result configMap data on Kubernates Pod can't find keys.

* This version of terraform file Still not fully automate popup cluster infrastructure have some dirty for application deployment ( namespace, configmap use kubectl command). Still to find best way not interrupt flow to create namespace, configmap ( because it different provider context has change ). 

* **This repo** Terraform state does not provide RBAC implementation to you.  

* gcloud with docker config have issue and result you can't config docker authentication properly.error are below 

```
gcloud auth configure-docker
WARNING: `docker-credential-gcloud` not in system PATH.
gcloud's Docker credential helper can be configured but it will not work until this is corrected.
WARNING: `docker` not in system PATH.
`docker` and `docker-credential-gcloud` need to be in the same PATH in order to work correctly together.
gcloud's Docker credential helper can be configured but it will not work until this is corrected.
gcloud credential helpers already registered correctly.

```