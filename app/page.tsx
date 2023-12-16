'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

// Esquema de validación
const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username is too short')
    .max(50, 'Username is too long')
    .required('Username required'),
  password: Yup.string()
    .min(6, 'The password must be at least 6 characters.')
    .required('Password is required'),
});

export default function UserForm() {
  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch(`https://reqres.in/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.username,
          Password: values.password,
        }),
      });
      const result = await response.json();
      actions.setSubmitting(false);

      // Show SweetAlert2 to the user with their name
      Swal.fire({
        title: 'Registro Exitoso',
        text: `Bienvenido, ${result.name}!`,
        icon: 'success',
        confirmButtonText: 'Grasp',
      });
    } catch (error) {
      console.error(error);
      actions.setSubmitting(false);

      // Show SweetAlert2 with error message
      Swal.fire({
        title: 'Error',
        text: 'No se pudo completar el registro.',
        icon: 'error',
        color: '#000000',
        confirmButtonText: 'Comprending',
      });
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="container">
          <div className="content">
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yS/r/ajlEU-wEDyo.png"
              alt="Instagram"
              className="instagram-logo"
            />
            <form className="content__form">
              <div className="content__inputs">
                <label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Phone number, username, or email"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="username"
                    component="input"
                    className="text-red-500 text-sm mt-1"
                  />
                </label>
                <label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="input"
                    className="text-red-500 text-sm mt-1"
                  />
                </label>
              </div>
              <button type="submit" onSubmit={isSubmitting}>Log In</button>
            </form>
            <div className="content__or-text">
              <span></span>
              <span>OR</span>
              <span></span>
            </div>
            <div className="content__forgot-buttons">
              <a href="#">
                <span>
                  <svg
                    enableBackground="0 0 512 512"
                    viewBox="0 0 408.788 408.788"
                    y="0"
                    x="0"
                    height="512"
                    width="512"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        data-original="#475993"
                        fill="#475993"
                        d="M353.701 0H55.087C24.665 0 .002 24.662.002 55.085v298.616c0 30.423 24.662 55.085 55.085 55.085h147.275l.251-146.078h-37.951a8.954 8.954 0 0 1-8.954-8.92l-.182-47.087a8.955 8.955 0 0 1 8.955-8.989h37.882v-45.498c0-52.8 32.247-81.55 79.348-81.55h38.65a8.955 8.955 0 0 1 8.955 8.955v39.704a8.955 8.955 0 0 1-8.95 8.955l-23.719.011c-25.615 0-30.575 12.172-30.575 30.035v39.389h56.285c5.363 0 9.524 4.683 8.892 10.009l-5.581 47.087a8.955 8.955 0 0 1-8.892 7.901h-50.453l-.251 146.078h87.631c30.422 0 55.084-24.662 55.084-55.084V55.085C408.786 24.662 384.124 0 353.701 0z"
                      ></path>
                    </g>
                  </svg>
                </span>
                <span>Log in with Facebook</span>
              </a>
              <a href="#">Forgot password?</a>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
