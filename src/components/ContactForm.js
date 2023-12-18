import { ContactInput } from './ContactInput';
import React from 'react';
export const ContactForm = ({
  name,
  number,
  onNameChange,
  onNumberChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Name:
          <ContactInput
            type="text"
            value={name}
            onChange={onNameChange}
            required
          />
        </label>
        <label>
          Phone:
          <ContactInput
            type="tel"
            value={number}
            onChange={onNumberChange}
            required
          />
        </label>
      </div>
      <button type="submit">Add contact</button>
    </form>
  );
};
