import { useEffect, useState } from "react"
import { getTrails } from "./TrailProvider"
import { Trails } from "./Trails"
import { Link, useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet/src/layer/marker/Icon'

export const MapMarker = (trails) => {
   return trails.map(trail => {
    return <>
    
    <Marker  position={[trail?.lat, trail?.lon]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}>
      <Popup className="font-title">
      <Link to={`/trails/${trail.id}`}> {trail.name} </Link>
      </Popup>
      </Marker>
    
      </>   
    })
      
    
  }



export const TrailList = ({searchTermState}) => {
    const [trails, setTrails] = useState([])
    const[filteredTrails, setFilteredTrails] = useState([])
    const navigate = useNavigate()
   
    useEffect(
        () => {
            getTrails()
             .then((trailsArray) => {
                setTrails(trailsArray)
             })
        },
        [] 
    )
    useEffect(
        () => {
           const searchedTrails = trails.filter(trails => {
           return trails.name.toLowerCase().startsWith(searchTermState.toLowerCase())
        })
           setFilteredTrails(searchedTrails)
    
        },
        [searchTermState]
    )
    function MyMapComponent() {
            return (
                <MapContainer center={[47.6588, -117.4260]} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            filteredTrails ?
          MapMarker(filteredTrails)
          :
          MapMarker(trails)
         }
        
        </MapContainer>
            )
    }
    return <>
        <article className="flex font-title">
        <article className=""> 
            {
                searchTermState ?
                filteredTrails.map((trail) => <Trails key={trail.id} id={trail.id} trail={trail} /> )
                :
                trails.map((trail) => <Trails key={trail.id} id={trail.id} trail={trail} /> )
            }
            <section>
            <Link className="underline text-blue pl-4" to="/create">Can't find the trail you're looking for? </Link>
        </section>
        </article>
        <section id="map" className="">
        {
            MyMapComponent()
        }
    </section>
    </article>
    </>
}