import { Link } from 'react-router-dom'

const styles = {
  primary: 'btn btn-primary',
  ghost: 'btn btn-ghost',
}

export default function Button({ to, variant = 'primary', children }) {
  const className = styles[variant] ?? styles.primary
  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    )
  }
  return <button className={className}>{children}</button>
}
