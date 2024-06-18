# dockers
Compiladores de dockers.

- Delimitar la ram de un contendor:

Ese error significa que el límite de memoria que quieres asignar al contenedor es mayor que el límite de memoria swap que ya tiene configurado. La memoria swap es el espacio adicional que el contenedor puede usar cuando se agota la memoria asignada. Para evitar ese error, debes actualizar el límite de memoria swap al mismo tiempo que el límite de memoria, usando la opción **--memory-swap** o el atajo **-S**¹². El comando debe seguir la sintaxis: sudo docker update -m "[memory_limit]" -S "[memoryswap_limit]" [container_name]. Por ejemplo, para limitar el contenedor con 4 GB de RAM y 8 GB de swap, se debe usar:
	$> sudo docker update -m "4g" -S "8g" [container_name].
