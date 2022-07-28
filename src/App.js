import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactEdit from "./components/ContactEdit"
import "./styles/styles.css"
const dbURL = 'http://localhost:4000/contacts'

export default function App() {
  const [contacts, setContacts] = useState([])
  // console.log('contacts state', contacts)

  useEffect(() => {
    fetch(dbURL)
     .then(res => res.json())
     .then(data => {setContacts(data); 
      // console.log('contacts API', data)
    })
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
        <li><Link to="/">Contacts List</Link></li>
        <li><Link to="/contacts/add">Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route path="/contacts/add" element={<ContactsAdd contacts={contacts} setContacts={setContacts} dbURL={dbURL} />} />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route path="/contacts/:id/edit" element={<ContactEdit contacts={contacts} setContacts={setContacts} />} />
        </Routes>
      </main>
    </>
  )
}
