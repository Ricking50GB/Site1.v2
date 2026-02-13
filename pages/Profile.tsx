import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserCog, Camera, Save, Lock, X } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  
  // General Info State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState<string>('');
  
  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfilePicture(user.profilePicture || '');
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) { // Limit to ~500KB
         setMessage({ type: 'error', text: "La imagen es demasiado grande (máx 500KB)." });
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfilePicture('');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      // Validate Password Change if attempted
      if (newPassword || confirmNewPassword) {
         if (newPassword !== confirmNewPassword) {
             throw new Error("Las nuevas contraseñas no coinciden.");
         }
         if (newPassword.length < 6) {
             throw new Error("La nueva contraseña debe tener al menos 6 caracteres.");
         }
         if (!currentPassword) {
             throw new Error("Debes ingresar tu contraseña actual para cambiarla.");
         }
      }

      await updateProfile({
        name,
        email,
        profilePicture,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined
      });

      setMessage({ type: 'success', text: "Perfil actualizado correctamente." });
      
      // Clear password fields on success
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || "Error al actualizar el perfil." });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <UserCog className="w-8 h-8 text-red-600" />
          Configuración de Usuario
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Administra tu información personal y seguridad de tu cuenta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Picture */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 text-center">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Foto de Perfil</h3>
            
            <div className="relative inline-block mb-6">
              {profilePicture ? (
                <div className="relative">
                  <img 
                    src={profilePicture} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-md mx-auto"
                  />
                  <button 
                    onClick={removeImage}
                    className="absolute top-0 right-0 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-sm"
                    title="Eliminar foto"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto border-4 border-dashed border-slate-300 dark:border-slate-700">
                   <UserCog className="w-12 h-12 text-slate-400" />
                </div>
              )}
            </div>

            <div className="relative">
                <input 
                  type="file" 
                  id="profile-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label 
                  htmlFor="profile-upload"
                  className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors w-full"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Cambiar Foto
                </label>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Recomendado: 500x500px. Máx 500KB.
            </p>
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="lg:col-span-2">
           <form onSubmit={handleUpdateProfile} className="space-y-6">
              
              {/* General Info Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                  Información Básica
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <Input 
                    label="Nombre Completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                  />
                  
                  <Input 
                    label="Correo Electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
                 <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                   <Lock className="w-5 h-5 text-slate-500" />
                   Seguridad
                 </h3>
                 
                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mb-6 text-sm text-slate-600 dark:text-slate-400">
                    Solo llena estos campos si deseas cambiar tu contraseña.
                 </div>

                 <div className="space-y-4">
                    <Input 
                      label="Contraseña Actual"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                          label="Nueva Contraseña"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                        <Input 
                          label="Confirmar Nueva"
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                    </div>
                 </div>
              </div>

              {/* Feedback Message */}
              {message && (
                <div className={`p-4 rounded-lg text-sm border ${
                  message.type === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button 
                  type="submit" 
                  isLoading={isLoading} 
                  className="px-8"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
              </div>

           </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;