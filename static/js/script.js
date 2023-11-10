
// Select all checkboxes with the name 'settings' using querySelectorAll.
var checkboxes = document.querySelectorAll("input[type=checkbox][name=data-checkbox]");
let selected_datas = [];
var node_name_form;

/*
For IE11 support, replace arrow functions with normal functions and
use a polyfill for Array.forEach:
https://vanillajstoolkit.com/polyfills/arrayforeach/
*/


// Define an array to keep track of selected row IDs

// Rest of your code remains the same



// Use Array.forEach to add an event listener to each checkbox.
function listenToCheckboxes() {
  selected_datas = 
    Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
    .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
    .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

  console.log(selected_datas)

  // Tabloyu ve hedef tbody öğesini seçin
  var table = document.getElementById("selected_table");
  var tbody = table.querySelector("tbody");
  tbody.innerHTML='<table id="selected_table" class="table table-dark"><tr><th>ID</th><th>Hostname</th><th>Location</th><th>LVL</th><th>Port</th><th>Description</th></tr>'
  
  // Verileri döngüyle dolaşarak yeni satırlar oluşturun
  selected_datas.forEach(function(data) {
      var row = document.createElement("tr");
      var columns = data.split(";"); // Veriyi . karakterine göre bölmek
  
      columns.forEach(function(columnData) {
          var cell = document.createElement("td");
          cell.textContent = columnData;
          row.appendChild(cell);
      });
  
      tbody.appendChild(row);
  });

  var tf2 = setFilterGrid( "selected_table",table2_Props ); 
}


checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    listenToCheckboxes();
  })
});

function SelectAll_viewButton() {
  document.addEventListener('DOMContentLoaded', function () {
    var selectAll_view = document.getElementById('selectall_view');
    var dataCheckboxes = document.querySelectorAll('input[type="checkbox"][name="data-checkbox"]');
    selectAll_view.addEventListener('click', function () {
      dataCheckboxes.forEach(function (checkbox) {
        if (checkbox.offsetParent !== null) {
          // Check only visible checkboxes
          checkbox.checked = true;
        }
      });
      listenToCheckboxes();
    });
  });
}

function DeselectAll_viewButton() {
  document.addEventListener('DOMContentLoaded', function () {
    var deselectAll_view = document.getElementById('deselectall_view');
    var dataCheckboxes = document.querySelectorAll('input[type="checkbox"][name="data-checkbox"]');
    deselectAll_view.addEventListener('click', function () {
      dataCheckboxes.forEach(function (checkbox) {
        if (checkbox.offsetParent !== null) {
          // Uncheck only visible checkboxes
          checkbox.checked = false;
        }
      });
      listenToCheckboxes();
    });
  });
}
function SelectAllButton() {
  document.addEventListener('DOMContentLoaded', function () {
    var selectAll = document.getElementById('selectall');
    var dataCheckboxes = document.querySelectorAll('input[type="checkbox"][name="data-checkbox"]');
    selectAll.addEventListener('click', function () {
      dataCheckboxes.forEach(function (checkbox) {
  
          // Check only visible checkboxes
          checkbox.checked = true;
       
      });
      listenToCheckboxes();
    });
  });
}

function DeselectAllButton() {
  document.addEventListener('DOMContentLoaded', function () {
    var deselectAll = document.getElementById('deselectall');
    var dataCheckboxes = document.querySelectorAll('input[type="checkbox"][name="data-checkbox"]');
    deselectAll.addEventListener('click', function () {
      dataCheckboxes.forEach(function (checkbox) {
       
          // Uncheck only visible checkboxes
          checkbox.checked = false;
      
      });
      listenToCheckboxes();
    });
  });
}

SelectAllButton();
DeselectAllButton();
SelectAll_viewButton();
DeselectAll_viewButton();
// let write_right = document.getElementById("selected_data");  


var table2_Props =  {  
  col_0: "none", 

  col_2: "select",  
  col_3: "select",
  col_4: "none",  
  col_5: "none",
  col_6: "none",
  display_all_text: " [ Show all ] ",  
  sort_select: true
};  
var tf2 = setFilterGrid( "envanter_table",table2_Props );  


function get_node_name() {
 node_name_form = document.getElementById("nodename").value; send_node_name();}

  function send_node_name(){

  fetch("/node_name", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ node_name: node_name_form })
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Veri gönderme hatası');
      }
  })
  .then(data => {
      console.log(data.received_data);

      // Check the message from the server and show the modal accordingly
      if (data.message === 'Aynı isimde bir node yok.') {
          // 1. Statement: Message indicates success, show the modal
          save_hosts(save_type_param);

          // Add any additional code or actions you want to perform on success
      } else {
          // 2. Statement: Message indicates failure or different outcome
          // You can add alternative logic or UI updates here if needed
          
          $('#hatali_kayit').modal('show');
          //document.getElementById("node_name_form").innerHTML = node_name_form;
          get_save_type2_from_buttons();
          // For now, let's log an error message to the console
          console.error('Error: ', data.message);
      }
  })
  .catch(error => {
      console.error('Hata:', error);
  });
}

function temp_nodename(){
  var now = new Date();
var year = now.getFullYear();
var month = ('0' + (now.getMonth() + 1)).slice(-2); // Ay sıfır ile başlayarak (0-11) geldiği için +1 eklenir
var day = ('0' + now.getDate()).slice(-2);
var hours = ('0' + now.getHours()).slice(-2);
var minutes = ('0' + now.getMinutes()).slice(-2);
get_node_name();
// Node ismini oluştur
node_name_form = "#" + node_name_form + year +  month  + day + "_" + hours  + minutes;
send_node_name();
}

function get_save_type_from_buttons(){
  save_type_param = '0'
  save_type_param2= ''
  document.getElementById("convertYamlButton").addEventListener("click", function(){save_type_param = 'yaml';
  get_node_name();send_save_type_from_buttons();});
  document.getElementById("convertiniButton").addEventListener("click", function() {save_type_param = 'ini';
  get_node_name();send_save_type_from_buttons();});
}
function get_save_type2_from_buttons(){
document.getElementById("overwrite").addEventListener("click", function() {save_type_param2 = 'overwrite';
send_save_type2_from_buttons();save_hosts(save_type_param);
$('#hatali_kayit').modal('hide');
$('#exampleModal').modal('hide');});
document.getElementById("savetotemp").addEventListener("click", function() {save_type_param2 = 'savetotemp';
temp_nodename();send_save_type2_from_buttons();save_hosts(save_type_param);
$('#hatali_kayit').modal('hide');
$('#exampleModal').modal('hide');
});}

get_save_type_from_buttons();


function save_hosts(save_type_parametre){ 
  if (save_type_parametre == 'ini') {convert_ini();}
  else {convert_yaml()}
}

function send_save_type_from_buttons() {
  fetch("/save_type", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ save_type_param })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Save type Veri gönderme hatası');
      }
    }).then(data => { console.log(data.received_data); })
}

function send_save_type2_from_buttons() {
  fetch("/save_type2", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ save_type_param2 })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Save type Veri gönderme hatası');
      }
    }).then(data => { console.log(data.received_data); })
}

function convert_yaml(){
  // Buraya JavaScript kodunu ekleyebilirsiniz
  const url = '/convert'; // Flask sunucunuzun doğru URL'sini kullanın

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(selected_datas),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Veri gönderme hatası');
      }
  }).then(data => {
      console.log(data);
  }).catch(error => {
      console.error('Hata:', error);
  });
}



function convert_ini() {
  fetch('/send_data_to_flask', {
    method: 'POST',
    body: JSON.stringify(selected_datas),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // Veriyi işle ve istediğin şekilde kullan
      console.log(data);
    });
}

