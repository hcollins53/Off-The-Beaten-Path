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
export const AddNewCompletedToList = (newCompleted) => {
    return fetch(`http://localhost:8088/completedList`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
        body: JSON.stringify(newCompleted) 
     })
 }
 export const DeleteWish = wish => {
    return fetch(`http://localhost:8088/wantList/${wish.id}`, {
        method: "DELETE"
    })
}
export const getUserCompletedList = (hikeUser) => {
    return fetch(`http://localhost:8088/completedList?_expand=user&_expand=trail&userId=${hikeUser.id}`)
            .then(res => res.json())
}
export const getWeather = (trail) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${trail.lat}&lon=${trail.lon}&appid=d00e2aa1ff1e89999b98b23f997071c4&units=imperial`)
    .then(response => response.json())
    }

export const WeatherIcon = (icon) => {
    return (`http://openweathermap.org/img/wn/${icon}.png`)
}







































