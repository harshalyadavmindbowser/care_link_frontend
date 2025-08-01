import React, { useState, MouseEvent } from "react";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import AppoitmentCard from "../../components/AppoitmentCard";

const Appointment: React.FC = () => {
  // const [filter, setFilter] = useState([]);

  // const handleFilter = (type) => {
  //   switch (type) {
  //     case 'pending':
  //       break;
  //     case 'approved':
  //       break;
  //     case 'cancled':

  //       break;
  //     default:
  //       break;
  //   }
  // };

  // let content;
  // if (pending) {
  //   content =
  //     <div>
  //       <strong>Pending Appoitments</strong>
  //       <AppoitmentCard />
  //     </div>
  // }
  // else if (approved) {
  //   content = <div>
  //     <strong>Pending Appoitments</strong>
  //     <AppoitmentCard />
  //   </div>
  // }
  // else if (cancled) {
  //   content = <div>
  //     <strong>Pending Appoitments</strong>
  //     <AppoitmentCard />
  //   </div>
  // }


  return (
    <div className="fixed ms-40 w-400 mt-16 ">
      <>
        <h2 className="text-4xl font-bold">Appoitments</h2>
        <p className="mt-4 text-2xl">manage your upcoming and post appoitments</p>
      </>
      <section className="mt-4">
        <SearchBar className="bg-gray-200 w-[100px]"/>
      </section>
      <section className="flex gap-6 p-3">
        <Button className="border-none hover:outline rounded-full" onClick={() => handleFilter("pending")}>Pending</Button>
        <Button className="border-none hover:outline rounded-full" onClick={() => handleFilter("approved")}>Approved</Button>
        <Button className="border-none hover:outline rounded-full" onClick={() => handleFilter("cancled")}>Cancled</Button>
      </section>
      <hr />
      <div className="h-120 overflow-y-scroll">
        <AppoitmentCard />
        <AppoitmentCard />
        <AppoitmentCard />
        <AppoitmentCard />
        <AppoitmentCard />
        <AppoitmentCard />
      </div>

    </div >
  );
};

export default Appointment;
