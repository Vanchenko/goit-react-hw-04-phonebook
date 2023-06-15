import { useState, useEffect } from 'react';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from './ContactList/ContactList';
import { ContactFind } from './ContactFind/ContactFind';

const LS_KEY = 'phonebook';

export const App = () => {


  const [contacts, setContacts] = useState(() => { 
    const tt = localStorage.getItem(LS_KEY);
    if (tt) { return JSON.parse(tt) } else { return [] }
  });

  const [filter, setFilter] = useState(''); 
  
   useEffect(() => {
     console.log('use Effect Update Contacts ', contacts);
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
    const idContact = contacts.findIndex(contact => contact.id === id);
    const rr = contacts.splice(idContact, 1);
    setContacts([...contacts]);
  };

  const filteredContacts = contacts.filter(elem => elem.name.toLowerCase().includes(filter.toLowerCase()));
  console.log('filtered', filteredContacts)

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