import React, { useState } from 'react';
import css from './contactList.module.css';

const ContactList = ({ contacts, deleteContact }) => {
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getContacts = () => {
    if (filter.length === 0) {
      return contacts;
    }
    return contacts.filter(
      contact => contact.name.toLowerCase().indexOf(filter) >= 0
    );
  };

  const clearFindInput = () => {
    setFilter('');
  };

  return (
    <div>
      <div>
        <h2>Contacts</h2>
        <form className={css.form}>
          <div className={css.formInput}>
            <label htmlFor="Find contacts by name" className={css.inputLabel}>
              Find contacts by name
              <input
                type="text"
                name="filter"
                placeholder="finding name"
                value={filter}
                onChange={handleChange}
                className={css.formInput}
              ></input>
            </label>
          </div>
        </form>
      </div>
      <div>
        <button className={css.clearBtn} onClick={clearFindInput}>
          &#10005;
        </button>
      </div>
      <ul>
        {getContacts().map(({ name, number, id }) => (
          <li key={id} className={css.contact}>
            {name} --- {number}
            <div>
              <button
                className={css.deleteBtn}
                onClick={() => deleteContact(id)}
              >
                Delete contact
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
