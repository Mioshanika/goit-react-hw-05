import s from './contact-list.module.css';
import Contact from '../contact/contact.jsx';

export default function ContactList({ foundContacts, onDelete }) {
  return (
    <ul className={s.contact_list}>
      {foundContacts.map(contact => {
        const { id, name, number } = contact;
        return (
          <li key={id}>
            <Contact name={name} phone={number} id={id} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}
