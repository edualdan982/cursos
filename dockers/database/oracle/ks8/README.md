# Comando útiles para ks8

### Minkube
Si estas en minikube y quieres cargar las images desde un archivo puedes hacer esto:
```bash
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
```

### PV (Persistence Volume)
```bash
kubectl patch pv <your-pv-name> -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
```
