import {useEffect, useState} from "react";
import { useAuth } from "../../context/useAuth";
import axiosInstance from "../../utils/axios";

interface Patient {
  id: number;
  pname: string;
  date: string;
  time: string;
  reason: string;
  status: string;
}

const patientIno: Patient[] = [
  {
    id: 1,
    pname: "Jidnya Mahajan",
    date: "2024-02-15",
    time: "10 : AM",
    reason: "dummmmmmmmyyy reason",
    status: "pending",
  },
    {
    id: 2,
    pname: "Jhon",
    date: "2025-07-25",
    time: "10 : AM",
    reason: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
    status: "pending",
  },
   {
    id: 3,
    pname: "Jack",
    date: "2025-07-25",
    time: "10 : AM",
    reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: "pending",
  },
];



export default function Dashboard() {
  const { user } = useAuth();
  console.log("user",user?.full_name)
 const [patients, setPatients] = useState<Patient[]>([]);
  
  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await axiosInstance.get("/auth"); // Update endpoint if needed
        const appointmentData = response.data;

        const formattedData: Patient[] = appointmentData.map((item: any) => ({
          id: item.id,
          pname: item.patient_name || "Unknown",
          date: item.date || "N/A",
          time: item.time || "N/A",
          reason: item.reason || "N/A",
          status: item.status || "pending",
        }));

        setPatients(formattedData);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    getAppointments();
  }, []);
  const appointmnetsToday = '12' || 0;
  const pendingRequests = 5 || 0;
  const totalAppointments = 17|| 0;

  return (
    <div className="p-10 ml-60 mt-16 px-4ml-60 mr-60">
      <p className="text-2xl font-semibold mb-4">Dashboard</p>
      <p className="mb-6">Welcome back, {user?.full_name} </p>

      {/* dashboard card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {[
          { label: "Appointments Today", value: appointmnetsToday },
          { label: "Pending Requests", value: pendingRequests },
          { label: "Total Appointments", value: totalAppointments },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white-100 text-black border rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold">{item.label}</h3>
            <p className="text-3xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* tablee */}
      <p className="text-xl font-semibold mb-2">Recent Appointment Requests</p>
      <div className="overflow-x-auto shadow-lg rounded-lg mb-8">
        <table className="w-full text-sm text-left bg-white">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {patientIno.map((patient) => (
              <tr key={patient.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{patient.pname}</td>
                <td className="p-3">{patient.date}</td>
                <td className="p-3">{patient.time}</td>
                <td className="p-3">{patient.reason}</td>
                <td className="p-3">{patient.status}</td>
              </tr>
            ))}
          </tbody>
             {/* <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{patient.pname}</td>
                  <td className="p-3">{patient.date}</td>
                  <td className="p-3">{patient.time}</td>
                  <td className="p-3">{patient.reason}</td>
                  <td className="p-3 capitalize">{patient.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody> */}
        </table>
      </div>

      {/* hospital info */}
      <p className="text-xl font-semibold mb-4">Hospital Information</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
        <div>
          <p className="text-black-700 font-semibold">Hospital Name</p>
          <p>Jupyter Hospital</p>
        </div>
        <div>
          <p className="text-black-700 font-semibold">Address</p>
          <p>XYZ, Dummy road</p>
        </div>
        <div>
          <p className="text-black-700 font-semibold">Contact Number</p>
          <p>(+91) 9999876543210</p>
        </div>
        <div>
          <p className="text-black-700 font-semibold">Specialty</p>
          <p>Dum</p>
        </div>
      </div>
    </div>
  );
}
