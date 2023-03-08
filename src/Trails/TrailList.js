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
      <Popup className="font-body">
        {trail.name}
      </Popup>
      </Marker>
    
      </>   
    })
      
    
  }



export const TrailList = () => {
    const [trails, setTrails] = useState([])
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
    function MyMapComponent() {
            return (
                <MapContainer center={[43.0247, -108.3806]} zoom={4} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
          MapMarker(trails)
         }
        
        </MapContainer>
            )
    }
    return <>
        <article className="flex font-body">
        <article className="">
            <div className="text-2xl font-bold mb-4 pl-4 text-center">Trails </div>  
            {
                trails.map(trail => <Trails key={trail.id} id={trail.id} trail={trail} /> )
            }
            <section>
            <Link className="underline text-blue pl-4" to="/create">Can't find the trail you're looking for? </Link>
        </section>
        </article>
        <section id="map" className="mt-2">
        {
            MyMapComponent()
        }
    </section>
    </article>
    </>
}