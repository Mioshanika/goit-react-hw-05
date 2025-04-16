import s from './contact.module.css';
import { FaMobileScreenButton } from 'react-icons/fa6';
import { FaRegFaceSmile } from 'react-icons/fa6';

export default function Contact({ name, phone, id, onDelete }) {
  return (
    <div className={s.contact_card}>
      <p>
        <FaRegFaceSmile size={'12px'} />
        &nbsp;{name}
      </p>
      <p>
        <FaMobileScreenButton size={'12px'} />
        &nbsp;{phone}
      </p>
      <button
        onClick={() => {
          onDelete(id);
        }}>
        Delete
      </button>
    </div>
  );
}
