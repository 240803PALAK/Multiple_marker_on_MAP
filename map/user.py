import pandas as pd

df = pd.read_excel('dataset.xlsx')
food_rows = df[df['Require'] == 'Food']
data = food_rows.values.tolist()
print(data)