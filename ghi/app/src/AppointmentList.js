import { useState, useEffect } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [autos, setAutos] = useState([]);

    const fetchData = async () => {
        try {
            const appointmentsResponse = await fetch('http://localhost:8080/api/appointments/');
            const autosResponse = await fetch('http://localhost:8100/api/automobiles/');

            if (appointmentsResponse.ok && autosResponse.ok) {
                const { appointments } = await appointmentsResponse.json();
                const { autos } = await autosResponse.json();

                setAppointments(appointments);
                setAutos(autos);
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

    const cancelAppointment = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
                method: 'PUT',
            });
            if (response.ok) {
                fetchData()
            } else {
                console.error('Failed to cancel appointment:', response.statusText);
            }
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };

    const finishAppointment = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
                method: 'PUT',
            });
            if (response.ok) {
                fetchData()
            } else {
                console.error('Failed to finish appointment:', response.statusText);
            }
        } catch (error) {
            console.error('Error finishing appointment:', error);
        }
    };

    return (
        <div className="my-5 container">
            <div className="row">
                <h1>Service Appointments</h1>

                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Is VIP</th>
                            <th>Customer</th>
                            <th>Date/Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.filter(appt => appt.status === "created").map(app => (
                            <tr key={app.id}>
                                <td>{app.vin}</td>
                                <td>{autos.some(auto => auto.vin === app.vin) ? "Yes" : "No"}</td>
                                <td>{app.customer}</td>
                                <td>{new Date(app.date_time).toLocaleString()}</td>
                                <td>{app.technician.first_name}</td>
                                <td>{app.reason}</td>
                                <td>
                                    <button onClick={() => cancelAppointment(app.id)} className="btn btn-danger">Cancel</button>
                                    <button onClick={() => finishAppointment(app.id)} className="btn btn-success">Finish</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppointmentList;
