import { Outlet, Route, Routes } from "react-router-dom"
import { UserProfileEdit } from "../community/EditUserProfile"
import { UserMessages } from "../messages/Messages"
import { Posts } from "../community/Posts"
import { Review } from "../community/reviewForm"
import { UserProfile } from "../community/UserProfile"
import { UserProfileForm } from "../community/UserProfileForm"
import { CompletedList } from "../Trails/CompletedList"
import { TrailContainer } from "../Trails/TrailContainer"
import { TrailDetails } from "../Trails/TrailDetails"
import { AddTrail } from "../Trails/TrailForm"
import { WishList } from "../Trails/WishList"
import { MessageForm } from "../messages/MessageForm"
import { UserProfiles } from "../community/UserProfiles"
import { UserInformation } from "../community/UserInformation"
import { PostByUserClicked } from "../community/PostsByUser"
import { EditPost } from "../community/EditPost"
import { CampingSitesNearTrail } from "../Trails/CampingSites"




export const ApplicationViews = () => {
    return <>
        <div className="bg-paleDogwood h-full w-full">
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
                 
            }>
              <Route path="/trails/:trailId" element={<TrailDetails />} />
              <Route path="/trails" element={<TrailContainer />} />
              <Route path="/create" element={<AddTrail />} />
              <Route path="/wishList" element={<WishList />} />
              <Route path ="/completed" element={<CompletedList />} />
              <Route path ="/review/form/:trailId" element={<Review />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/messages" element={<UserMessages />} />
              <Route path="/profile/edit/:userProfileId" element={<UserProfileEdit />} />
              <Route path="/profile/create/:userId" element={<UserProfileForm />} />
              <Route path="/message/create" element={<MessageForm />} />
              <Route path="/userProfiles" element={<UserProfiles />} />
              <Route path="/userProfile/:userId" element={<UserInformation />} />
              <Route path="/posts/:userId" element={<PostByUserClicked />} />
              <Route path="/post/edit/:reviewId" element={<EditPost />} />
              <Route path="/camping/:trailId" element={<CampingSitesNearTrail />} />
            </Route>
        </Routes>
        </div>
        </>
}