import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { KeyRound, Car } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password); 
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border-t-4 border-red-600 transition-colors duration-300">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-slate-900 dark:bg-black rounded-full flex items-center justify-center border-4 border-slate-200 dark:border-slate-700">
             <KeyRound className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white uppercase italic">
            Acceso Clientes
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Gestiona tus vehículos y citas. ¿Nuevo cliente?{' '}
            <Link to="/register" className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 underline">
              Crea tu ficha aquí
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="cliente@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
            >
              Acceder
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
              ¿Olvidaste tu llave de acceso?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;