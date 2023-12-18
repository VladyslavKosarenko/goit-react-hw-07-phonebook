import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact } from '../redux/reducers/contactsSlice';
import { updateFilter } from '../redux/reducers/filterSlice';

export const PhoneBook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.value);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeName = event => {
    const value = event.target.value;
    setName(value);
  };

  const handleChangePhone = event => {
    const valueNumber = event.target.value;
    setNumber(valueNumber);
  };

  const handleChangeFilter = event => {
    dispatch(updateFilter(event.target.value));
  };

  const handleSubmit = event => {
    event.preventDefault();
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

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        onNameChange={handleChangeName}
        onNumberChange={handleChangePhone}
        onSubmit={handleSubmit}
      />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={handleChangeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
