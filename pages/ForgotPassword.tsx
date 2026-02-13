import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { KeyRound, ArrowLeft, MailCheck, Wrench } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err) {
      setError('Ocurrió un error al intentar enviar el correo. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-slate-800">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
             {isSuccess ? (
               <MailCheck className="h-8 w-8 text-red-600" />
             ) : (
               <Wrench className="h-8 w-8 text-red-600" />
             )}
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 uppercase italic">
            {isSuccess ? '¡Correo enviado!' : 'Recuperar Acceso'}
          </h2>
          
          <p className="mt-2 text-sm text-slate-600">
            {isSuccess 
              ? `Hemos enviado las instrucciones a ${email}`
              : 'Ingresa tu correo y te enviaremos una llave maestra temporal.'}
          </p>
        </div>
        
        {!isSuccess ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="cliente@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                fullWidth
                isLoading={isSubmitting}
                className="bg-slate-900 hover:bg-slate-800"
              >
                Enviar instrucciones
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <Link to="/login" className="flex items-center justify-center text-sm font-medium text-slate-600 hover:text-red-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Taller
              </Link>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative text-sm text-center">
              Revisa tu bandeja de entrada (y la carpeta de spam) para continuar.
            </div>
            
            <Link to="/login">
              <Button fullWidth variant="primary">
                Volver a Iniciar Sesión
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;