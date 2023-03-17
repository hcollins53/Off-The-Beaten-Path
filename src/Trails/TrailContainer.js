import { useState } from "react"
import { TrailSearch } from "./TrailSearch"
import { TrailList } from "./TrailList"

export const TrailContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const[sortByDifficulty, setSortByDifficulty] = useState('')
    const[sortByMileage, setSortByMileage] = useState('')
    const[sortByElevation, setSortByElevation] = useState('')

    return (
        <>
        <div className="">
			<TrailSearch setterFunction={setSearchTerms} setSortByDifficulty={setSortByDifficulty} setSortByMileage={setSortByMileage} setSortByElevation={setSortByElevation} />
			<TrailList searchTermState={searchTerms} sortByDifficulty={sortByDifficulty} sortByMileage={sortByMileage} sortByElevation={sortByElevation} />
         </div>
		</>
    )
}