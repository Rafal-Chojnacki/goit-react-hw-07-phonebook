// components/addContact.js
import { useEffect } from 'react';
import css from './addContact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, updateLocalStorage } from '../redux/contactSlice';

import ContactForm from 'components/contactForm';
import ContactList from 'components/contactList';

const AddContact = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    updateLocalStorage(contacts);
  }, [contacts]);

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
