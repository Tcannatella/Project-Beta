import { useState, useEffect} from 'react';

function SaleHistory() {
  const [sales, setSales] = useState([])
  const [formData, setFormData] = useState({
    vin: '',
    salesperson: '',
    customer: '',
    price: '',
  })

  const getData = async ()=> {
    const response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const salesData = await response.json();
      setSales(salesData.models);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);


  const [salepersons, setSalespersons] = useState([])
  const fetchSalespersonData = async () => {
    const url = 'http://localhost:8090/api/salespeoples/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespersons(data.salesperson);
    }
  }

  useEffect(() => {
    fetchSalespersonData();
  }, []);

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value
    });
  }
  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Sales History</h1>
        <div className="mb-3">
              <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose a salesperson</option>
                {salepersons.map(salesperson => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  );
                })}
              </select>
            </div>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Saleperson</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => {
              return (
                <tr key={sale.href}>
                  <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                  <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                  <td>{ sale.automobile.vin }</td>
                  <td>{ sale.price }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SaleHistory;
