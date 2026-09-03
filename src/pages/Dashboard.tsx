import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

// ========== NEO-NEOGLASS COMPONENTS ==========

const NclSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-nclr-red-dim border-b border-nclr-red/15 pb-2 mb-4 uppercase">
    ◆ {children}
  </div>
);

const NclGem: React.FC<{ icon: string; label: string; sub?: string }> = ({ icon, label, sub }) => (
  <div className="ncl-gem flex items-center justify-center cursor-pointer hover:scale-110 transition-all" title={sub || ''}>
    <span className="text-lg">{icon}</span>
    <span className="text-[8px] font-mono tracking-wider text-red-dim">{label}</span>
  </div>
);

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, color }) => (
  <div className="neo-glass p-6 glow-border group hover:-translate-y-0.5 transition-all duration-300">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xs font-mono tracking-widest text-nclr-muted">{title}</h3>
      <div className={`transition-colors ${color || 'text-nclr-red'} group-hover:text-white`}>{icon}</div>
    </div>
    <p className="text-2xl font-bold font-mono text-white" style={{textShadow: '0 0 10px rgba(255,7,58,0.3)'}}>{value}</p>
    {trend && <p className="text-xs text-green-400 mt-1 font-mono">{trend}</p>}
  </div>
);

interface ValidationEvent {
  id: string;
  domain: string;
  timestamp: string;
  valid: boolean;
  errors: number;
  score: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalValidations: 1284,
    validationRate: 97.3,
    avgScore: 0.89,
    activeAlerts: 3,
  });
  
  const [events, setEvents] = useState<ValidationEvent[]>([
    { id: 'abc123', domain: 'ecommerce', timestamp: '2026-09-03 14:32', valid: true, errors: 0, score: 0.95 },
    { id: 'def456', domain: 'salud', timestamp: '2026-09-03 14:30', valid: false, errors: 2, score: 0.45 },
    { id: 'ghi789', domain: 'finanzas', timestamp: '2026-09-03 14:28', valid: true, errors: 0, score: 0.92 },
    { id: 'jkl012', domain: 'chatbot', timestamp: '2026-09-03 14:25', valid: false, errors: 1, score: 0.72 },
    { id: 'mno345', domain: 'web_design', timestamp: '2026-09-03 14:22', valid: true, errors: 0, score: 0.88 },
  ]);
  
  // In production, this would fetch real metrics from /api/v1/stats
  // useEffect(() => {
  //   fetch('/api/v1/stats')
  //     .then(r => r.json())
  //     .then(data => setMetrics(data));
  // }, []);
  
  return (
    <div className="max-w-6xl mx-auto p-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-mono text-white" style={{textShadow: '0 0 16px rgba(255,7,58,0.4)'}}>DASHBOARD PVC-U</h1>
          <p className="nclr-muted font-mono text-xs tracking-wider">ESTADO DE VALIDACIÓN CONTINUA EN TIEMPO REAL · NOIACORE LAB</p>
        </div>
        <button className="ncl-btn ncl-btn--primary text-xs">⟳ REFRESH DATA</button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard title="TOTAL VALIDACIONES" value={metrics.totalValidations.toLocaleString()} icon={<Activity className="w-5 h-5" />} trend="+12% vs ayer" color="text-nclr-red" />
        <MetricCard title="TASA VALIDACIÓN" value={`${metrics.validationRate}%`} icon={<ShieldCheck className="w-5 h-5" />} trend="+2.1% semanal" />
        <MetricCard title="SCORE PROMEDIO" value={metrics.avgScore.toFixed(2)} icon={<TrendingUp className="w-5 h-5" />} color="text-green-400" />
        <MetricCard title="ALERTAS ACTIVAS" value={metrics.activeAlerts} icon={<AlertTriangle className="w-5 h-5" />} color="text-nclr-red" />
      </div>

      {/* Score Bars + Recent Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Validation Scores */}
        <div className="lg:col-span-2 neo-glass glow-border p-6">
          <NclSectionTitle>EVENTOS RECIENTES</NclSectionTitle>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-nclr-muted text-[10px] tracking-widest font-mono uppercase">
                <th className="py-2 px-3">Dominio</th>
                <th className="py-2 px-3">Hora</th>
                <th className="py-2 px-3">Estado</th>
                <th className="py-2 px-3">Erros</th>
                <th className="py-2 px-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3 px-3 capitalize font-mono text-sm group-hover:text-white transition-colors">{event.domain}</td>
                  <td className="py-3 px-3 text-nclr-muted font-mono text-xs">{event.timestamp.split(' ')[1]}</td>
                  <td className="py-3 px-3">
                    {event.valid ? (
                      <span className="text-green-400 text-xs font-mono bg-green-400/10 px-2 py-0.5 rounded">VÁLIDO</span>
                    ) : (
                      <span className="text-nclr-red text-xs font-mono bg-nclr-red/10 px-2 py-0.5 rounded">FALLIDO</span>
                    )}
                  </td>
                  <td className={`py-3 px-3 font-mono text-sm ${event.errors > 0 ? 'text-nclr-red' : 'text-nclr-muted'}`}>
                    {event.errors}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-white/5 rounded h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded ${event.score > 0.8 ? 'bg-green-400' : event.score > 0.6 ? 'yellow-400' : 'nclr-red'}`}
                          style={{width: `${event.score * 100}%`, background: event.score > 0.8 ? '#4ade80' : event.score > 0.6 ? '#fbbf24' : '#ff073a', boxShadow: `0 0 6px ${event.score > 0.8 ? 'rgba(74,222,128,0.4)' : event.score > 0.6 ? 'rgba(251,191,36,0.4)' : 'rgba(255,7,58,0.4)'}`}}
                        />
                      </div>
                      <span className="font-mono text-xs">{(event.score * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side Panel */}
        <div className="neo-glass glow-border p-6">
          <NclSectionTitle>CLUSTER STATUS</NclSectionTitle>
          
          <div className="space-y-4 mb-6">
            {['ECOMMERCE', 'SALUD', 'FINANZAS', 'CHATBOT'].map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-mono text-xs nclr-muted">{d}</span>
                <span className={`pulse-dot w-2 h-2 rounded-full ${i === 1 || i === 3 ? '' : 'animate-none opacity-40'}`} style={{background: i === 1 || i === 3 ? '#ff073a' : '#4ade80'}}></span>
              </div>
            ))}
          </div>

          <NclSectionTitle>NODES</NclSectionTitle>
          <div className="flex gap-2 flex-wrap">
            {Array.from({length: 6}).map((_, i) => (
              <NclGem key={i} icon={['⬡','◉','⌬','▣','⏣','△'][i]} label={`N${i+1}`} sub={`Node ${['Alpha','Beta','Gamma','Delta','Epsilon','Zeta'][i]}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
