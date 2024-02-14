import { useState, useEffect} from 'react';

function SalespersonList() {
  const [salespersons, setSalespersons] = useState([])

  const getData = async ()=> {
    const response = await fetch('http://localhost:8090/api/salespeoples/');
    if (response.ok) {
      const salespersonsData  = await response.json();
      setSalespersons(salespersonsData.salesperson);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Salespeople</h1>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {salespersons.map(salesperson => {
              return (
                <tr key={salesperson.href}>
                  <td>{ salesperson.employee_id }</td>
                  <td>{ salesperson.first_name }</td>
                  <td>{ salesperson.last_name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalespersonList;
