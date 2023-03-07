export const getTrails = () => {
    return fetch(`http://localhost:8088/trails`)
            .then(res => res.json())
}
export const AddNewTrail = (newTrail) => {
    return fetch(`http://localhost:8088/trails`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
        body: JSON.stringify(newTrail) 
     })
 }
 export const getTrailById = ({trailId}) => {
    return fetch(`http://localhost:8088/trails?id=${trailId}`)
            .then(res => res.json())
}