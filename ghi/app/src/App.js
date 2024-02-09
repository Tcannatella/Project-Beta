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
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelList from './VehicleModelList';
import AutomobileList from './AutomobileList';
import VehicleModelForm from './VehicleModelForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/create" element={<TechnicianForm />} />
          <Route path="technicians/" element={<TechniciansList />} />
          <Route path="appointments/create" element={<AppointmentForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments/history" element={<ServiceHistoryList />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/create" element={<CustomerForm />} />
          <Route path="sales" element={<SaleList />} />
          <Route path="sales/new" element={<SaleForm />} />
          <Route path="salespeople" element={<SalespersonList />} />
          <Route path="salespeople/create" element={<SalespersonForm />} />
          <Route path="models" element={<VehicleModelList />} />
          <Route path="models/create" element={<VehicleModelForm />} />
          <Route path="automobiles" element={<AutomobileList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
