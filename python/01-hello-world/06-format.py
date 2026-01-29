name = 'Endual'
age = 28
text = f'Me llamo {name} y tengo {age} años.'
print(text)

a = 5
b = 10
print(f'La suma de {a} + {b} es igual a {a + b}')

result = f'El precio es { a+ b} dolares'
print(result)

prince = 50
text = f'El precio es muy { "Caro" if 50 < prince else "Barato" }'
print(text)

fruit = 'Manzanas'
txt = f"Me encantan las {fruit.upper()}"
print(txt)

price = 59
text = 'EL precio es {price} dolares'
print(text.format(price=49))

txt = 'Oferta por solo {price:.4f} dolares'
print(txt.format(price=49.1234567))

text = "Oferta por solo {price:4.2f} dolares"
print(text.format(price=60))