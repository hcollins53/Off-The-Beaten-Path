import { useEffect, useState } from "react"
import { getUser } from "../auth/LoginProvider"
import { Link, useNavigate } from "react-router-dom"
import { getUserCompletedList } from "./TrailProvider"
import { getReviewsByUser } from "../community/PostProvider"


export const CompletedList = () => {
    const[completed, setCompleted] = useState([])
    const [user, updateUser] = useState({})
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    useEffect(
        () => {
            getReviewsByUser(hikeUser).then(
                (reviewsArray) => {
                    setReviews(reviewsArray)
                }
            )
        }, []
    )
    useEffect(
        () => {
            getUserCompletedList(hikeUser).then(
                (completedArray) => {
                    setCompleted(completedArray)
                }
            )
        }, []
    )
    useEffect(
        () => {
            getUser(hikeUser).then(
                (userData) => {
                    const singleUser = userData[0]
                    updateUser(singleUser)
                }
            )
        }, []
    )
    const checkIfUserHasWrittenAReview = (complete) => {
        if(reviews.length){
            return reviews.map(review => {
                if(review.trailId === complete.trailId) {
                   return ""
                } else {
                   return <Link className="btn btn-primary" to={`/review/form/${complete.trailId}`}>Write a review</Link>
                }
            })
        } else {
            return <Link className="btn btn-primary" to={`/review/form/${complete.trailId}`}>Write a review</Link>
        }  
    }
    return <>
    <section>
        <h1>{user?.fullName}'s Completed Trail List</h1>
        {
            completed.map(complete => {
                return <section key={complete.id}>
                    <div>{complete?.trail?.name}</div>
                    <div className="w-72"><img src={complete?.trail?.img}/></div>
                    <div>  
                       {
                       checkIfUserHasWrittenAReview(complete)
                       
                       }
                    </div>
                    </section>
            })
        }
    </section>
    </>
}
