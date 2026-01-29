from decimal import Decimal, getcontext

age = 30
big_int = 1234567891011121314151617181920
decimal_number = 3.1416

print(age)
print(type(age))
print(big_int)
print(type(big_int))
print(decimal_number)
print(type(decimal_number))

number_complex = 5 + 3j
print(number_complex)
print(type(number_complex))
print("Parte real:", number_complex.real)

getcontext().prec = 10
num1 = Decimal("10.123456789")
num2 = Decimal("2.1")
result = num1 + num2
print("Resultado con Decimal:", result)

num = 42
decimal_number = float(num)
integer_number = int(3.1416)

print("Número entero:", num)
print("Número entero convertido:", integer_number)