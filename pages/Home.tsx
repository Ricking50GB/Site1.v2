import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, ShieldCheck, CarFront, Gauge } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full bg-slate-900 dark:bg-black text-white relative overflow-hidden transition-colors duration-300">
        {/* Abstract tire track pattern background could go here */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center relative z-10">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl uppercase italic">
            <span className="block">Tu vehículo merece</span>
            <span className="block text-red-600">Servicio de Primera</span>
          </h1>
          <p className="mt-4 max-w-md mx-auto text-base text-slate-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Gestiona el mantenimiento de tu coche, agenda citas y consulta el historial de reparaciones en tiempo real. Expertos en mecánica integral.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="w-full sm:w-auto px-8 py-3 text-base md:py-4 md:text-lg md:px-10 uppercase tracking-wider font-bold">
                  Ir a mi Garaje
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button className="w-full sm:w-auto px-8 py-3 text-base md:py-4 md:text-lg md:px-10 uppercase tracking-wider font-bold">
                    Agendar Cita
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-base md:py-4 md:text-lg md:px-10 border-white text-white hover:bg-white hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors">
                    Soy Cliente
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 dark:bg-slate-950 -mt-10 rounded-t-3xl relative z-20 transition-colors duration-300">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Nuestros Servicios</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Calidad certificada para mantenerte en movimiento</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border-b-4 border-red-600 hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center mb-6">
              <Gauge className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Diagnóstico Computarizado</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Escaneo completo de sensores y sistemas electrónicos para detectar fallas con precisión milimétrica.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border-b-4 border-red-600 hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg flex items-center justify-center mb-6">
              <Wrench className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Mecánica General</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Desde cambios de aceite hasta reparaciones complejas de motor y transmisión. Garantía en mano de obra.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border-b-4 border-red-600 hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Mantenimiento Preventivo</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Evita reparaciones costosas con nuestros planes de mantenimiento programado según fabricante.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action strip */}
      <div className="w-full bg-slate-900 dark:bg-black text-white py-12 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
              <div>
                  <h3 className="text-2xl font-bold italic uppercase">¿Ruido extraño en el motor?</h3>
                  <p className="text-slate-400">No esperes a que sea tarde.</p>
              </div>
              <div className="mt-4 md:mt-0">
                  <Link to="/register">
                    <Button variant="primary" className="gap-2">
                        <CarFront className="w-4 h-4" />
                        Revisar mi Coche
                    </Button>
                  </Link>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;