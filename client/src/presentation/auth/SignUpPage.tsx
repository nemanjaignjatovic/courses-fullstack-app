import { ChangeEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '../components/Form';
import { useAuth } from './AuthContext';

export function SignUpPage() {
  const history = useHistory();
  const { authRepository, signIn } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === 'firstName') setFirstName(value);
    if (name === 'lastName') setLastName(value);
    if (name === 'emailAddress') setEmailAddress(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  }

  async function submit() {
    try {
      const apiErrors = await authRepository.createUser({ firstName, lastName, emailAddress, password });
      const nextErrors = [...apiErrors];

      if (password !== confirmPassword) {
        nextErrors.push('Both passwords must match.');
      }

      if (nextErrors.length) {
        setErrors(nextErrors);
        return;
      }

      await signIn(emailAddress, password);
      history.push('/');
    } catch {
      history.push('/error');
    }
  }

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <Form cancel={() => history.push('/')} errors={errors} submit={submit} submitButtonText="Sign Up">
        <input id="firstName" name="firstName" type="text" value={firstName} onChange={change} placeholder="First Name" />
        <input id="lastName" name="lastName" type="text" value={lastName} onChange={change} placeholder="Last Name" />
        <input id="emailAddress" name="emailAddress" type="text" value={emailAddress} onChange={change} placeholder="Email Address" />
        <input id="password" name="password" type="password" value={password} onChange={change} placeholder="Password" />
        <input id="confirmPassword" name="confirmPassword" type="password" value={confirmPassword} onChange={change} placeholder="Confirm Password" />
      </Form>
      <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
    </div>
  );
}
