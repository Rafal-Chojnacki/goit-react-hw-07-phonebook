import { createAction, createReducer } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import axios from 'axios';

const API_URL = 'https://64c925c9b2980cec85c1fa34.mockapi.io/contacts';

// Actions

export const addContact = createAction('contact/add');
export const deleteContact = createAction('contact/delete');


export const fetchContacts = () => {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching contacts from API:', error);
      return [];
    });
};

export const saveContact = (contact) => {
  return axios.post(API_URL, contact)
    .then(response => response.data)
    .catch(error => {
      console.error('Error saving contact to API:', error);
    });
};

export const deleteContactFromAPI = (id) => {
  return axios.delete(`${API_URL}/${id}`)
    .catch(error => {
      console.error('Error deleting contact from API:', error);
    });
};

// Reducer
const contactReducer = createReducer([], (builder) => {
  builder
    .addCase(addContact, (state, action) => {
      const newContact = action.payload;
      const existedContact = state.some(
        (contact) => contact.name === newContact.name && contact.number === newContact.number
      );
      if (existedContact) {
        Notify.warning('This contact already exists');
      } else {
        saveContact(newContact)
          .then(savedContact => {
            state.push({ ...savedContact, id: nanoid() });
          })
          .catch(error => {
            console.error('Error saving contact to API:', error);
          });
      }
    })
    .addCase(deleteContact, (state, action) => {
      const contactId = action.payload;
      state = state.filter((contact) => contact.id !== contactId);
      deleteContactFromAPI(contactId); // Delete contact from API
      return state;
    })
    .addCase('contact/set', (state, action) => {
      return action.payload;
    });
});

export default contactReducer;
