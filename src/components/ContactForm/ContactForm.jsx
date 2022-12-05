import { Formik } from 'formik';
import * as yup from 'yup';
import { FormWrapp, Input, Error, Label, SubmitButton } from 'components/ContactForm/ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, getContactsValue } from 'redux/phonebookSlice';
import { nanoid } from 'nanoid';

const schema = yup.object().shape({
    name: yup.string().matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan").required(),
    number: yup.string().min(4).max(12).matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +').required(),

})

const initialValues = {
    name: '',
    number: '',
}

export const ContactForm = () => {
    const dispatch = useDispatch();
    const { contacts } = useSelector(getContactsValue);

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
        : dispatch(addContact({ ...values, id: nanoid() }));
    };
    
    const findDublicateContact = (contact, contactsList) => {
        return contactsList.find(
            item => item.name.toLowerCase() === contact.name.toLowerCase()
        );
    };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={schema}>
            <FormWrapp autoComplete='off'>
                <Label htmlFor='number'>Number</Label>
                <Input
                    type="tel"
                    name="number"
                    placeholder='Please, enter your Number'
                    required
                />
                <Error name="number" component='div' />
                

                <Label htmlFor='name'>Name</Label>
                <Input
                    type="text"
                    name="name"
                    placeholder='Please, enter your Name'
                    required
                />
                <Error name="name" component='div' />
                <SubmitButton type='submit'>Add contact</SubmitButton>
        
            </FormWrapp>

        </Formik>
    );
};

