import React, { useState } from "react";
import css from "./contactForm.module.css";
import PropTypes from "prop-types";

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formInput}>
          <label htmlFor="Name" className={css.inputLabel}>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              placeholder="Name"
              value={name}
              className={css.formInput}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={css.formInput}>
          <label htmlFor="Phone number" className={css.inputLabel}>
            Phone
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              placeholder="Phone number"
              value={number}
              className={css.formInput}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={css.contactFormBtn}>
          <button type="submit" className={css.addContactBtn}>Add contact</button>
        </div>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};

export default ContactForm;
