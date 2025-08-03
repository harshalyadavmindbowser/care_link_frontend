import { useEffect, useState } from 'react';

import axiosInstance from "../utils/axios";

interface HospitalResponse {
    hospital_name: string;
    hospital_address: string;
    images: []
}

const useFetchData = () => {
    const [hospitalData, setHospitalData] = useState<HospitalResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosInstance.get('/hospitals');
                setHospitalData(response);
            } catch (error) {
                console.error(error)
            }
        };

        fetchData();
    }, []);

    return {
        hospitalData,
    };
};

export default useFetchData;