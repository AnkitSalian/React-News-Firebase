import React, { useState } from "react";

function Login(props) {

  const [login, setLogin] = useState(true);
  return <div>
    <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
    <form className="flex flex-column">
      {!login && <input
        type="text"
        placeholder="Name"
        autoComplete="off"
      />}
      <input
        type="email"
        placeholder="Email"
        autoComplete="off"
      />
      <input
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
