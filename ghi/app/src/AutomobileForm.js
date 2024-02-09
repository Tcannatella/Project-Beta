import React, { useEffect, useState } from 'react';

function AutomobileForm() {
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [model, setModel] = useState('');
  const [models, setModels] = useState([]);

  const fetchData = async () => {
    try {
      const url = 'http://localhost:8100/api/models/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setModels(data.models);

      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      color: color,
      year: year,
      vin: vin,
      model_id: model,
    };
    try {
      const automobileUrl = 'http://localhost:8100/api/automobiles/';
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const automobileResponse = await fetch(automobileUrl, fetchOptions);

      const responseData = await automobileResponse.json();

      if (automobileResponse.ok) {
        setColor('');
        setYear('');
        setVin('');
        setModel('');

      } else {
        console.error('Error creating automobile:', responseData.statusText);
      }
    } catch (error) {
      console.error('Error creating automobile:', error);
    }
  };


  const handleChangeColor = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleChangeVin = (event) => {
    const value = event.target.value;
    setVin(value);
  };

  const handleChangeYear = (event) => {
    const value = event.target.value;
    setYear(value);
  };

  const handleChangeModel = (event) => {
    const value = event.target.value;
    setModel(value);
  };


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an automobile to inventory</h1>
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
                value={year}
                onChange={handleChangeYear}
                placeholder="customer"
                required
                type="text"
                name="year"
                id="year"
                className="form-control"
              />
              <label htmlFor="customer">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={color}
                onChange={handleChangeColor}
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="datetime">Color</label>
            </div>
            <div className="form-floating mb-3">
              <select
                value={model}
                onChange={handleChangeModel}
                required
                name="model"
                id="model"
                className="form-select"
              >
                <option value="">Choose a model</option>
                {models.map(mod => (
                  <option key={mod.id} value={mod.id}>
                    {mod.name}
                  </option>
                ))}
              </select>
              <label htmlFor="technician">Model</label>
            </div>
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
