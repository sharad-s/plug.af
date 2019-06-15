import React, { Fragment } from 'react';
const formStyle = {
  'background-color': 'transparent',
};
const LoginForm = ({ emailInput, passwordInput, onChange, onSubmit }) => (
  <Fragment>
    <form className="pure-form flexstart-vert-flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Email"
        name="email"
        value={emailInput}
        style={formStyle}
        onChange={onChange}
        required
      />

      <br />

      <input
        type="password"
        className="form-input"
        placeholder="Password"
        name="password"
        style={formStyle}
        value={passwordInput}
        onChange={onChange}
        required
      />
      <br />

      <input
        type="submit"
        value="Login"
        className="pure-button btn-share button-enlarge"
      />
    </form>
  </Fragment>
);

export default LoginForm;
