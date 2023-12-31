import { useState, useEffect } from 'react';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from './ContactList/ContactList';
import { ContactFind } from './ContactFind/ContactFind';

const LS_KEY = 'phonebook';

export const App = () => {

  const [contacts, setContacts] = useState(() => { 
    const savedData = localStorage.getItem(LS_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });

  const [filter, setFilter] = useState(''); 
  
   useEffect(() => {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
     },[contacts]);

  const saveContact = (item) => {
   if (contacts.find(elem => elem.name === item.name)) {
     alert(`${item.name} is already in contacts.`);
   } else {
     setContacts(prevState => [...prevState, item]);
    }
  };

  const findChange = (evt) => { setFilter( evt.currentTarget.value ) };

  const deleteItem = (id) => {
    setContacts([...contacts.filter(elem => elem.id !== id)]);
  };

  const filteredContacts = contacts.filter(elem => elem.name.toLowerCase().includes(filter.toLowerCase()));

return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm getContact={saveContact} />
        <h2>Contacts</h2>
        <ContactFind find={filter} findChange={findChange} />
        <ContactList contacts={filteredContacts} deleteItem={deleteItem} /> 
      </div>
    );
}