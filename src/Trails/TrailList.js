import { useEffect, useState } from "react"
import { getTrails } from "./TrailProvider"
import { Trails } from "./Trails"
import { Link, useNavigate } from "react-router-dom"




export const TrailList = () => {
    const [trails, setTrails] = useState([])
    const navigate = useNavigate()
   
    useEffect(
        () => {
            getTrails()
             .then((trailsArray) => {
                setTrails(trailsArray)
             })
             // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )
   
    return <>
        <article className="trails">Trails   
            {
                trails.map(trail => <Trails key={trail.id} id={trail.id} trail={trail} /> )
            }
        </article>
        <section>
            <Link to="/create">Can't find the trail you're looking for? </Link>
        </section>
    </>
}