import  { useState, useEffect} from 'react';

function AutomobileList() {
    const [autos, setAutos] = useState ([])

    const getData = async () => {
        const response = await fetch ('http://localhost:8100/api/automobiles/')
        if (response.ok) {
            const { autos } = await response.json();
            setAutos(autos);
            console.log("HERE:",autos)

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
        <h1>Automobiles</h1>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Vin</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {autos.map(auto => {
              return (
                <tr key={auto.id}>
                  <td>{ auto.vin }</td>
                  <td>{ auto.color }</td>
                  <td>{ auto.year }</td>
                  <td>{ auto.model.name }</td>
                  <td>{ auto.model.manufacturer.name }</td>
                  <td>{auto.sold ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default AutomobileList;
