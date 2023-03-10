export const getReviews = () => {
    return fetch(`http://localhost:8088/reviews?_expand=user`)
    .then(res => res.json())
}
export const AddNewReview = (newReview) => {
    return fetch("http://localhost:8088/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
}
export const getReviewsByUser = (hikeUser) => {
    return fetch(`http://localhost:8088/reviews?_expand=user&userId=${hikeUser.id}`)
    .then(res => res.json())
}
export const EditUserProfile = (userProfile) => {
    return fetch(`http://localhost:8088/userProfiles/${userProfile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
           body: JSON.stringify(userProfile) 
        }).then(
            response => response.json())
}
export const AddNewProfile = (newProfile) => {
    return fetch("http://localhost:8088/userProfiles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProfile)
        })
            .then(res => res.json())
}