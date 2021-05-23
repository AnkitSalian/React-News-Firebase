import React, { useState } from "react";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {

  const { handleChange, handleSubmit, values } = useFormValidation(INITIAL_STATE);

  const [login, setLogin] = useState(true);

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
        value={values.email}
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="off"
      />
      <input
        onChange={handleChange}
        value={values.password}
        name="password"
        type="password"
        placeholder="Password"
      />
      <div className="flex mt3">
        <button type="submit" className="button pointer mr2">
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
