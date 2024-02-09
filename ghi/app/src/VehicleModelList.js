import  { useState, useEffect} from 'react';

function VehicleModelList() {
  const [models, setModels] = useState ([])

    const getData = async () => {
        const response = await fetch ('http://localhost:8100/api/models/')
        if (response.ok) {
            const { models } = await response.json();
            setModels(models);
        }else {
            console.error('An error occured fetching the data')
        }
    }


useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Models</h1>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {models.map(mod => {
              return (
                <tr key={mod.id}>
                  <td>{ mod.name }</td>
                  <td>{ mod.manufacturer.name}</td>
                  <td><img src={mod.picture_url} alt="Model Image" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default VehicleModelList;
