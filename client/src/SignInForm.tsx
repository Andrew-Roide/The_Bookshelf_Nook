import { type FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      sessionStorage.setItem('token', token);
      setIsLoggedIn(true);
      console.log('Signed In', user, '; received token:', token);
      navigate('/');
    } catch (err) {
      alert(
        `Error signing in: No account registered under that username or password!`
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoggedIn) {
    return (
      <div className="bg-customLightGreen rounded-xl min-h-screen flex flex-col p-6">
        <div className="m-10 text-customBrown text-4xl font-slab font-bold text-shadow-custom text-center">
          <p>You are already signed in! Get to adding books!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-customLightGreen rounded-xl min-h-screen flex flex-col p-6">
      <div className="m-10 text-customBrown text-4xl font-slab font-bold text-shadow-custom text-center">
        <h1>Sign In</h1>
      </div>
      <div className="text-customBrown text-xl font-slab font-bold text-shadow-custom text-center my-8">
        <p>Please Sign in to start adding books to your Booknook!</p>
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
                className="shadow-md drop-shadow-2xl rounded bg-gray-100 pl-2 w-full sm:w-80 md:w-96"
              />
            </label>
            <label className="p-6">
              <span className="p-2.5 text-customBrown font-slab font-bold text-lg text-shadow-custom">
                Password:
              </span>
              <input
                required
                name="password"
                type="password"
                placeholder="password"
                className="shadow-md drop-shadow-2xl rounded bg-gray-100 pl-2 w-full sm:w-80 md:w-96"
              />
            </label>
          </div>
        </div>
        <div>
          <div className="column-full d-flex justify-between">
            <button
              disabled={isLoading}
              className="m-9 p-1.5 w-24 font-sans bg-customGreen text-customBrown text-shadow-custom text-center shadow-md drop-shadow-2xl rounded">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
