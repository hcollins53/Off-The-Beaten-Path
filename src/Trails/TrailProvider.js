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
export const AddNewWishList = (newWish) => {
    return fetch(`http://localhost:8088/wantList`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
        body: JSON.stringify(newWish) 
     })
 }

export const GetUserWishList = (hikeUser) => {
    return fetch(`http://localhost:8088/wantList?_expand=user&_expand=trail&userId=${hikeUser.id}`)
            .then(res => res.json())
}














































