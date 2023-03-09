import { useState } from "react"
import { TrailSearch } from "./TrailSearch"
import { TrailList } from "./TrailList"

export const TrailContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")


    return (
        <>
        <div className="">
			<TrailSearch setterFunction={setSearchTerms} />
			<TrailList searchTermState={searchTerms} />
         </div>
		</>
    )
}