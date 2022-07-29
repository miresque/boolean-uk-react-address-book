import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"

export default function ContactsView(props) {
  const [contact, setContact] = useState(false)
  const { id } = useParams()
  const { isLoading, setIsLoading } = props
  
  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:4000/contacts/' + id)
     .then(res => res.json())
     .then(data => {
      if (data) {
        setContact(data)
      }
      setIsLoading(false)
      })
  }, [id])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      {contact.linkedIn && <p>LinkedIn: {contact.linkedIn}</p>}
      {contact.twitter && <p>Twitter: {contact.twitter}</p>}
    </div>
  )
}