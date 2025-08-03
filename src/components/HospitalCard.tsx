import Button from "./Button";
import ImageCard from "./ImageCard";

interface HospitalCardProps {
    hospitalName: string;
    hospitalAddress: string;
    hospitalImages: { images_url: string }[]
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospitalName, hospitalAddress, hospitalImages }) => {


    return (
        <>
            <div className="p-4 rounded-lg flex">
                <div>
                    <label htmlFor="hospitalName" className="font-bold">{hospitalName} name</label>
                    <p>address : {hospitalAddress} </p>
                </div>
                <div className="flex mt-6">
                    {
                        hospitalImages.map((img) => (
                            <div className="flex">
                                <ImageCard imgUrl={img.images_url} />
                            </div>
                        ))
                    }
                </div>

            </div>
            <Button className="border-none hover:outline rounded-full bg-gray-200 mt-4">
                Request Appointment
            </Button>
        </>
    );
};

export default HospitalCard;