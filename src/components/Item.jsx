import { formatDisplayDate } from "../utils/DateTime";


const Item = ({title,message,createdAt}) => {

    return (
        <>
            <div className="flex justify-center pt-6">
                <div className="w-full max-w-[750px] bg-[#F7F7F7] p-6 rounded text-lg">
                    <p>{title ?? '-'}</p>
                    <p className="break-words">{message ?? '-'}</p>
                    <p>{formatDisplayDate(createdAt)}</p>
                </div>
            </div>
        </>
    )
}

export default Item