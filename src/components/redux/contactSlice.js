// redux/contactSlice.js
import { createAction, createReducer } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';

// Initial state
export const getLocalStorage = () => {
  try {
    const serializedContacts = localStorage.getItem('contacts');
    if (serializedContacts === null) {
      return undefined;
    }
    return JSON.parse(serializedContacts);
  } catch (error) {
    console.error('Error getting contacts from local storage:', error);
    return undefined;
  }
};

const initialState = getLocalStorage() || [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

// Actions
export const addContact = createAction('contact/add');
export const deleteContact = createAction('contact/delete');
export const updateLocalStorage = (contacts) => {
  try {
    const serializedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', serializedContacts);
  } catch (error) {
    console.error('Error saving contacts to local storage:', error);
  }
};



// Reducer
const contactReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addContact, (state, action) => {
      const newContact = action.payload;
      const existedContact = state.some(
        (contact) => contact.name === newContact.name && contact.number === newContact.number
      );
      if (existedContact) {
        Notify.warning('This contact already exists');
      } else {
        state.push({ ...newContact, id: nanoid() });
      }
    })
    .addCase(deleteContact, (state, action) => {
      const contactId = action.payload;
      return state.filter((contact) => contact.id !== contactId);
    });
});

export default contactReducer;
