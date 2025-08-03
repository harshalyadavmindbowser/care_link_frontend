import ImageCard from "./ImageCard"
import Button from "./Button"
interface AppoitmentCardProps {
    date: string;
    time: string;
    personName: string;
    rejectionReason: string;
}
const AppoitmentCard : React.FC<AppoitmentCardProps> = ({ date, time, personName, rejectionReason }) => {

    const handleApprove = () => {

    }


    const handleReject = () => {

    }

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
        </div>
    )
}

export default AppoitmentCard