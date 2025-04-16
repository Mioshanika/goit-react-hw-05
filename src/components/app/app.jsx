import { useState, useEffect } from 'react';
import s from './app.module.css';
import defaultPhonebook from '../../data/phonebook.json';
import ContactList from '../contact-list/contact-list.jsx';
import ContactForm from '../contact-form/contact-form.jsx';
import SearchBox from '../search-box/search-box.jsx';

export default function App() {
  // Phonebook state
  const [contacts, setContacts] = useState(() => {
    const lsContacts = localStorage.getItem('contacts');
    if (lsContacts !== null) return JSON.parse(lsContacts);
    return defaultPhonebook;
  });
  // Filter state
  const [filter, setFilter] = useState('');
  // Filtered phonebook state
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    setFilter('');
    setFilteredContacts(contacts);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  useEffect(() => {
    setFilteredContacts(
      contacts.filter(contact => {
        const name = contact.name.toLowerCase();
        const pattern = filter.toLowerCase();
        if (name.includes(pattern)) return true;
        return false;
      })
    );
  }, [filter]);
  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  const handleAdd = contact => {
    setContacts(() => {
      const newContacts = contacts.slice();
      newContacts.push(contact);
      return newContacts;
    });
  };
  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <div className={s.main_grid}>
        <ContactForm onSubmit={handleAdd} />
        <SearchBox filter={filter} onChange={setFilter} />
        <ContactList foundContacts={filteredContacts} onDelete={handleDelete} />
      </div>
    </div>
  );
}
