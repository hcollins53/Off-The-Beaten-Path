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
    <article className="h-screen">
    <h1 className="text-3xl font-title text-center pt-12">{user?.fullName}'s Completed Trail List</h1>
    <section className="font-title pt-10 flex flex-wrap justify-center">
        {
            completed.map(complete => {
                return <section className="m-10  p-10 rounded-xl border-black border-2 shadow-2xl flex flex-wrap justify-center flex-col bg-gray-200" key={complete.id}>
                    <div className="text-center mb-4">{complete?.trail?.name}</div>
                    <div className="w-72 ml-4 mb-4"><img src={complete?.trail?.img}/></div>
                    <div className="ml-20">  
                       {
                       checkIfUserHasWrittenAReview(complete)
                       
                       }
                    </div>
                    </section>
            })
        }
    </section>
    </article>
    </>
}
