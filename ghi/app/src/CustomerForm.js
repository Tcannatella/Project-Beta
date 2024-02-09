import React, { useEffect, useState } from "react";

function CustomerForm() {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.firstName = firstName;
        data.lastName = lastName;
        data.address = address;
        data.phoneNumber = phoneNumber;

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const customerResponse = await fetch(customerUrl, fetchOptions);

            if (customerResponse.ok) {
                setFirstName('');
                setLastName('');
                setAddress('');
                setPhoneNumber('');
            } else {
                console.error('Failed to create Customer:', customerResponse.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleChangeFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleChangeLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleChangeAddress = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handleChangePhoneNumber = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    return (
     <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Customer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
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
                  value={address}
                  onChange={handleChangeAddress}
                  placeholder="Address"
                  required
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={phoneNumber}
                  onChange={handleChangePhoneNumber}
                  placeholder="Phone Number"
                  required
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="form-control"
                />
                <label htmlFor="address">Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CustomerForm;
