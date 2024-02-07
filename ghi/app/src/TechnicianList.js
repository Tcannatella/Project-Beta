import  { useState, useEffect} from 'react';

function TechniciansList() {
    const [technicians, setTechnicians] = useState ([])

    const getData = async () => {
        const response = await fetch ('http://localhost:8080/api/technicians/')
        if (response.ok) {
            const { technicians } = await response.json();
            setTechnicians(technicians);
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
        <h1>Technicians</h1>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Employee id</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map(tech => {
              return (
                <tr key={tech.id}>
                  <td>{ tech.employee_id }</td>
                  <td>{ tech.first_name }</td>
                  <td>{ tech.last_name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default TechniciansList;
