import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { Car, Gauge, User, CalendarClock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Section */}
      <div className="bg-slate-900 dark:bg-black rounded-2xl shadow-lg border border-slate-700 p-8 mb-8 overflow-hidden relative text-white transition-colors duration-300">
         <div className="absolute top-0 right-0 p-4 opacity-20">
            <Gauge className="w-40 h-40 text-red-600" />
         </div>
        <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 uppercase italic">Mi Garaje Virtual</h1>
            <p className="text-lg text-slate-300 italic">
              ¡Hola, Bienvenido {user?.name}! 
            </p>
        </div>
      </div>

      {/* Stats/Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Vehículos */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border-t-4 border-red-600 transition-colors duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Car className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white uppercase">Mis Vehículos</h3>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Estado actual de tu flota registrada.
          </p>
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
            <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Toyota Corolla</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">2018 • En Taller</p>
            </div>
            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded font-medium">Revisión</span>
          </div>
        </div>

        {/* Card 2: Perfil Conductor */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border-t-4 border-slate-800 dark:border-slate-600 transition-colors duration-300">
           <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <User className="w-6 h-6 text-slate-800 dark:text-slate-200" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white uppercase">Ficha Conductor</h3>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            {user?.profilePicture ? (
                <img 
                    src={user.profilePicture} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                />
            ) : (
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <User className="w-8 h-8 text-slate-400" />
                </div>
            )}
            <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">Cliente VIP</span>
            </div>
          </div>
        </div>

        {/* Card 3: Próxima Cita */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border-t-4 border-red-600 transition-colors duration-300">
           <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <CalendarClock className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white uppercase">Próxima Cita</h3>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Mantenimiento programado.
          </p>
          
          <div className="space-y-3">
             <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Servicio:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Cambio Aceite</span>
             </div>
             <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Fecha:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">12 Oct, 10:00 AM</span>
             </div>
          </div>
          
          <Button variant="ghost" className="w-full mt-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700">
             Reprogramar &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;