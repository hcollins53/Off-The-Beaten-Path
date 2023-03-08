import { Link } from "react-router-dom"

export const Trails = ({id, trail}) => {

    return <>
    <article>
    <section className="mb-2 pl-4 text-center">
        <Link to={`/trails/${id}`}> {trail.name} </Link>
    </section>
    </article>
    </>
}