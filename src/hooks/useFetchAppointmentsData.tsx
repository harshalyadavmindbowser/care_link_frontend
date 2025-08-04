import { useEffect, useState } from 'react';

import axiosInstance from "../utils/axios";
import { useAuth } from '../context/useAuth';

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
    const { user } = useAuth();
    console.log(user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosInstance.get('/appointments/7b7e9406-40b9-4f5a-a637-f639b0c1f6c3');
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