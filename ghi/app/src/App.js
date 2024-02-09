import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import TechniciansList from './TechnicianList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistoryList from './ServiceHistoryList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';

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
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturers/new" element={<ManufacturerForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
