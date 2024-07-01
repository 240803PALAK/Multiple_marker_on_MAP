from flask import Flask, render_template, request,jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_data', methods=['GET'])
def send_data():
    df = pd.read_excel('dataset.xlsx')
    data = df.values.tolist()
    print(data)
    return jsonify(data)


@app.route('/food', methods=['GET'])
def food():
    df = pd.read_excel('dataset.xlsx')
    food_rows = df[df['Require'] == 'Food']
    data = food_rows.values.tolist()
    print(data)
    return jsonify(data)

@app.route('/water', methods=['GET'])
def water():
    df = pd.read_excel('dataset.xlsx')
    water_rows = df[df['Require'] == 'Water']
    data = water_rows.values.tolist()
    print(data)
    return jsonify(data)

@app.route('/medics', methods=['GET'])
def medics():
    df = pd.read_excel('dataset.xlsx')
    medics_rows = df[df['Require'] == 'Medics']
    data = medics_rows.values.tolist()
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)