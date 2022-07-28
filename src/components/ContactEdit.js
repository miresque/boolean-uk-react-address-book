import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
const contactTemplate = {
    "id": "",
    "firstName": "",
    "lastName": "",
    "street": "",
    "city": "",
    "email": "",
    "linkedIn": "",
    "twitter": ""
}

export default function ContactEdit(props) {
  const { setContacts, contacts } = props
  const navigate = useNavigate()
  const { id } = useParams()  
  const [updatedContact, setUpdatedContact] = useState(contactTemplate)
  
  useEffect(() => {
      fetch('http://localhost:4000/contacts/' + id)
      .then(res => res.json())
      .then(data => setUpdatedContact(data))
    }, [id])

  const contactIndex = () => {
    const index = contacts.findIndex(c => c.id === updatedContact.id)
    return index
  }

  const handleFormInput = (event) => {
    const inputValue = event.target.value
    const inputName = event.target.name
    setUpdatedContact({...updatedContact, [inputName]: inputValue})
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:4000/contacts/' + id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedContact)
    })
     .then(res => res.json())
     .then(updatedInfo => {
        const newContacts = [...contacts];
        newContacts.splice(contactIndex(), 1, updatedInfo);
        setContacts(newContacts)
    })
    navigate("/")
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input 
        onChange={handleFormInput} 
        id="firstName" name="firstName" 
        type="text" 
        value={updatedContact.firstName} 
        required 
      />

      <label htmlFor="lastName">Last Name:</label>
      <input 
        onChange={handleFormInput} 
        id="lastName" 
        name="lastName" 
        type="text" 
        value={updatedContact.lastName} 
        required
      />

      <label htmlFor="street">Street:</label>
      <input 
        onChange={handleFormInput} 
        id="street" 
        name="street" 
        type="text" 
        value={updatedContact.street} 
        required
      />

      <label htmlFor="city">City:</label>
      <input 
        onChange={handleFormInput} 
        id="city" 
        name="city" 
        type="text" 
        value={updatedContact.city} 
        required
      />

      <label htmlFor="city">LinkedIn:</label>
      <input 
        onChange={handleFormInput} 
        id="linkedIn" 
        name="linkedIn" 
        type="text" 
        value={updatedContact.linkedIn} 
      />

      <label htmlFor="city">Twitter:</label>
      <input 
        onChange={handleFormInput} 
        id="twitter" 
        name="twitter" 
        type="text" 
        value={updatedContact.twitter}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Submit Changes
        </button>
      </div>
    </form>
  )
}