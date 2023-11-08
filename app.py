from flask import Flask, render_template, request, jsonify
import yaml, json

app = Flask(__name__)

def read_data(filename):
    with open(filename, 'r') as file:
        lines = file.readlines()
    data = [line.strip().split(';') for line in lines]
    return data

@app.route('/')
def show_table():
    data = read_data('data.txt')
    return render_template('index.html', data=data)

@app.route('/convert', methods=['POST'])
def convert_to_yaml():
    try:
        selected_datas = request.get_json()
        hosts_data = {}
        for data in selected_datas:
            parts = data.split(';')
            host_name = parts[1]
            hosts_data[host_name] = {}
        yaml_data = {'dbservers': {'hosts': hosts_data}}
        yaml_output = yaml.dump(yaml_data, default_flow_style=False)  # default_flow_style'i False yaparak işaretleri kaldırın
        print(yaml_output)
        return jsonify(yaml_output)
    except Exception as e:
        return str(e), 400
from flask import Flask, request, jsonify


@app.route('/send_data_to_flask', methods=['POST'])
def receive_data():
    data = request.get_json()
    result = ["[dbservers]"]
    for item in data:
        parts = item.split(';')
        if len(parts) >= 2:
            result.append(parts[1])
    print(result)
    
    with open('output.ini', 'w') as file:
        for item in result:
            # Eğer eleman [dbservers] ise tırnak işaretlerini koyma
            if item == '[dbservers]':
                file.write(item + '\n')
            else:
                file.write(item + '\n')

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)