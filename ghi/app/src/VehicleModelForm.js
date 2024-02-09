import React, { useEffect, useState } from 'react';

function VehicleModelForm() {
  const [name, setName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [manufacturers, setManufacturers] = useState([]);

  const fetchData = async () => {
    try {
      const url = 'http://localhost:8100/api/manufacturers/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log("DATA",data)
        setManufacturers(data.manufacturers);
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

    try {
      const data = {
        name: name,
        picture_url: pictureUrl,
        manufacturer: manufacturer
      };

      const modelsUrl = 'http://localhost:8100/api/models/';
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const modelsResponse = await fetch(modelsUrl, fetchOptions);

      if (modelsResponse.ok) {
        setName('');
        setPictureUrl('');
        setManufacturer('');
      } else {
        console.error('Error creating model:', modelsResponse.statusText);
      }
    } catch (error) {
      console.error('Error creating model:', error);
    }
  };

  const handleChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handlePictureUrl = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };

  const handleChangeManufacturer = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a model</h1>
          <form onSubmit={handleSubmit} id="create-model-form">
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
              <label htmlFor="name">Model Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={pictureUrl}
                onChange={handlePictureUrl}
                placeholder="picture_url"
                required
                type="text"
                name="picture_url"
                id="picture_url"
                className="form-control"
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                value={manufacturer}
                onChange={handleChangeManufacturer}
                required
                name="manufacturer"
                id="manufacturer"
                className="form-select"
              >
                <option value="">Choose a manufacturer</option>
                {manufacturers.map(man => (
                  <option key={man.id} value={man.id}>
                    {man.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VehicleModelForm;
