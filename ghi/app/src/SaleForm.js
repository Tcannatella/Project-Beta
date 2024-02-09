import React, { useEffect, useState } from "react";

function SaleForm() {
    const [ price, setPrice ] = useState('');
    const [ automobile, setAutomobile ] = useState('');
    const [ salesperson, setSalesperson ] = useState('');
    const [ customer, setCustomer ] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.price = price;
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;

        const saleUrl = 'http://localhost:8090/api/sales/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const saleResponse = await fetch(saleUrl, fetchOptions);

            if (saleResponse.ok) {
                setPrice('');
                setAutomobile('');
                setSalesperson('');
                setCustomer('');
            } else {
                console.error('Failed to create Customer:', saleResponse.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleChangePrice = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleChangeAutomobile = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleChangeSalesperson = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handleChangeCustomer = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new Sale</h1>
              <form onSubmit={handleSubmit} id="create-sale-form">
                <div className="form-floating mb-3">
                  <input
                    value={price}
                    onChange={handleChangePrice}
                    placeholder="price"
                    required
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                  />
                  <label htmlFor="price">Price</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={automobile}
                    onChange={handleChangeAutomobile}
                    placeholder="Automobile"
                    required
                    type="text"
                    name="automobile"
                    id="automobile"
                    className="form-control"
                  />
                  <label htmlFor="automobile">Automobile</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={salesperson}
                    onChange={handleChangeSalesperson}
                    placeholder="Salesperson"
                    required
                    type="text"
                    name="salesperson"
                    id="salesperson"
                    className="form-control"
                  />
                  <label htmlFor="salesperson">Salesperson</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={customer}
                    onChange={handleChangeCustomer}
                    placeholder="Customer"
                    required
                    type="text"
                    name="customer"
                    id="customer"
                    className="form-control"
                  />
                  <label htmlFor="customer">Customer</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    );
}

export default TechnicianForm;
