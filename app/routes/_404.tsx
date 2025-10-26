import { Link } from "react-router"

export default function Component() {
  return (
    <section className="module-layout">
      <div className="module-intro">
        <span className="badge badge--accent">404</span>
        <h1>Page not found</h1>
        <p>
          The page you are looking for doesn't exist. Choose a module from the navigation to
          continue learning.
        </p>
        <Link to="/" className="btn btn--primary btn--compact">
          Back to overview
        </Link>
      </div>
    </section>
  )
}
