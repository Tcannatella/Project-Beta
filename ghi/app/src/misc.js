
const cancelAppointment = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
            method: 'PUT',
        });
        if (response.ok) {
            const updatedAppointments = appointments.filter(app => app.status !== app.status);
            setAppointments(updatedAppointments);
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
            const updatedAppointments = appointments.filter(app => app.status !== app.status);
            setAppointments(updatedAppointments);
        } else {
            console.error('Failed to finish appointment:', response.statusText);
        }
    } catch (error) {
        console.error('Error finishing appointment:', error);
    }
};
