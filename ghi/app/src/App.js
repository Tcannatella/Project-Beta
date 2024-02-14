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
import SaleHistory from './SalesHistroy';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelList from './VehicleModelList';
import AutomobileList from './AutomobileList';
import VehicleModelForm from './VehicleModelForm';
import AutomobileForm from './AutomobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<MainPage />} />

          {/* Technicians */}
          <Route path="technicians/create" element={<TechnicianForm />} />
          <Route path="technicians" element={<TechniciansList />} />

          {/* Appointments */}
          <Route path="appointments/create" element={<AppointmentForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments/history" element={<ServiceHistoryList />} />

          {/* Sales */}
          <Route path="sales/history" element={<SaleHistory />} />
          <Route path="sales" element={<SaleList />} />
          <Route path="sales/create" element={<SaleForm />} />

          {/* Manufacturers */}
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />

          {/* Customers */}
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/create" element={<CustomerForm />} />

          {/* Salespeople */}
          <Route path="salespeople" element={<SalespersonList />} />
          <Route path="salespeople/create" element={<SalespersonForm />} />

          {/* Models */}
          <Route path="models" element={<VehicleModelList />} />
          <Route path="models/create" element={<VehicleModelForm />} />

          {/* Automobiles */}
          <Route path="automobiles" element={<AutomobileList />} />
          <Route path="automobiles/create" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
