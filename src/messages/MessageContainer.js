import { useState } from "react"
import { UserMessages } from "./Messages"
import { UserSearch } from "./MessageSearch"

export const MessageContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")


    return (
        <>
        <div className="">
			<UserSearch setterFunction={setSearchTerms} />
			<UserMessages searchTermState={searchTerms} />
         </div>
		</>
    )
}