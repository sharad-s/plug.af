import React, { Fragment } from 'react';
const formStyle = {
  'background-color': 'transparent',
};
const AccountCreationForm = ({
  emailInput,
  passwordInput,
  onChange,
  onSubmit,
}) => (
  <Fragment>
    <p className="login-text">Register</p>
    <form className="pure-form flexstart-vert-flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Email"
        name="email"
        style={formStyle}
        value={emailInput}
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
        value="Register"
        className="pure-button btn-share button-enlarge"
      />
    </form>
  </Fragment>
);

export default AccountCreationForm;
