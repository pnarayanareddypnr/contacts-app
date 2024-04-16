import './App.css';
import Form from './contacts/forms';
import ContactsTable from './contacts/contactsTable';
import Footer from './footer/Footer';

import { useState } from 'react';

function App() {
  const [selectedContact, setSelectedContact] = useState({});

  return (
    <>
      <div className="App">
        <h1>CONTACTS APP</h1>
      </div>
      <Form selectedContact={selectedContact} />
      <ContactsTable onSelectedContact={(contact) => {
        setSelectedContact(contact)
      }} />
      <Footer></Footer>
    </>
  );
}

export default App;
