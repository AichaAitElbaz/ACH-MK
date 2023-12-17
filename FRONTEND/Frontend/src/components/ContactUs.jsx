import { useState } from 'react';
import { Switch } from '@headlessui/react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
// ... (autres imports)

const ContactUs = () => {

 

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [agreed, setAgreed] = useState(false); 
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
const [alertSeverity, setAlertSeverity] = useState('success');

  const notifySuccess = () => {
    setAlertSeverity('success');
    setOpenSnackbar(true);
    window.location.reload();
  };
  
  const notifyError = () => {
    setAlertSeverity('error');
    setOpenSnackbar(true);
  };

  const validateForm = () => {
    const newErrors = {};
  
    // Validate all form fields for non-empty values
    const formFields = ['first-name', 'last-name', 'email', 'phone-number', 'message'];
  
    formFields.forEach((field) => {
      const value = document.getElementById(field).value.trim();
  
      // Check for non-empty values
      if (!value) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
  
      // Check for a valid email address
      if (field === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = 'Enter a valid email address';
        }
      }
  
      // Check for numeric characters in the phone-number field
      if (field === 'phone-number' && value) {
        const numericRegex = /^[0-9]+$/;
        if (!numericRegex.test(value)) {
          newErrors['phone-number'] = 'Phone number must only contain numeric characters';
        }
      }
    });
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const formData = {
        'firstname': document.getElementById('first-name').value,
        'lastname': document.getElementById('last-name').value,
        'sender_email': document.getElementById('email').value,
        'phone_number': document.getElementById('phone-number').value,
        'message': document.getElementById('message').value,
      };

      // Si un utilisateur est connecté, ajoutez son ID au formulaire
      if (user) {
        formData.userid = user.id;
      }

      // Envoyez le formulaire au backend Django
      const response = await fetch('http://localhost:8000/account/send_message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        notifySuccess();
      } else {
        notifyError();
      }
    }
  };



  

  return (
    <div className="isolate bg-[#e1f7f3] px-6 py-14 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-[#424144] sm:text-4xl mt-0 pt-0">Contact Us</h2>
        <p className="mt-2 text-lg leading-8 text-[#424144]">
        Unlocking a New Era of Graph Intelligence        </p>
      </div>
    
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20 bg-white p-6 rounded-lg shadow-lg border-red-500 border"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>MAR</option>
                  <option>FR</option>
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
              
              </div>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
  By selecting this, you agree to our{' '}
  <a href="#" className="font-semibold text-[#3ed0b0]">
    privacy&nbsp;policy
  </a>
  .
</Switch.Label>

          </Switch.Group>
        </div>

{Object.keys(errors).map((field) => (
  <p key={field} className="mt-2 text-sm text-red-500">
    {errors[field]}
  </p>
))}

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-[#3ed0b0] text-white px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#86e1cd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>

        <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={() => setOpenSnackbar(false)}
>
  <Alert
    onClose={() => setOpenSnackbar(false)}
    severity={alertSeverity}
    sx={{ width: '100%' }}
  >
    {alertSeverity === 'success'
      ? 'Message sent successfully!'
      : 'Failed to send message.'}
  </Alert>
</Snackbar>
      </form>
    </div>

    
  );
};export default ContactUs;