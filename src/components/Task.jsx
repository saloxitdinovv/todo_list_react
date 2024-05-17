import { HttpRequest } from "../hooks/http";
import { TfiWrite } from "react-icons/tfi";
import { MdDelete } from "react-icons/md";


function Task({ name, desc, status, id, update, setUpdate }) {
    const { loading, error, request } = HttpRequest()

    return (
        <div    
            className="bg-white rounded-xl border border-[#D8D8D8] p-6 flex flex-col gap-3 w-[300px] relative"
        >
            <div className="heading absolute flex items-center justify-end right-5 gap-3 bottom-3">
                <button className="change"><TfiWrite size={22} /></button>
                <button
                    className="delete"
                    onClick={() => {
                        request(`/tasks/${id}`, 'delete')
                            .then(() => {
                                setUpdate(!update)
                            })
                    }}
                >
                    <MdDelete size={28} />
                </button>
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-[#A5A5B4] font-semibold max-h-[4lh] overflow-y-scroll no-scrollbar">{desc}</p>

            {
                status === 'completed' ? (<span className="font-semibold text-[#45ff5b]">Done</span>) : status === 'inProcess' ? (<span className="font-semibold text-[#007FFF]">In process</span>) : (<span className="font-semibold text-[#FF3F3F]">undone</span>)
            }
        </div>
    );
}
export default Task;
