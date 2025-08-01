import ImageCard from "./ImageCard"
import Button from "./Button"
function AppoitmentCard() {

    const handleApprove = () => {

    }

    const handleReject = () => {

    }

    const date = "1/08/2025"
    const time = ""
    const discription = "Dummy information typically refers to placeholder data used in place of real information for testing, demonstration, or development purposes. It's not actual data and serves to represent the structure and characteristics of real data without containing sensitive or meaningful information. "
    return (
        <div className="flex mt-3 p-2">
            <div className="w-[1400px]">
                <label htmlFor="name" className="font-bold">Shreyash Gailwad</label>
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
                    {discription}
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