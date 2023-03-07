import { Outlet, Route, Routes } from "react-router-dom"
import { TrailDetails } from "../Trails/TrailDetails"
import { AddTrail } from "../Trails/TrailForm"
import { TrailList } from "../Trails/TrailList"




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
            </Route>
        </Routes>
    )
}