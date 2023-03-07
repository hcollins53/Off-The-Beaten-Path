import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AddNewTrail } from "./TrailProvider"


export const AddTrail = () => {
    const navigate = useNavigate()
    const[trail, update] = useState({
        name: "",
        length: "",
        elevationGain: "",
        difficulty: "",
        lat: "",
        lon: "",
        img: ""
    })
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newTrail= {
            name: trail.name,
            length: trail.length,
            elevationGain: trail.elevationGain,
            difficulty: trail.difficulty,
            lat: trail.lat,
            lon: trail.lon,
            img: trail.img
        }

       AddNewTrail(newTrail).then(
            response => response.json())
            .then(() => {
               navigate("/trails")
            }) 

    }
    return (
        <form className="trailForm">
            <h2 className="trailForm__title">Add New Trail</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of the trail"
                        value={trail.name}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="length">How long is the trail:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="length in miles"
                        value={trail.length}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.length = parseFloat(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="elevationGain">What is the elevation gain:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="in feet"
                        value={trail.elevationGain}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.elevationGain = parseInt(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="difficulty">What is the difficulty:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control"
                        value={trail.difficulty}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.difficulty = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lat">What is the latitude of the trail location:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control"
                        value={trail.lat}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.lat = parseFloat(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lon">What is the longitude of the trail location:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control"
                        value={trail.lon}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.lon = parseFloat(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Post a link to an image of the Trail:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control"
                        value={trail.img}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.img = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="btn btn-primary">
                Submit New Trail
            </button>
        </form>
    )

}
