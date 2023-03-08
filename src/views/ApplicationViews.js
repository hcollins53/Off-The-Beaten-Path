import { Outlet, Route, Routes } from "react-router-dom"
import { Posts } from "../community/Posts"
import { Review } from "../community/reviewForm"
import { CompletedList } from "../Trails/CompletedList"
import { TrailDetails } from "../Trails/TrailDetails"
import { AddTrail } from "../Trails/TrailForm"
import { TrailList } from "../Trails/TrailList"
import { WishList } from "../Trails/WishList"




export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
                 
            }>
              <Route path="/trails" element={<TrailList />} />
              <Route path="/trails/:trailId" element={<TrailDetails />} />
              <Route path="/create" element={<AddTrail />} />
              <Route path="/wishList" element={<WishList />} />
              <Route path ="/completed" element={<CompletedList />} />
              <Route path ="/review/form" element={<Review />} />
              <Route path="/posts" element={<Posts />} />
            </Route>
        </Routes>
    )
}