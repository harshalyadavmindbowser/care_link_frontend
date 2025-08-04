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
                const { data: response } = await axiosInstance.get('/appointments/cf194c53-5c90-4a88-b625-ece5ef386bf5');
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