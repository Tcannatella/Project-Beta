import React, { useEffect, useState } from 'react';

function SaleForm() {
  const [sales, setSales] = useState([])
  const [formData, setFormData] = useState({
    vin: '',
    salesperson: '',
    customer: '',
    price: '',
  })

  const [vins, setVins] = useState([])
  const fetchData = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setVins(data.autos);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [customers, setCustomers] = useState([])
  const fetchCustomerData = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  }

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const [salepersons, setSalespersons] = useState([])
  const fetchSalespersonData = async () => {
    const url = 'http://localhost:8090/api/salespeoples/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespersons(data.salesperson);
    }
  }

  useEffect(() => {
    fetchSalespersonData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8090/api/sales/';

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData({
        vin: '',
        salesperson: '',
        customer: '',
        price: '',
      });
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value
    });
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">

          <div className="mb-3">
              <select onChange={handleFormChange} value={formData.vin} required name="vin" id="vin" className="form-select">
                <option value="">Choose an automobile vin</option>
                {vins.map(vin => {
                  return (
                    <option key={vin.id} value={vin.id}>
                      {vin.vin}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose a salesperson</option>
                {salepersons.map(salesperson => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                <option value="">Choose a customer</option>
                {customers.map(customer => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.price} placeholder="" required type="number" name="price" id="price" className="form-control" />
              <label htmlFor="price">Price</label>
            </div>

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SaleForm;
