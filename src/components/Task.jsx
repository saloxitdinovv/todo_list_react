import { HttpRequest } from "../hooks/http";


function Task({ name, desc, status, id }) {
    const { loading, error, request } = HttpRequest()

    return (
        <div
            onDoubleClick={(e) => {
                request(`/tasks/${id}`, 'delete')
                    .then((res) => {
                        console.log(res);
                        location.reload()
                    })
            }}
            className="bg-white rounded-xl border border-[#D8D8D8] p-6 flex flex-col gap-3 w-[300px]"
        >
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-[#A5A5B4] font-semibold max-h-[4lh] overflow-y-scroll no-scrollbar">{desc}</p>

            {
                status === 'completed' ? (<span className="font-semibold text-[#45ff5b]">Done</span>) : status === 'inProcess' ? (<span className="font-semibold text-[#007FFF]">In process</span>) : (<span className="font-semibold text-[#FF3F3F]">undone</span>)
            }
        </div>
    );
}
export default Task;
