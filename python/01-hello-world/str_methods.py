name = 'Edual Dan'
course = 'Python'

name_upper = name.upper()
print(name_upper == name_upper)
print(name_upper )
print(name)
print(course.lower())

words = "curso de python"
print(words.capitalize())
print(words.title())

word =  '     Hola Edual     '

print(words.strip())
print(words.lstrip())
print(words.rstrip())

text = 'Hola Java'
print(text.replace('Java', 'Python'))

new_text = text.replace('Java', 'Python')
print(text)
print(new_text)

text = "Edual,Dan,Python,Java,Angular"
data_list = text.split(',')
print(data_list[2])
print(data_list[4])
print(data_list)

data =  ['Edual2', 'Dan2', 'Python2', 'Java2', 'Angular2']
text = ', '.join(data);
print(text)
