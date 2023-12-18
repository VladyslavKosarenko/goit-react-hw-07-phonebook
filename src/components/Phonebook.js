import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from '../redux/reducers/contactsSlice';

export const Phonebook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items || []);
  const isLoading = useSelector(state => state.contacts.isLoading);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleChangeName = event => {
    const value = event.target.value;
    setName(value);
  };

  const handleChangeNumber = event => {
    const valueNumber = event.target.value;
    setNumber(valueNumber);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!Array.isArray(contacts)) {
      console.error('Invalid contacts data:', contacts);
      return;
    }

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleUpdateContact = (contactId, updatedContact) => {
    dispatch(updateContact({ id: contactId, updatedContact }));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        onNameChange={handleChangeName}
        onNumberChange={handleChangeNumber}
        onSubmit={handleSubmit}
      />

      <h2>Contacts</h2>
      <Filter />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ContactList
          contacts={contacts}
          onDeleteContact={handleDeleteContact}
          onUpdateContact={handleUpdateContact}
        />
      )}
    </div>
  );
};
