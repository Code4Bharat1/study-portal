'use client';
import React, { useState } from 'react';

function Reactformsandvalidation() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-6">Forms and Validation in React</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        
        {/* Introduction */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Introduction</h2>
        <p className="text-gray-800 mb-6">
          Handling forms in React involves capturing user input through controlled components. Validation ensures that the form data entered by the user meets the required criteria before submission. Let’s explore how React simplifies form handling and validation.
        </p>

        {/* Controlled Components */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Controlled Components</h2>
        <p className="text-gray-800 mb-4">
          In React, form inputs like <code>input</code>, <code>textarea</code>, and <code>select</code> maintain their state through React state variables, making them "controlled components".
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-600">
{`import { useState } from 'react';

function SimpleForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted Name: ' + name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name" 
      />
      <button type="submit">Submit</button>
    </form>
  );
}`}
          </code>
        </pre>

        {/* Basic Validation */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Basic Validation Example</h2>
        <p className="text-gray-800 mb-4">
          You can add simple validation rules manually, such as checking if a field is empty before submitting.
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-600">
{`function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email address');
    } else {
      setError('');
      alert('Email submitted: ' + email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter your email" 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`}
          </code>
        </pre>

        {/* Using Third-Party Libraries */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Using Libraries like Formik and Yup</h2>
        <p className="text-gray-800 mb-4">
          For larger and more complex forms, libraries like <code>Formik</code> and <code>Yup</code> make form handling and validation much easier.
        </p>

        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-600">
{`import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

function SignupForm() {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {() => (
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}`}
          </code>
        </pre>

        {/* Important Points */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Important Tips</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
          <li>Always use controlled components for reliable form behavior.</li>
          <li>Perform both client-side and server-side validation for better security.</li>
          <li>Show helpful error messages to users.</li>
          <li>Use libraries like Formik for handling complex forms effortlessly.</li>
        </ul>

        {/* Example Project Idea */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Mini Project Idea 🚀</h2>
        <p className="text-gray-800 mb-4">
          Build a complete signup/login form with validation using React, Formik, and Yup. Store user data temporarily using localStorage or integrate with an API!
        </p>

        {/* Conclusion */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Conclusion</h2>
        <p className="text-gray-800 mb-6">
          Forms are essential in most applications. Mastering how to create controlled components, validate them properly, and improve user experience with helpful error feedback will make your apps much more professional.
        </p>

        <button className="mt-8 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
          Next: Advanced Form Management →
        </button>
      </div>
    </div>
  );
}

export default Reactformsandvalidation;
