from decimal import Decimal, getcontext

descripcion_factura = "compra de insumos"
precio_producto1 = Decimal("150.10")
precio_producto2 = Decimal("168.00")

total_factura = precio_producto1 + precio_producto2
text = f"La factura: {descripcion_factura}; con un total bruto de: {total_factura}, con un impuesto del 15% es igual a: {total_factura * Decimal('1.15')}"
print(text)
