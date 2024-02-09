import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import TechniciansList from './TechnicianList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistoryList from './ServiceHistoryList';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SaleForm from './SaleForm';
import SaleList from './SaleList';
import SalespersonForm from './SalespersonForm';
import SalespersonList from './SalespersonList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/new" element={<TechnicianForm />} />
          <Route path="technicians/" element={<TechniciansList />} />
          <Route path="appointments/new" element={<AppointmentForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments/history" element={<ServiceHistoryList />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="sales" element={<SaleList />} />
          <Route path="sales/new" element={<SaleForm />} />
          <Route path="salespeople" element={<SalespersonList />} />
          <Route path="salespeople/new" element={<SalespersonForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
