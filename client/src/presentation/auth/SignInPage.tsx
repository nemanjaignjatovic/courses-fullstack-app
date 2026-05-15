import { ChangeEvent, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form } from '../components/Form';
import { useAuth } from './AuthContext';

interface LocationState {
  from?: { pathname: string };
}

export function SignInPage() {
  const history = useHistory();
  const location = useLocation<LocationState | undefined>();
  const { signIn } = useAuth();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === 'emailAddress') setEmailAddress(value);
    if (name === 'password') setPassword(value);
  }

  async function submit() {
    try {
      const user = await signIn(emailAddress, password);

      if (!user) {
        setErrors(['Sign-in was unsuccessful']);
        return;
      }

      history.push(location.state?.from ?? { pathname: '/' });
    } catch {
      history.push('/error');
    }
  }

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <Form cancel={() => history.push('/')} errors={errors} submit={submit} submitButtonText="Sign In">
        <input id="emailAddress" name="emailAddress" type="text" value={emailAddress} onChange={change} placeholder="Email Address" />
        <input id="password" name="password" type="password" value={password} onChange={change} placeholder="Password" />
      </Form>
      <p>Don't have a user account? <Link to="/signup">Click Here</Link> to sign up!</p>
    </div>
  );
}
