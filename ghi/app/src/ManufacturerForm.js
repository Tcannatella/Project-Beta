import React, { useEffect, useState } from 'react';

function ManufacturerForm() {
  const [name, setName] = useState('');

  const fetchData = async () => {
    try {
      const url = 'http://localhost:8100/api/manufacturers/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setName(data.manufacturer);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name
    };
    try {
      const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const manufacturerResponse = await fetch(manufacturerUrl, fetchOptions);
      const responseData = await manufacturerResponse.json();

      if (manufacturerResponse.ok) {
        setName('');
      } else {
        console.error('Failed to create manufacturer:', manufacturerResponse.statusText);
      }
    } catch (error) {
      console.error('Error creating manufacturer:', error);
    }
  };

  const handleChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input
                value={name}
                onChange={handleChangeName}
                placeholder="name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Manufacturer name</label>
            </div>
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
