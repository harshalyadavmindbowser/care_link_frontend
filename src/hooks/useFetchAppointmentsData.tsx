import { useEffect, useState } from 'react';

import axiosInstance from "../utils/axios";

interface AppointmentResponse {
    status: string;
    message: string;
    
    appoinments: {
        id: string;
        full_name: string;
        email: string;
        role: string;
        doctorAppointments: [];
        patientAppointments: [];

    }
}

const useFetchData = () => {
    const [appointmentsData, setAppointmentsData] = useState<AppointmentResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosInstance.get('/appointments/490f3eb4-2232-4cce-bfa7-37f91f1c53cd');
                setAppointmentsData(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return {
        appointmentsData,
        loading,
    };
};

export default useFetchData;