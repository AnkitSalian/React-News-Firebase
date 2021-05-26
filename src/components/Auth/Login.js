import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from './validateLogin';
import firebase from '../../firebase';

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {

  const { handleBlur, handleChange, handleSubmit, values, errors, submitting } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;

    try {
      login ?
        await firebase.login(email, password)
        :
        await firebase.register(name, email, password);

      props.history.push('/');
    } catch (err) {
      console.error('Authenticate user', err);
      setFirebaseError(err.message);
    }


  }

  return <div>
    <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
    <form onSubmit={handleSubmit} className="flex flex-column">
      {!login && <input
        onChange={handleChange}
        value={values.name}
        name="name"
        type="text"
        placeholder="Name"
        autoComplete="off"
      />}
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        className={errors.email && 'error-input'}
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="off"
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.password && 'error-input'}
        value={values.password}
        name="password"
        type="password"
        placeholder="Password"
      />
      {errors.password && <p className="error-text">{errors.password}</p>}
      {firebaseError && <p className="error-text">{firebaseError}</p>}
      <div className="flex mt3">
        <button type="submit" className="button pointer mr2" disabled={submitting}
          style={{ background: submitting ? 'grey' : 'orange' }}>
          Submit
        </button>
        <button type="button" className="pointer button"
          onClick={() => setLogin(prevLogin => !prevLogin)}
        >
          {login ? "Create Account" : "Already have an account?"}
        </button>
      </div>
    </form>
  </div>;
}

export default Login;
