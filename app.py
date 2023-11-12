from flask import Flask, render_template, request, jsonify
import yaml, json

app = Flask(__name__)

node_name = ''
save_type = ''
save_type2 = ''

def read_data(filename):
    with open(filename, 'r') as file:
        lines = file.readlines()
    data = [line.strip().split(';') for line in lines]
    return data

@app.route('/')
def show_table():
    data = read_data('data.txt')
    return render_template('index.html', data=data)


@app.route('/save_type', methods=['POST'])
def fn_get_save_type():
    global get_save_type
    get_save_type = request.get_json()
    save_type = get_save_type.get('save_type', '')
    response_data = {
        'message': 'Aynı isimde bir node yok.',
        'received_data': get_save_type}
    print(get_save_type)
    return jsonify(response_data)

@app.route('/save_type2', methods=['POST'])
def fn_get_save_type2():
    global get_save_type2
    get_save_type2 = request.get_json()
    save_type2 = get_save_type.get('save_type2', '')
    response_data = {
        'message': 'Aynı isimde bir node yok.',
        'received_data': get_save_type2}
    print(get_save_type2)
    return jsonify(response_data)    

@app.route('/node_name', methods=['POST'])
def submit_form():
    global node_name
    get_node_name = request.get_json()
    node_name = get_node_name.get('node_name', '')
    node_name = f"[{node_name}]"
    
    # Check if the node_name exists in the "hosts.txt" file
    if check_node_name_in_hosts(node_name):
        # Execute JavaScript code if the node_name exists
        print('node name var dostum yapacağın işe bak.')
        response_data = {
            'message': 'Aynı isimde bir node var.',
            'received_data': get_node_name
        }
    else:
        print('node name yok dostum yapacağın işe bak.')
        response_data = {
            'message': 'Aynı isimde bir node yok.',
            'received_data': get_node_name
        }
    
    print(node_name)
    return jsonify(response_data)

def check_node_name_in_hosts(node_name):
    # Open and read the contents of "hosts" file
    with open("hosts", "r") as file:
        # Check if node_name exists in the file
        return node_name in file.read()

    


@app.route('/convert', methods=['POST'])
def convert_to_yaml():
    global node_name
    try:
        selected_datas = request.get_json()
        hosts_data = {}
        for data in selected_datas:
            parts = data.split(';')
            host_name = parts[1]
            hosts_data[host_name] = {}
        yaml_data = {node_name: {'hosts': hosts_data}}
        yaml_output = yaml.dump(yaml_data, default_flow_style=False)  # default_flow_style'i False yaparak işaretleri kaldırın
        print(yaml_output)
        return jsonify(yaml_output)
    except Exception as e:
        return str(e), 400



@app.route('/get_hosts')
def get_hosts():
    hosts_data = read_hosts_file()
    return {'hosts': hosts_data}

def read_hosts_file():
    file_path = './hosts'  # hosts.txt dosyanızın gerçek yoluyla değiştirin
    with open(file_path, 'r') as file:
        content = file.read().splitlines()
    print(content)
    return content

@app.route('/send_data_to_flask', methods=['POST'])
def receive_data():
    global node_name
    print(node_name)
    data = request.get_json()
    result = []
    result.append(node_name)
    for item in data:
        parts = item.split(';')
        if len(parts) >= 2:
            result.append(parts[1])
    print(result)
    
    with open('output.ini', 'w') as file:
        for item in result:
                file.write(item + '\n')
    return jsonify(result)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)