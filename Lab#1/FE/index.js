function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => {
          deleteEmployee(item.id)
        });
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const employeeForm = document.getElementById('employeeForm')
employeeForm.addEventListener('submit',createEmployee)

// TODO
// add event listener to delete button

// TODO
function createEmployee (event){
  event.preventDefault();
  // get data from input field
  const stdname = document.getElementById('name').value
  const stdid = document.getElementById('id').value
  //Employee Object
  const Employee={
    name:stdname,
    id:stdid,
  }
  // send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(Employee)
    })
      .then(response => response.json())
        .then(()=>{
          document.getElementById("name").value = ''
          document.getElementById("id").value = ''
          fetchEmployees()
        })
          .catch(error => console.error(error))
  // call fetchEmployees
}

// TODO
function deleteEmployee (){

  if (!confirm('Are you sure you want to delete this employee?')) {
    return;
  }
  // get id
  const empID = id
  // send id to BE
  fetch(`http://localhost:4000/api/v1/employee/${empID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      }
      })
      .then(response => response.json())
      .then(() => {
        document.getElementById("id").value=''
        fetchEmployees()
        })
        .catch(error => console.error(error))
  
  // call fetchEmployees
}

fetchEmployees()
