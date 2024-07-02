import { type FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
      setRegistrationSuccess('Registration Successful!');
      setTimeout(() => {
        setRegistrationSuccess(null);
        navigate('/sign-in');
      }, 4000);
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoggedIn) {
    return (
      <div className="bg-customLightGreen rounded-xl min-h-screen flex flex-col p-6">
        <div className="m-10 text-customBrown text-4xl font-slab font-bold text-shadow-custom text-center">
          <p>
            You are logged in! Please sign out if you wish to create another
            account!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-customLightGreen rounded-xl min-h-screen flex flex-col p-6">
      <div className="m-10 text-customBrown text-4xl font-slab font-bold text-shadow-custom text-center">
        <h1>Register</h1>
      </div>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="m-10">
          <div className="flex flex-col">
            <label className="p-6">
              <span className="p-2 text-customBrown font-slab font-bold text-lg text-shadow-custom">
                Username:
              </span>
              <input
                required
                name="username"
                placeholder="username"
                type="text"
                className="shadow-md drop-shadow-2xl rounded bg-gray-100 pl-2 w-96"
              />
            </label>
            <label className="p-6">
              <span className="p-2.5 text-customBrown font-slab font-bold text-lg text-shadow-custom">
                Password:
              </span>
              <input
                required
                name="password"
                placeholder="password"
                type="password"
                className="shadow-md drop-shadow-2xl rounded bg-gray-100 pl-2 w-96"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="column-full d-flex justify-between">
            <button
              disabled={isLoading}
              className="m-9 p-1.5 w-24 font-sans bg-customGreen text-customBrown text-shadow-custom text-center shadow-md drop-shadow-2xl rounded">
              Register
            </button>
          </div>
        </div>
        <div
          className={`m-8 p-3 confirmation-message text-customBrown text-2xl font-slab font-bold text-shadow-custom text-center ${
            registrationSuccess ? 'animate-fadeIn' : ''
          }`}>
          {registrationSuccess && <div>{registrationSuccess}</div>}
        </div>
      </form>
    </div>
  );
}
