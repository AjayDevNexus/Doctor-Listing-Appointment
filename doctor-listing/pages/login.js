import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from './_app';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      setUser({ role: response.data.role });
      localStorage.setItem('user', JSON.stringify({ role: response.data.role }));
      setMessage('Login successful!');
      router.push('/admin');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="container">
      <h1>Admin Login</h1>
      <Link href="/">
        <button className="back-button">Back to Doctor Listing</button>
      </Link>
      {message && <p className={message.includes('Error') ? 'message error' : 'message'}>{message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Hint: Use username "admin" and password "admin123"</p>
    </div>
  );
}