import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"
const dbURL = 'http://localhost:4000/contacts'

export default function App() {
  const [contacts, setContacts] = useState([])
  
  //TODO: Load all contacts on useEffect when component first renders
  useEffect(() => {
    fetch(dbURL)
     .then(res => res.json())
     .then(data => setContacts(data))
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to={"/"}><li>Contacts List</li></Link>
          <Link to={"/create"}><li>Add New Contact</li></Link>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route path="/create" element={<ContactsAdd />} />
          <Route path="/view/:id" element={<ContactsView />} />
        </Routes>
      </main>
    </>
  )
}
