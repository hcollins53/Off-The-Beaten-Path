import { useEffect, useState } from "react"
import { getUser } from "../auth/LoginProvider"
import { AddNewCompletedToList } from "./TrailProvider"
import { GetUserWishList } from "./TrailProvider"
import { useNavigate, Link } from "react-router-dom"
import { DeleteWish } from "./TrailProvider"

export const WishList = () => {
    const [wishList, setWishList] = useState([])
    const [user, updateUser] = useState({})
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const navigate = useNavigate()
    const [screenHeight, setScreeHight] = useState("")

    const getWishList = () => {
        GetUserWishList(hikeUser).then(
            (wishArray) => {
                setWishList(wishArray)
                if(wishArray.length > 3){
                    setScreeHight("full")
                } else {
                    setScreeHight("screen")
                }
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
        }} className="btn-sm btn-justColor font-light">x</button>
    }
    
    return <>
    <div className={`h-${screenHeight}`}>
    <h1 className="text-3xl font-title text-center pt-6">{user?.fullName}'s Wish List</h1>
    <section className="font-title pt-10 flex flex-wrap justify-center">
        {
            wishList.map(wish => {
                return <section className="m-4 p-2 rounded-xl border-black border-2 shadow-2xl mb-10 bg-silver w-auto " key={wish.id}>
                    <div className="flex justify-end pb-2">
                    {
                    deleteButton(wish)
                   }
                   </div>
                    <div className="mb-4 text-xl text-center">
                        <Link to={`/trails/${wish.trailId}`}>{wish?.trail?.name}</Link></div>
                    <div className="w-80 h-64 mx-auto"><img className="h-56 mx-auto" src={wish?.trail?.img}/></div>
                    <div className="flex flex-row">
                    <button onClick={(clickEvent) => handleAddToCompleted(clickEvent, wish)}
                    className="btn-sm mx-auto mb-2 btn-color2 ">
                        Completed Trail
                    </button>
                    </div>
                    </section>
            })
        }
    </section>
    </div>
    </>
}