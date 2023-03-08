import { useEffect, useState } from "react"
import { getUser } from "../auth/LoginProvider"
import { AddNewCompletedToList } from "./TrailProvider"
import { GetUserWishList } from "./TrailProvider"
import { useNavigate } from "react-router-dom"
import { DeleteWish } from "./TrailProvider"

export const WishList = () => {
    const [wishList, setWishList] = useState([])
    const [user, updateUser] = useState({})
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const navigate = useNavigate()

    const getWishList = () => {
        GetUserWishList(hikeUser).then(
            (wishArray) => {
                setWishList(wishArray)
            })
    }
    useEffect(
      () => {
        getWishList()
        
      } , []
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
    const handleAddToCompleted = (event, wish) => {
        event.preventDefault()
        const AddCompleted = {
            trailId: wish?.trail?.id,
            userId: hikeUser.id,
            date: new Date()
        }

        AddNewCompletedToList(AddCompleted).then(
            response => response.json())
        .then(() => {
            DeleteWish(wish).then(() => {
                navigate("/completed")
            })
        }) 
    }
    const deleteButton = (wish) => {
        return <button onClick={() => {
            DeleteWish(wish).then(() => {
                   getWishList()
                })  
        }} className="btn btn-primary">Delete</button>
    }
    
    return <>
    <section>
        <h1>{user?.fullName}'s Wish List</h1>
        {
            wishList.map(wish => {
                return <section key={wish.id}>
                    <div>{wish?.trail?.name}</div>
                    <div className="w-72"><img src={wish?.trail?.img}/></div>
                    <div>
                    <button onClick={(clickEvent) => handleAddToCompleted(clickEvent, wish)}
                    className="btn btn-primary">
                        Completed Trail
                    </button>
                   {
                    deleteButton(wish)
                   }
                    </div>
                    </section>
            })
        }
    </section>
    </>
}