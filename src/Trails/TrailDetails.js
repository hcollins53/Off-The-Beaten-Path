import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTrailById } from "./TrailProvider"


export const TrailDetails = () => {
    const {trailId} = useParams()
    const [trail, updateTrail] = useState({})

    useEffect(
        () => {
            getTrailById({trailId})
                .then((data) => {
                   const singleTrail = data[0]
                   updateTrail(singleTrail)
                })
        },
        [trailId]
    )

    return <>
    <section>
        <h1>{trail.name}</h1>
        <div>
        length: {trail.length} miles
        </div>
        <div>
            Elevation Gain: {trail.elevationGain} ft
        </div>
        <div>
            Difficulty: {trail.difficulty}
        </div>
        <div>
            <img src={trail.img} />
        </div>
    </section>
    </>
}