import { useAuth } from "../../context/AuthContext";

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
];

export default function Dashboard() {
  const { user } = useAuth();

  const appointmnetsToday = user?.total_job_posted || 0;
  const pendingRequests = user?.total_cand_hired || 0;
  const totalAppointments = user?.active_job_posts || 0;

  return (
    <div className="p-10 ml-60 mt-16 px-4ml-60 mr-60">
      <p className="text-2xl font-semibold mb-4">Dashboard</p>
      <p className="mb-6">Welcome back, Dr. </p>

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
          <thead className="bg-[#2C253D] text-white">
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
