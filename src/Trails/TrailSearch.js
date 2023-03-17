

export const TrailSearch = ({ setterFunction, setSortByDifficulty, setSortByMileage, setSortByElevation }) => {
 
    return(
        <div className="bg-orangeWheel">
        <div className="text-4xl font-title font-bold text-center pt-4 pb-2"> Trails</div>
        <div className="flex flex-row justify-between">
        <div className="m-4 mb-4">
            <input className="rounded-lg text-gray-500 text-sm font-title font-light outline-none px-4 py-2 w-[300px] h-[35px] placeholder:text-sm placeholder:font-light"
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search for a trail"/>
        </div>
        <div>
        <select className="m-4 mb-4 rounded-lg text-gray-500 text-sm font-title font-light outline-none px-4 py-2 w-[200px] h-[35px] placeholder:text-sm placeholder:font-light"  onChange={(e) => setSortByDifficulty(e.target.value)}>
        <option className="m-2 p-2">Difficulty</option>
            <option key="easy" id="easy" value="easy"> easy </option>
            <option key="moderate" id="moderate" value="moderate"> moderate </option>
            <option key="hard" id="hard" value="hard"> hard </option>
            </select>
        </div>
        <div>
         <select className="m-4 mb-4 rounded-lg text-gray-500 text-sm font-title font-light outline-none px-4 py-2 w-[200px] h-[35px] placeholder:text-sm placeholder:font-light"  onChange={(e) => setSortByMileage(e.target.value)}>
            <option className="m-2 p-2">Length</option>
            <option key="easy" id="easy" value="3"> 0-3 miles </option>
            <option key="moderate" id="moderate" value="6"> 3-6 miles </option>
            <option key="hard" id="hard" value="6.1"> 6+ miles </option>
        </select>
        </div>
        <div>
         <select className="m-4 mb-4 rounded-lg text-gray-500 text-sm font-title font-light outline-none px-4 py-2 w-[200px] h-[35px] placeholder:text-sm placeholder:font-light"  onChange={(e) => setSortByElevation(e.target.value)}>
            <option className="m-2 p-2">Elevation Gain</option>
            <option key="easy" id="easy" value="700"> 0-700 ft </option>
            <option key="moderate" id="moderate" value="1500"> 700-1500 ft </option>
            <option key="hard" id="hard" value="1501"> 1500+ ft </option>
        </select>
        </div>
        </div>
        </div>
    )
}

//try to add a range slider for mileage?
