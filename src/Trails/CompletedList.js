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
    const [screenHeight, setScreeHight] = useState("")
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
                    if(completedArray.length > 3){
                        setScreeHight("full")
                    } else {
                        setScreeHight("screen")
                    }
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
                   return <Link className="btn font-light btn-color2" to={`/review/form/${complete.trailId}`}>Write a review</Link>
                }
            })
        } else {
            return <Link className="btn-sm font-light btn-color2" to={`/review/form/${complete.trailId}`}>Write a review</Link>
        }  
    }
    return <>
    <article className={`h-${screenHeight}`}>
    <h1 className="text-3xl font-title text-center pt-12">{user?.fullName}'s Completed Trail List</h1>
    <section className="font-title pt-10 flex flex-wrap justify-center">
        {
            completed.map(complete => {
                return <section className="m-10  p-2 rounded-xl border-black border-2 shadow-2xl flex flex-wrap justify-center flex-col bg-silver" key={complete.id}>
                    <div className="text-center text-xl m-4">
                    <Link to={`/trails/${complete.trailId}`}>{complete?.trail?.name}
                    </Link>
                    </div>
                    <div className="w-72 ml-6 mb-4"><img className="w-60 ml-4" src={complete?.trail?.img}/></div>
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
