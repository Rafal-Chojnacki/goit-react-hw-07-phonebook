import { useEffect } from 'react';
import css from './addContact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, fetchContacts } from '../redux/contactSlice';

import ContactForm from 'components/contactForm';
import ContactList from 'components/contactList';

const AddContact = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial contacts from API
    fetchContacts()
      .then(data => {
        if (data && data.length > 0) {
          dispatch({ type: 'contact/set', payload: data });
        }
      });
  }, [dispatch]);

  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.wrapper}>
      <div className={css.phoneBook}>
        <h1>Phonebook</h1>
        <ContactForm addContact={handleAddContact} />
      </div>
      <ContactList contacts={contacts} deleteContact={handleDeleteContact} />
    </div>
  );
};

export default AddContact;
