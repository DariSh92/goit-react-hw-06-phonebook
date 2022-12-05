import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'components/App.styled';
import { Filter } from 'components/FilterField/Filter';
import { ContactList } from 'components/ContactsList/ContactsList';


export const App = () => {
 
  
  // useEffect(() => {
  //   // const contacts = localStorage.getItem('contacts');
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  
  return (
      
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      
      <h2>Contacts</h2>
      <Filter/>
      <ContactList/>
    </Container>
  );
};

