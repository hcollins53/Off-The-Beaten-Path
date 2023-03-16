export const TrailSearch = ({ setterFunction }) => {
    return(
        <div className="bg-orangeWheel">
        <div className="text-4xl font-title font-bold pl-2 text-center pt-4"> Trails</div>
        <div className="ml-4 mb-4">
            <input className="rounded-lg text-gray-500 text-sm font-title font-light outline-none px-4 py-2 w-[300px] h-[35px] placeholder:text-sm placeholder:font-light"
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search for a trail"/>
        </div>
        </div>
    )
}