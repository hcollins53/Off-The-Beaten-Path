export const UserSearch = ({ setterFunction }) => {
    return(
        <div className="bg-orangeWheel">
        <div className="text-4xl font-title font-bold pl-4 text-center pt-4"> My Messages</div>
        <div className="ml-6 mb-4">
            <input className="rounded-lg text-gray-500 text-sm font-title font-light outline-none px-4 py-2 w-[400px] h-[35px] placeholder:text-sm placeholder:font-light"
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search for a user or message"/>
        </div>
        </div>
    )
}