kubectl create secret docker-registry <name-secret> \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=<user> \
  --docker-password=<token_or_password> \
  --docker-email=<e-mail>

kubectl get secret <name-secret> -o jsonpath="{.data.\.dockerconfigjson}" | base64 --decode


kubectl config set-credentials <user>  --token=<token_or_password>
