const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const id = req.body.id
  const name = req.body.name
  const existingEmployee = employee.find((employee)=>employee.id==id)
  if(existingEmployee)
    return res.status(400).json({message: "Employee already exists"});
  const neEmployee = { id, name }
  employee.push(neEmployee);
  res.status(201).json({ data: employee });
};
