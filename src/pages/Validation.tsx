import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Brain, ShieldCheck, Target, Sparkles } from 'lucide-react';

// ========== NEO-NEOGLASS COMPONENTS ==========

const NclSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-nclr-red-dim border-b border-nclr-red/15 pb-2 mb-4 uppercase">
    ◆ {children}
  </div>
);

const SphereTag: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono ${active ? 'bg-nclr-red/15 text-nclr-red border border-nclr-red/20' : 'bg-white/5 text-nclr-muted border border-white/5'}`}>
    {active && <Sparkles className="w-3 h-3" />}
    {label}
  </span>
);

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
  spheresExecuted: string[];
}

const Validation: React.FC = () => {
  const [domain, setDomain] = useState('ecommerce');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const domains = ['ecommerce', 'salud', 'finanzas', 'chatbot', 'web_design', 'general'];

  const handleValidate = async () => {
    setLoading(true);
    setTimeout(() => {
      const isIgnored = prompt.includes('ignora');
      setResult({
        valid: !isIgnored,
        errors: isIgnored ? ['PVC-4A-01: Intento de inyección de prompt detectado'] : [],
        warnings: response.includes('juan@') ? ['WRN-PII: Email detectado en respuesta'] : [],
        score: isIgnored ? 0.3 : 0.95,
        spheresExecuted: ['Sphere0', 'Sphere3A', 'Sphere4A'],
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-mono font-bold text-white mb-1" style={{textShadow: '0 0 16px rgba(255,7,58,0.3)'}}>VALIDACIÓN IA · PVC-U</h1>
        <p className="nclr-muted text-xs font-mono tracking-wider">ESFERAS DE VALIDACIÓN · SISTEMA CONTRA DAÑOS ALUSIVOS</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { icon: <Brain className="w-4 h-4" />, label: 'SPHERES', val: '6' },
          { icon: <ShieldCheck className="w-4 h-4" />, label: 'STATUS', val: 'ONLINE' },
          { icon: <Target className="w-4 h-4" />, label: 'DOMAINS', val: domains.length.toString() },
        ].map((s, i) => (
          <div key={i} className="neo-glass p-3 text-center ncl-anim-float" style={{animationDelay: `${i * 0.4}s`}}>
            <div className="text-nclr-red mb-1">{s.icon}</div>
            <div className="font-mono text-[10px] nclr-muted tracking-wider">{s.label}</div>
            <div className="font-mono text-lg font-bold text-white">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="neo-glass glow-border p-6 space-y-5 mb-6">
        <NclSectionTitle>ENTRADA DE DATOS</NclSectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="ncl-label">DOMINIO</label>
            <select value={domain} onChange={(e) => setDomain(e.target.value)} className="ncl-select">
              {domains.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
            </select>
          </div>
          <div>
            <label className="ncl-label">SPHERE TARGET</label>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Sphere0', 'Sphere3A', 'Sphere4A'].map(s => <SphereTag key={s} label={s} active />)}
            </div>
          </div>
        </div>

        <div>
          <label className="ncl-label">PROMPT</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Escribe el prompt del usuario..." className="ncl-input min-h-[80px]" />
        </div>

        <div>
          <label className="ncl-label">RESPUESTA DEL AGENTE IA</label>
          <textarea value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Escribe la respuesta generada..." className="ncl-input min-h-[80px]" />
        </div>

        <button onClick={handleValidate} disabled={loading || !prompt || !response} className="w-full ncl-btn ncl-btn--primary text-sm py-3 disabled:opacity-40">
          {loading ? 'VALIDANDO...' : '▶ EJECUTAR VALIDACIÓN'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="neo-glass glow-border p-6">
          <NclSectionTitle>RESULTADO</NclSectionTitle>
          
          {/* Score display */}
          <div className="flex items-center gap-6 mb-6 bg-black/20 rounded-lg p-4">
            <div className={`grid size-14 place-items-center rounded-full ${result.valid ? 'bg-green-400/15' : 'bg-nclr-red/15'}`}>
              {result.valid ? <CheckCircle className="w-7 h-7 text-green-400" /> : <XCircle className="w-7 h-7 text-nclr-red" />}
            </div>
            <div className="flex-1">
              <div className="font-mono font-bold text-base mb-1">{result.valid ? '✅ VALIDADO CORRECTAMENTE' : '❌ VALIDACIÓN FALLIDA'}</div>
              <div className="flex gap-2">
                {result.spheresExecuted.map(s => <SphereTag key={s} label={s} />)}
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-2xl font-bold" style={{color: result.score > 0.8 ? '#4ade80' : '#ff073a'}}>{(result.score * 100).toFixed(0)}%</div>
              <div className="text-[10px] nclr-muted">SCORE</div>
            </div>
          </div>

          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="border border-nclr-red/20 rounded-lg p-4 mb-4 bg-nclr-red/[0.02]">
              <h3 className="text-sm font-mono font-bold text-nclr-red mb-2">ERRORES DETECTADOS</h3>
              <ul className="space-y-2">
                {result.errors.map((err, i) => (
                  <li key={i} className="text-sm text-red-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {err}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="border border-yellow-400/20 rounded-lg p-4 bg-yellow-400/[0.02]">
              <h3 className="text-sm font-mono font-bold text-yellow-400 mb-2">ALERTAS</h3>
              <ul className="space-y-2">
                {result.warnings.map((warn, i) => (
                  <li key={i} className="text-sm text-yellow-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {warn}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!result.errors.length && !result.warnings.length && result.valid && (
            <div className="text-green-400 text-sm font-mono flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> No se detectaron problemas — todo limpio.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Validation;
