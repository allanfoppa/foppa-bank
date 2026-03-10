import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage = () => {
  const { handleLogin, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('admin@foppa.com');
  const [pass, setPass] = useState('123456');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleLogin(email, pass);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <div>Você já está logado!</div>;

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login Foppa Bank</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-2" placeholder="Email" />
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="border p-2 w-full mb-4" placeholder="Senha" />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
    </form>
  );
};
