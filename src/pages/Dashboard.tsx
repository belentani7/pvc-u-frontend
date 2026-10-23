import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, ShieldCheck, Trash2 } from 'lucide-react';
import { clearSessionEvents, getSessionEvents, type ValidationEvent } from '../lib/session-history';

const StatCard: React.FC<{ title: string; value: React.ReactNode; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="neo-glass p-6 glow-border">
    <div className="flex items-start justify-between mb-2">
      <h2 className="text-xs font-mono tracking-widest text-nclr-muted">{title}</h2>
      <span className="text-nclr-red" aria-hidden="true">{icon}</span>
    </div>
    <p className="text-2xl font-bold font-mono text-white">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<ValidationEvent[]>(() => getSessionEvents());
  const clearHistory = () => {
    clearSessionEvents();
    setEvents([]);
  };

  const noFlags = events.filter(event => event.valid).length;
  const toReview = events.length - noFlags;
  const signals = events.reduce((sum, event) => sum + event.errors + event.warnings, 0);

  return (
    <main className="max-w-6xl mx-auto p-6 pb-12">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-mono text-white">DASHBOARD PVC-U</h1>
          <p className="nclr-muted font-mono text-xs tracking-wider">
            SOLO ACTIVIDAD LOCAL DE ESTA SESIÓN · REGLAS HEURÍSTICAS, NO CERTIFICACIÓN
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button type="button" onClick={() => setEvents(getSessionEvents())} className="ncl-btn text-xs">
            ⟳ ACTUALIZAR SESIÓN
          </button>
          <button type="button" onClick={() => navigate('/validate')} className="ncl-btn ncl-btn--primary text-xs">
            NUEVA COMPROBACIÓN
          </button>
        </div>
      </div>

      <p className="text-xs text-yellow-200 mb-6" role="note">
        Las cifras son recuentos de las comprobaciones realizadas en este navegador desde que cargaste la página.
        No hay datos en tiempo real de un clúster ni se guardan los prompts, respuestas o datos personales.
        Al recargar la página se restablece el contador.
      </p>

      <section aria-label="Resultados de esta sesión" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="COMPROBACIONES" value={events.length} icon={<Activity className="w-5 h-5" />} />
        <StatCard title="SIN SEÑALES" value={noFlags} icon={<ShieldCheck className="w-5 h-5" />} />
        <StatCard title="REQUIEREN REVISIÓN" value={toReview} icon={<AlertTriangle className="w-5 h-5" />} />
        <StatCard title="SEÑALES TOTALES" value={signals} icon={<AlertTriangle className="w-5 h-5" />} />
      </section>

      <section className="neo-glass glow-border p-6" aria-label="Historial de metadatos de esta sesión">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="font-mono font-bold text-sm text-white">EVENTOS DE ESTA SESIÓN (SIN CONTENIDOS)</h2>
          <button type="button" className="text-xs text-nclr-red inline-flex items-center gap-2" onClick={clearHistory} disabled={!events.length}>
            <Trash2 className="w-4 h-4" aria-hidden="true" /> BORRAR HISTORIAL
          </button>
        </div>
        {!events.length ? (
          <p className="text-nclr-muted text-sm" role="status">Todavía no hay comprobaciones en esta sesión.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-nclr-muted text-[10px] uppercase font-mono">
                  <th scope="col" className="px-3 py-2">Dominio</th>
                  <th scope="col" className="px-3 py-2">Hora</th>
                  <th scope="col" className="px-3 py-2">Estado</th>
                  <th scope="col" className="px-3 py-2">Señales</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id} className="border-b border-white/5 text-sm font-mono">
                    <td className="px-3 py-3">{event.domain}</td>
                    <td className="px-3 py-3">{new Date(event.timestamp).toLocaleTimeString()}</td>
                    <td className="px-3 py-3">
                      <span className={event.valid ? 'text-green-400' : 'text-yellow-200'}>
                        {event.valid ? 'SIN SEÑALES' : 'REVISAR'}
                      </span>
                    </td>
                    <td className="px-3 py-3">{event.errors + event.warnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
