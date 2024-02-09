import  { useState, useEffect} from 'react';

function SaleList() {
    const [sale, setSale] = useState ([])

    const getData = async () => {
        const response = await fetch ('http://localhost:8090/api/sales/')
        if (response.ok) {
            const { sale } = await response.json();
            setSale(sale);
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
        <h1>Sale</h1>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Price</th>
              <th>Automobile</th>
              <th>Salesperson</th>
              <th>Customer</th>
            </tr>
          </thead>
          <tbody>
            {sale.map(tech => {
              return (
                <tr key={tech.id}>
                  <td>{ tech.price }</td>
                  <td>{ tech.automobile }</td>
                  <td>{ tech.salesperson }</td>
                  <td>{ tech.customer }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default SaleList;
