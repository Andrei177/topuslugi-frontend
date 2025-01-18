import s from "./loader.module.css"
import cx from "classnames"

const Loader = ({className}: {className?: string}) => {
  return (
    <div className={className ? cx(s.loader, className) : s.loader}>
    </div>
  )
}

export default Loader
