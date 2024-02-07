import React, { useEffect, useState } from 'react';

function TechnicianForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
    };

    try {
      const technicianUrl = 'http://localhost:8080/api/technicians/';
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const technicianResponse = await fetch(technicianUrl, fetchOptions);
      if (technicianResponse.ok) {
        setFirstName('');
        setLastName('');
        setEmployeeId('');
      } else {
        console.error('Error creating technician:', technicianResponse.statusText);
      }
    } catch (error) {
      console.error('Error creating technician:', error);
    }
  };


  const handleChangeFirstName = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleChangeLastName = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleChangeEmployeeId = (event) => {
    const value = event.target.value;
    setEmployeeId(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Technician</h1>
          <form onSubmit={handleSubmit} id="create-technician-form">
            <div className="form-floating mb-3">
              <input
                value={firstName}
                onChange={handleChangeFirstName}
                placeholder="First Name"
                required
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={lastName}
                onChange={handleChangeLastName}
                placeholder="Last Name"
                required
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={employeeId}
                onChange={handleChangeEmployeeId}
                placeholder="Employee ID"
                required
                type="number"
                name="employeeId"
                id="employeeId"
                className="form-control"
              />
              <label htmlFor="employeeId">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;
