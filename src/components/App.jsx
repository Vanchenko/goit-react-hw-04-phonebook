import { Component } from 'react';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from './ContactList/ContactList';
import { ContactFind } from './ContactFind/ContactFind';

const LS_KEY = 'phonebook';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsStorage = JSON.parse(localStorage.getItem(LS_KEY));
    if (contactsStorage) {
      this.setState({ contacts: contactsStorage });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
  }

  saveContact = item => {
    console.log('item func saveContact', item);
    if (this.state.contacts.find(elem => elem.name === item.name)) {
      alert(`${item.name} is already in contacts.`);
    } else {
      this.state.contacts.push(item);
      this.setState({ contacts: this.state.contacts });
    }
  };

  findChange = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  deleteItem = id => {
    const idContact = this.state.contacts.findIndex(
      contact => contact.id === id
    );
    this.setState({ contact: this.state.contacts.splice(idContact, 1) });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(elem =>
      elem.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm getContact={this.saveContact} />
        <h2>Contacts</h2>
        <ContactFind find={filter} findChange={this.findChange} />
        <ContactList contacts={filteredContacts} deleteItem={this.deleteItem} />
      </div>
    );
  }
}