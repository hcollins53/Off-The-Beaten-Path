import { useEffect, useState } from "react"
import { GetUserWishList } from "./TrailProvider"

export const WishList = () => {
    const [wishList, setWishList] = useState([])
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)

    useEffect(
      () => {
        GetUserWishList(hikeUser).then(
            (wishArray) => {
                setWishList(wishArray)
            }
        )
      }  
    )
    return <>
    <section>
        <h1>{wishList?.user?.name}'s Wish List</h1>
        {
            wishList.map(wish => {
                return <section key={wish.id}>
                    <div>{wish?.trail?.name}</div>
                    <div><img src={wish?.trail?.img} /></div>
                    </section>
            })
        }
    </section>
    </>
}