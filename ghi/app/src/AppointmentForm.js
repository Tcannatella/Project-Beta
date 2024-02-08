import React, { useEffect, useState } from 'react';

function AppointmentForm() {
  const [dateTime, setDateTime] = useState('');
  const [reason, setReason] = useState('');
  const [vin, setVin] = useState('');
  const [customer, setCustomer] = useState('');
  const [technician, setTechnician] = useState('');
  const [technicians, setTechnicians] = useState([]);

  const fetchData = async () => {
    try {
      const url = 'http://localhost:8080/api/technicians';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      }
    } catch (error) {
      console.error('Error fetching technicians:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      date_time: dateTime,
      reason: reason,
      customer: customer,
      vin: vin,
      technician_id: technician,
    };
    try {
      const appointmentsUrl = 'http://localhost:8080/api/appointments/';
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const appointmentsResponse = await fetch(appointmentsUrl, fetchOptions);

      const responseData = await appointmentsResponse.json();
      console.log("Response data:", responseData)

      if (appointmentsResponse.ok) {
        setReason('');
        setVin('');
        setCustomer('');
        setTechnician('');
        setDateTime('');

      } else {
        console.error('Error creating appointment:', appointmentsResponse.statusText);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };


  const handleChangeReason = (event) => {
    const value = event.target.value;
    setReason(value);
  };

  const handleChangeVin = (event) => {
    const value = event.target.value;
    setVin(value);
  };

  const handleChangeCustomer = (event) => {
    const value = event.target.value;
    setCustomer(value);
  };

  const handleChangeTechnician = (event) => {
    const value = event.target.value;
    setTechnician(value);
  };

  const handleChangeDateTime = (event) => {
    const value = event.target.value;
    setDateTime(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a service appointment</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                value={vin}
                onChange={handleChangeVin}
                placeholder="vin"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customer}
                onChange={handleChangeCustomer}
                placeholder="customer"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
              />
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={dateTime}
                onChange={handleChangeDateTime}
                required
                type="datetime-local"
                name="datetime"
                id="datetime"
                className="form-control"
              />
              <label htmlFor="datetime">Date and Time</label>
            </div>
            <div className="form-floating mb-3">
              <select
                value={technician}
                onChange={handleChangeTechnician}
                required
                name="technician"
                id="technician"
                className="form-select"
              >
                <option value="">Choose a technician</option>
                {technicians.map(tech => (
                  <option key={tech.id} value={tech.id}>
                    {tech.first_name}
                  </option>
                ))}
              </select>
              <label htmlFor="technician">Technician</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={reason}
                onChange={handleChangeReason}
                placeholder="reason"
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
