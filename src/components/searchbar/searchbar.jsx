import s from './searchbar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Formik, Form, Field } from 'formik';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (values, actions) => {
    onSubmit(values.query.trim());
    actions.resetForm();
  };
  return (
    <header>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form className={s.query}>
          <Field type="text" name="query" autoComplete="off" autoFocus placeholder="Movie name" />
          <button type="submit">
            <FaMagnifyingGlass />
          </button>
        </Form>
      </Formik>
    </header>
  );
}
