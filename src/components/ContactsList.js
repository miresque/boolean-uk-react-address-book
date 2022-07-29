import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"

export default function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts, setContacts, isLoading } = props
  const navigate = useNavigate()

  const delContact = (id) => {
    fetch('http://localhost:4000/contacts/' + id, {
    method: 'DELETE'
    })
    .then(() => {
      const newContacts = contacts.filter(c => c.id !== id)
      setContacts(newContacts)
    })
    navigate("/")
  }

  if (isLoading) {
    return (
      <>
        <header>
          <h2>Contacts</h2>
        </header>
        <LoadingSpinner />
      </>
    )
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        { contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p><Link to={`/contacts/${contact.id}`}>View</Link></p>
              <p className="del-button" onClick={() => delContact(contact.id)}>Delete</p>
              <p><Link to={`/contacts/${contact.id}/edit`}>Edit</Link></p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
