import Button from "./Button";

interface HospitalCardProps {
    hospitalName: string;
    hospitalAddress: string;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospitalName, hospitalAddress, hospitalImages }) => {


    return (
        <div className="p-4 rounded-lg">
            <label htmlFor="hospitalName" className="font-bold text-xl">{hospitalName} name</label>
            <p>{hospitalAddress} address</p>
            <div>
            </div>

            <Button className="border-none hover:outline rounded-full bg-gray-200 mt-4">
                Request Appointment
            </Button>
        </div>
    );
};

export default HospitalCard;
