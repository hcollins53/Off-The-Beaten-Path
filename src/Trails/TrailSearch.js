export const TrailSearch = ({ setterFunction }) => {
    return(
        <div className="bg-orangeWheel">
        <div className="text-4xl font-title font-bold pl-4 text-center pt-4"> Trails</div>
        <div className="ml-20 mb-4">
            <input className="rounded border border-2 border-black search-hover"
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