import  { useState, useEffect} from 'react';

function CustomerList() {
    const [customers, setCustomer] = useState ([])

    const getData = async () => {
        const response = await fetch ('http://localhost:8090/api/customers/')
        if (response.ok) {
            const { customers } = await response.json();
            setCustomer(customers);
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
        <h1>Customers</h1>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(tech => {
              return (
                <tr key={tech.id}>
                  <td>{ tech.first_name }</td>
                  <td>{ tech.last_name }</td>
                  <td>{ tech.address }</td>
                  <td>{ tech.phone_number }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default CustomerList;
