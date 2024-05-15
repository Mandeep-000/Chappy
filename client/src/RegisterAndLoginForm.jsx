import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "./UserContext.jsx";
import Logo from "./Logo.jsx";

export default function RegisterAndLoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === 'register' ? '/auth/register' : '/auth/login';
    const {data} = await axios.post(url, {username,password});
    setLoggedInUsername(username);
    setId(data.id);
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center justify-center">
      <div className="bg-blue-200 flex w-max h-max rounded-md">
        <form className="w-64 h-96 mx-16 my-8" onSubmit={handleSubmit}>
          <Logo justify="justify-center" text="text-2xl" size="size-9" bottom="mb-3"/>
          <h3 className="text-xl font-semibold flex justify-center capitalize mb-10 underline underline-offset-8 decoration-blue-800">{isLoginOrRegister}</h3>

          {/* <label className="text-blue-800">Username</label> */}
          <input value={username}
                onChange={ev => setUsername(ev.target.value)}
                type="text" placeholder="username"
                className="block w-full rounded-full p-2 pl-6 mb-2 border" />

          {/* <label className="text-blue-800">Password</label> */}
          <input value={password}
                onChange={ev => setPassword(ev.target.value)}
                type="password"
                placeholder="password"
                className="block w-full rounded-full p-2 pl-6 mb-2 border" />
          <button className="bg-blue-500 text-white block w-48 rounded-lg mt-8 p-2 mx-auto">
            {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
          </button>
          <div className="text-center mt-2">
            {isLoginOrRegister === 'register' && (
              <div>
                Already a member?
                <button className="ml-1 text-blue-800" onClick={() => setIsLoginOrRegister('login')}>
                  Login here
                </button>
              </div>
            )}
            {isLoginOrRegister === 'login' && (
              <div>
                Dont have an account?
                <button className="ml-1 text-blue-800" onClick={() => setIsLoginOrRegister('register')}>
                  Register
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}