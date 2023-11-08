
// Select all checkboxes with the name 'settings' using querySelectorAll.
var checkboxes = document.querySelectorAll("input[type=checkbox][name=data-checkbox]");
let selected_datas = []

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


function convert_yaml(){document.getElementById("convertYamlButton").addEventListener("click", function() {
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
});}

convert_yaml();

function convert_ini() {
  document.getElementById("convertiniButton").addEventListener("click", function() {

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
  });
}

convert_ini();

// Initialize selected data table on page load

