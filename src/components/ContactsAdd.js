import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  
  const navigate = useNavigate()
  const { setContacts, contacts, dbURL } = props
  const [newContact, setNewContact] = useState(
    {
      "id": contacts.length + 1,
      "firstName": "",
      "lastName": "",
      "street": "",
      "city": "",
      "email": "",
      "linkedIn": "",
      "twitter": ""
    }
  )

  const handleFormInput = (event) => {
    const inputValue = event.target.value
    const inputName = event.target.name
    setNewContact({...newContact, [inputName]: inputValue})
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch(dbURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newContact)
    })
     .then(res => res.json())
     .then(newContact => setContacts([...contacts, newContact]))
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
        value={newContact.firstName} 
        required 
      />

      <label htmlFor="lastName">Last Name:</label>
      <input 
        onChange={handleFormInput} 
        id="lastName" 
        name="lastName" 
        type="text" 
        value={newContact.lastName} 
        required
      />

      <label htmlFor="street">Street:</label>
      <input 
        onChange={handleFormInput} 
        id="street" 
        name="street" 
        type="text" 
        value={newContact.street} 
        required
      />

      <label htmlFor="city">City:</label>
      <input 
        onChange={handleFormInput} 
        id="city" 
        name="city" 
        type="text" 
        value={newContact.city} 
        required
      />

      <label htmlFor="city">LinkedIn:</label>
      <input 
        onChange={handleFormInput} 
        id="linkedIn" 
        name="linkedIn" 
        type="text" 
        value={newContact.linkedIn} 
      />

      <label htmlFor="city">Twitter:</label>
      <input 
        onChange={handleFormInput} 
        id="twitter" 
        name="twitter" 
        type="text" 
        value={newContact.twitter}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
