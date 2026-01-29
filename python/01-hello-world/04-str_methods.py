name = "Edual Dan"
course = "Python"

name_upper = name.upper()
print(name_upper == name_upper)
print(name_upper)
print(name)
print(course.lower())

words = "curso de python"
print(words.capitalize())
print(words.title())

word = "     Hola Edual     "

print(words.strip())
print(words.lstrip())
print(words.rstrip())

text = "Hola Java"
print(text.replace("Java", "Python"))

new_text = text.replace("Java", "Python")
print(text)
print(new_text)

text = "Edual,Dan,Python,Java,Angular"
data_list = text.split(",")
print(data_list[2])
print(data_list[4])
print(data_list)

data = ["Edual2", "Dan2", "Python2", "Java2", "Angular2"]
text = ", ".join(data)
print(text)

text = "Hola edual, ¿Comó estás?"
text_find = "edual"
find_index = text.find("edu")

print(find_index)
print(text[find_index : find_index + len(text_find)])

print(f"Empieza la var: text en: {text.startswith("Hola")}")
print(f"Termina la var: text en: {text.endswith("estás?")}")

number = "12345"
decimal = "123456.5"
text = "Python"
mix = "Python3"

print(f"number es numérico: {number.isnumeric()}")
print(f"number es numérico: {number.isdigit()}" )
print(f"decimal es numérico: {decimal.isdecimal()}" )
print(f"mix es numérico: {mix.isalnum()}" )
print(f"mix es numérico: {mix.isalpha()}" )
print(f"text es numérico: {text.isalpha()}")


text = "        hola edual como estas, bienvenido a curso de python   "
text_clean = text.strip().capitalize().title()
print(text_clean)

new_text = text_clean.replace("Curso De Python", "Curso De Python 3")
print(new_text)

words = new_text.split()
print(words)

fraction = 'Ⅷ'
print(fraction.isnumeric())
