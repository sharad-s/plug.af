import React, { Fragment } from 'react';
const formStyle = {
  'background-color': 'transparent',
};
const titular = {
  fontSize: '30px',
  color: '#f3e576 !important;',
  fontWeight: 'bold',
};

const AccountCreationForm = ({
  emailInput,
  passwordInput,
  onChange,
  onSubmit,
}) => (
  <Fragment>
    <p style={titular} className="login-text-other">
      Register
    </p>
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
