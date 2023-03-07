import { Link } from "react-router-dom"

export const Trails = ({id, trail}) => {
    return <>
    <section>
        <Link to={`/trails/${id}`}> {trail.name} </Link>
    </section>
    </>
}