import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Car, Image as ImageIcon, X, Wrench } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) { // Limit to ~500KB for localStorage safety
         setError("La imagen es demasiado grande (máx 500KB).");
         return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfilePicture('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    
    if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    setIsSubmitting(true);
    try {
      await register(email, name, password, profilePicture);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al registrarse. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border-t-4 border-red-600 transition-colors duration-300">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-slate-900 dark:bg-black rounded-full flex items-center justify-center border-4 border-slate-200 dark:border-slate-700">
             <Car className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white uppercase italic">
            Nuevo Cliente
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            ¿Ya tienes ficha?{' '}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 underline">
              Accede a tu cuenta
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
             {/* Profile Picture Upload */}
             <div className="flex flex-col items-center justify-center mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Foto de Perfil / Logo
                </label>
                <div className="relative group cursor-pointer">
                  {profilePicture ? (
                    <div className="relative">
                      <img 
                        src={profilePicture} 
                        alt="Preview" 
                        className="h-24 w-24 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-md"
                      />
                      <button 
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors shadow-sm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer group-hover:border-red-400">
                      <ImageIcon className="w-8 h-8 text-slate-400 dark:text-slate-500 group-hover:text-red-400" />
                      <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">Subir</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
             </div>

            <Input
              label="Nombre y Apellidos"
              type="text"
              placeholder="Ej. Carlos Sainz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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

            <Input
              label="Confirmar Contraseña"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Crear Cuenta
            </Button>
          </div>
          
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
            Al registrarte, aceptas nuestros <a href="#" className="underline">Términos de Servicio</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;