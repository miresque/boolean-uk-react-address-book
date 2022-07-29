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
  const [isLoading, setIsLoading] = useState(true)
  // console.log('contacts state', contacts)

  useEffect(() => {
    fetch(dbURL)
     .then(res => res.json())
     .then(data => {
        if (data) {
          setContacts(data);
        }
        setIsLoading(false)      
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
          <Route path="/" element={<ContactsList contacts={contacts} setContacts={setContacts} isLoading={isLoading} />} />
          <Route path="/contacts/add" element={<ContactsAdd contacts={contacts} setContacts={setContacts} dbURL={dbURL} />} />
          <Route path="/contacts/:id" element={<ContactsView isLoading={isLoading} setIsLoading={setIsLoading} />} />
          <Route path="/contacts/:id/edit" element={<ContactEdit contacts={contacts} setContacts={setContacts} />} />
        </Routes>
      </main>
    </>
  )
}
