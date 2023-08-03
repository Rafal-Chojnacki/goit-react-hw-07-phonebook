import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import axios from 'axios';

const API_URL = 'https://64c925c9b2980cec85c1fa34.mockapi.io/contacts';


export const fetchContacts = createAsyncThunk('contact/fetchContacts', async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts from API:', error);
    throw error;
  }
});

export const saveContact = createAsyncThunk('contact/saveContact', async (contact) => {
  try {
    const response = await axios.post(API_URL, contact);
    return response.data;
  } catch (error) {
    console.error('Error saving contact to API:', error);
    throw error;
  }
});

export const deleteContact = createAsyncThunk('contact/deleteContact', async (contactId) => {
  try {
    await axios.delete(`${API_URL}/${contactId}`);
    return contactId;
  } catch (error) {
    console.error('Error deleting contact from API:', error);
    throw error;
  }
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveContact.fulfilled, (state, action) => {
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
      .addCase(deleteContact.fulfilled, (state, action) => {
        const contactId = action.payload;
        return state.filter((contact) => contact.id !== contactId);
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default contactSlice.reducer;
