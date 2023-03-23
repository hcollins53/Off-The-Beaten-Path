import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getTrailById } from "./TrailProvider"
import { getCampsitesNearTrailId } from "./TrailProvider"

export const CampingSitesNearTrail = () => {
const {trailId} = useParams()
const[campSites, setCampSites] = useState([])
const[trail, setTrail] = useState({})
useEffect(
    () => {
        getCampsitesNearTrailId({trailId}).then(
            (campArray) => {
                setCampSites(campArray)
            }
        )     
    }, [trailId]
)
useEffect(
    () => {
        getTrailById({trailId}).then (
            (trailObj) => {
                setTrail(trailObj[0])
            }
)
    }, [trailId]
)
    return <>
    <div className="h-screen font-title">
    <div className="text-center text-2xl p-4">Campgrounds near {trail.name}</div>
    <div className="flex justify-center">
    {
        
        campSites.map(campSite => {
            return <div className="border border-slate-500 w-[400px] p-10 m-4 text-center">
              <div className="pb-2 text-xl underline">
                {campSite?.name}
              </div>
              <div  className="pb-2">
                {campSite?.distance} from the trailhead
              </div>
              <div>
               Cost per night: {campSite.fees}
              </div>
            </div>
        })
    }
   
    </div>
    <div className="mt-10">
        <img className="mx-auto w-[500px] rounded-lg shadow-xl brightness-90" src="https://cdn.dribbble.com/users/2517905/screenshots/15651749/media/e5595b1f647115b711652b8a40f0da90.gif" /> 
    </div>
    </div>
    </>
}