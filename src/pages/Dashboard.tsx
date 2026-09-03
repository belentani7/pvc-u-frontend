import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, color }) => (
  <div className="glass-card p-6 glow-border">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <div className={color || 'text-[#ff073a]'}>{icon}</div>
    </div>
    <p className="text-2xl font-bold">{value}</p>
    {trend && <p className="text-xs text-green-400 mt-1">{trend}</p>}
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 neon-text">Dashboard PVC-U</h1>
      <p className="text-gray-400 mb-8">Estado de validación continua en tiempo real</p>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Validaciones"
          value={metrics.totalValidations.toLocaleString()}
          icon={<Activity className="w-5 h-5" />}
          trend="+12% vs ayer"
        />
        <MetricCard
          title="Tasa Validación"
          value={`${metrics.validationRate}%`}
          icon={<ShieldCheck className="w-5 h-5" />}
          trend="+2.1% vs semana anterior"
        />
        <MetricCard
          title="Score Promedio"
          value={metrics.avgScore.toFixed(2)}
          icon={<TrendingUp className="w-5 h-5" />}
          color="text-green-400"
        />
        <MetricCard
          title="Alertas Activas"
          value={metrics.activeAlerts}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="text-red-400"
        />
      </div>
      
      {/* Recent Events Table */}
      <div className="glass-card p-6 glow-border">
        <h2 className="text-lg font-semibold mb-4">Eventos Recientes</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.1)] text-gray-400">
              <th className="py-2 px-3">Dominio</th>
              <th className="py-2 px-3">Hora</th>
              <th className="py-2 px-3">Estado</th>
              <th className="py-2 px-3">Errores</th>
              <th className="py-2 px-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)]">
                <td className="py-3 px-3 capitalize">{event.domain}</td>
                <td className="py-3 px-3 text-gray-400">{event.timestamp.split(' ')[1]}</td>
                <td className="py-3 px-3">
                  {event.valid ? (
                    <span className="text-green-400 text-sm">✅ Válido</span>
                  ) : (
                    <span className="text-red-400 text-sm">❌ Fallido</span>
                  )}
                </td>
                <td className={`py-3 px-3 ${event.errors > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                  {event.errors}
                </td>
                <td className="py-3 px-3">{(event.score * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
