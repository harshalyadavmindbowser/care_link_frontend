import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import AppoitmentCard from "../../components/AppoitmentCard";
import useFetchData from '../../hooks/useFetchAppointmentsData'

interface Person {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  rejection_reason: string;
  status: "pending" | "approved" | "cancelled";
  provider?: Person;
  patient?: Person;
}

const Appointment: React.FC = () => {
  const [filter, setFilter] = useState<"pending" | "approved" | "cancelled">("pending");
  const { appointmentsData, loading } = useFetchData();

  const role = appointmentsData?.appoinments?.role;
  const appointments: Appointment[] =
    role === 'provider'
      ? appointmentsData?.appoinments?.doctorAppointments || []
      : appointmentsData?.appoinments?.patientAppointments || [];
  // console.log("appointmentsDataDoc status", appointments.filter(app => app.status))

  const getFilterButtonClass = (active: boolean) => `
  relative border-none pb-1
  after:absolute after:left-0 
  after:bottom-0 after:h-[2px]
  after:bg-blue-400
  after:transition-all
   after:duration-800
  after:w-0 hover:after:w-full
  ${active ? "after:w-full" : "text-black"}
`;
  return (
    <div className="fixed ms-40 w-400 mt-16 ">
      <>
        <h2 className="text-4xl font-bold">Appoitments</h2>
        <p className="mt-4 text-2xl">manage your upcoming and post appoitments</p>
      </>
      <section className="mt-4">
        <SearchBar className="bg-gray-200 w-[100px]" />
      </section>
      <section className="flex gap-6 p-3">
        <Button className={getFilterButtonClass(filter === "pending")} onClick={() => setFilter("pending")}>Pending</Button>
        <Button className={getFilterButtonClass(filter === "approved")} onClick={() => setFilter("approved")}>Approved</Button>
        <Button className={getFilterButtonClass(filter === "cancelled")} onClick={() => setFilter("cancelled")}>Cancled</Button>
      </section>
      <div className="h-120 overflow-y-scroll">
        <div className="h-120 overflow-y-scroll">
          {loading && appointments.length === 0 ? (
            <p>Loading...</p>
          ) : (
            appointments
              .filter((appt) => appt.status === filter)
              .map((appointment) => {
                const personName = role === "provider" ? appointment.patient?.full_name : appointment.provider?.full_name;
                return (
                  <AppoitmentCard
                    key={appointment.id}
                    date={appointment.appointment_date}
                    time={appointment.appointment_time}
                    personName={personName!}
                    rejectionReason={appointment.rejection_reason}
                  />
                );
              })
          )}
        </div>
      </div>

    </div >
  );
};

export default Appointment;
