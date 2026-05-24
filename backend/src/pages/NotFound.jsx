import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <div className="page center">
      <h1>404</h1>
      <p className="muted">This route does not exist yet.</p>
      <Button to="/" variant="primary">
        Back to Home
      </Button>
    </div>
  )
}
