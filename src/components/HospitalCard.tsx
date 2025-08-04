import Button from "./Button";
import ImageCard from "./ImageCard";
import ReusableModal from "./Modal";
import axiosInstance from "../utils/axios";
import { useState } from "react";
interface HospitalCardProps {
    hospitalName: string;
    hospitalAddress: string;
    hospitalImages: { images_url: string }[]
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospitalName, hospitalAddress, hospitalImages }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");

    const handleRequestAppointment = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post("/appointments", {
                appointment_date: appointmentDate,
                appointment_time: appointmentTime,
                // hospital_id: hospitalId,
            });
            console.log("Appointment created:", response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error creating appointment:", error);
        }
    };

    return (
        <>
            <div className="p-4 rounded-lg flex">
                <div>
                    <label htmlFor="hospitalName" className="font-bold">name : {hospitalName}</label>
                    <p>address : {hospitalAddress} </p>
                </div>
                <div className="flex mt-10 ml-100">
                    {
                        hospitalImages.map((img) => (
                            <div className="flex">
                                <ImageCard imgUrl={img.images_url} />
                            </div>
                        ))
                    }
                </div>

            </div>
            <Button className="border-none hover:outline rounded-full bg-gray-200 mt-4" onClick={handleRequestAppointment}>
                Request Appointment
            </Button>
            <ReusableModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Request an Appointment"
                footer={
                    <>
                        <Button
                            className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="px-3 py-1 bg-blue-400 text-white rounded cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Send Request
                        </Button>
                    </>
                }
            >
                <div className="flex flex-col gap-4 items-center w-full">
                    <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="border px-3 py-2 rounded-md w-5/6"
                    />
                    <input
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="border px-3 py-2 rounded-md w-2/3"
                    />
                </div>
            </ReusableModal>
        </>
    );
};

export default HospitalCard;