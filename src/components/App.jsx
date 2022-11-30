import { useState, useEffect } from "react";
import { ContactForm } from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid'
import { Container } from 'components/App.styled';
import { Filter } from 'components/FilterField/Filter';
import { ContactsList } from 'components/ContactsList/ContactsList';




export const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');
  



  useEffect(() => {
    // const contacts = localStorage.getItem('contacts');
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  
  const handleSubmit = (values, { resetForm }) => {
    resetForm();
  
    const { name, number } = values;

    const contact = {
      name,
      number,
    };
   
    const dublicateContact = findDublicateContact(contact, contacts);

    dublicateContact
      ? alert(`${contact.name} is already in contacts`)
      : setContacts([...contacts, { ...values, id: nanoid() }]);
  };


  const findDublicateContact = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };
  
  
  
  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };
  
  const getRequiredCard = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  
  const deleteCard = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId),
    );
  };

  return (
      
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onFilterChange={onFilterChange}
      />
      <ContactsList requiredCard={getRequiredCard()} deleteCard={deleteCard} />
    </Container>
  );
};

