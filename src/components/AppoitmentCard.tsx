import { useState } from "react";
import ImageCard from "./ImageCard";
import Button from "./Button";
import ReusableModal from "./Modal";
import axiosInstance from "../utils/axios";
interface AppoitmentCardProps {
  date: string;
  time: string;
  personName: string;
  rejectionReason: string;
}
const AppointmentCard: React.FC<AppoitmentCardProps> = ({ date, time, personName, rejectionReason }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"approve" | "reject" | "rejectConfirmed" | null>(null);
  const [showTick, setShowTick] = useState(false);

  const appointment_date = "2025-08-01";
  const appointment_time = "10:00";
  const patient_id = "f9212493-e9ef-4c53-bd4c-3c67c67a9f65";
  const provider_id = "42b46db9-efaa-40c5-891f-83c65f785b97";
  const hospital_id = "1500df25-f64c-4013-8ae5-c3e48364ef9c";

  const handleApprove = () => {
    setModalType("approve");
    setModalOpen(true);
    setShowTick(false);
  };

  const handleReject = () => {
    setModalType("reject");
    setModalOpen(true);
    setShowTick(false);
  };

  const handleApproveConfirm = async () => {
    try {
      const payload = {
        appointment_date,
        appointment_time,
        patient_id,
        provider_id,
        hospital_id,
        status: "approved",
      };

      const response = await axiosInstance.post("/appointments", payload);
      console.log("Appointment approved:", response.data);

      setShowTick(true);
      setTimeout(() => {
        setModalOpen(false);
        setModalType(null);
        setShowTick(false);
      }, 3000);
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };


  const handleRejectConfirm = async () => {
    try {
      const payload = {
        appointment_date,
        appointment_time,
        patient_id,
        provider_id,
        hospital_id,
        status: "cancelled",
        rejection_reason: "Doctor unavailable",
      };

      const response = await axiosInstance.post("/appointments", payload);
      console.log("Appointment rejected:", response.data);

      setModalType("rejectConfirmed");
      setTimeout(() => {
        setModalOpen(false);
        setModalType(null);
      }, 3000);
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  return (
    <div className="flex mt-3 p-2" >
      <div className="w-[1400px]">
        <label htmlFor="name" className="font-bold">{personName}</label>
        <p>
          <label htmlFor="date">Date :</label>
          {date}
          <br />
          {
            time && (
              <>
                <label htmlFor="time">Time :</label>
                {time}

              </>
            )
          }
        </p>
        <p>
          {rejectionReason}
        </p>
        <div className="flex gap-2 mt-2">
          <Button className="border-none hover:outline rounded-full bg-gray-200" onClick={handleApprove}>Approve</Button>
          <Button className="border-none hover:outline rounded-full  bg-gray-200" onClick={handleReject}>Reject</Button>
        </div>
      </div>
      <div>
        <ImageCard />
      </div>
      {/* Modal */}
      <ReusableModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalType(null);
          setShowTick(false);
        }}
        showTickImage={showTick}
        title={
          showTick
            ? "Email has been sent to the patient"
            : modalType === "approve"
              ? "Are you sure you want to accept the appointment?"
              : modalType === "reject"
                ? "Are you sure you want to reject the appointment?"
                : modalType === "rejectConfirmed"
                  ? "Email has been sent to the patient"
                  : ""
        }
        footer={
          !showTick &&
          modalType !== "rejectConfirmed" && (
            <>
              <Button
                className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="px-3 py-1 bg-blue-400 text-white rounded cursor-pointer"
                onClick={
                  modalType === "approve"
                    ? handleApproveConfirm
                    : handleRejectConfirm
                }
              >
                Yes
              </Button>
            </>
          )
        }
      />
    </div>
  );
}

export default AppointmentCard;
