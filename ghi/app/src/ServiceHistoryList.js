import { useState, useEffect } from 'react';

function ServiceHistoryList() {
    const [appointments, setAppointments] = useState([]);
    const [autos, setAutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const fetchData = async () => {
        try {
            const appointmentsResponse = await fetch('http://localhost:8080/api/appointments/');
            const autosResponse = await fetch('http://localhost:8100/api/automobiles/');

            if (appointmentsResponse.ok && autosResponse.ok) {
                const { appointments } = await appointmentsResponse.json();
                const { autos } = await autosResponse.json();

                setAppointments(appointments);
                setAutos(autos);
                setFilteredAppointments(appointments);
            } else {
                console.error('An error occurred fetching the data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        const filtered = appointments.filter(app =>
            app.vin.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAppointments(filtered);
    };

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredAppointments(appointments);
        }
    }, [searchTerm, appointments]);

    return (
        <div className="my-5 container">
            <div className="row">
                <h1>Service Appointments</h1>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        placeholder="Search by VIN"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Is VIP</th>
                            <th>Customer</th>
                            <th>Date/Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map(app => (
                            <tr key={app.id}>
                                <td>{app.vin}</td>
                                <td>{autos.some(auto => auto.vin === app.vin) ? "Yes" : "No"}</td>
                                <td>{app.customer}</td>
                                <td>{new Date(app.date_time).toLocaleString()}</td>
                                <td>{app.technician.first_name}</td>
                                <td>{app.reason}</td>
                                <td>{app.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default ServiceHistoryList;
