import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const Validation: React.FC = () => {
  const [domain, setDomain] = useState('ecommerce');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const domains = ['ecommerce', 'salud', 'finanzas', 'chatbot', 'web_design', 'general'];
  
  const handleValidate = async () => {
    setLoading(true);
    
    // Simulate API call to PVC-U backend
    setTimeout(() => {
      // Mock response — replace with actual fetch('/api/v1/validate') when backend is running
      const mockResult = {
        valid: prompt.includes('ignora') ? false : true,
        errors: prompt.includes('ignora') ? ['PVC-4A-01: Intento de inyección de prompt detectado'] : [],
        warnings: prompt.includes('juan@') ? ['WRN-PII: Email detectado en respuesta'] : [],
        score: prompt.includes('ignora') ? 0.3 : 0.95,
        spheres_executed: ['Sphere0', 'Sphere3A', 'Sphere4A'],
      };
      
      setResult(mockResult);
      setLoading(false);
    }, 800);
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 neon-text">Validar Respuesta IA</h1>
      <p className="text-gray-400 mb-8">Envía un prompt y respuesta para validar contra las esferas PVC-U</p>
      
      {/* Form */}
      <div className="glass-card p-6 glow-border space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Dominio</label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full glass-card px-4 py-2 bg-transparent border rounded-lg"
          >
            {domains.map(d => (
              <option key={d} value={d} className="bg-[#0a0a0f]">{d.toUpperCase()}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="¿Cuál es el tratamiento del paciente?"
            className="w-full glass-card px-4 py-2 bg-transparent border rounded-lg min-h-[100px]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Respuesta del Agente IA</label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="El paciente debe tomar 5mg de..."
            className="w-full glass-card px-4 py-2 bg-transparent border rounded-lg min-h-[100px]"
          />
        </div>
        
        <button
          onClick={handleValidate}
          disabled={loading || !prompt || !response}
          className="w-full bg-[#ff073a] hover:bg-[#e00635] disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
        >
          {loading ? 'Validando...' : 'Ejecutar Validación'}
        </button>
      </div>
      
      {/* Results */}
      {result && (
        <div className="mt-8 glass-card p-6 glow-border">
          <div className="flex items-center gap-3 mb-4">
            {result.valid ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500" />
            )}
            <h2 className="text-xl font-semibold">
              {result.valid ? '✅ Validado Correctamente' : '❌ Validación Fallida'}
            </h2>
            <span className="ml-auto text-sm text-gray-400">Score: {(result.score * 100).toFixed(0)}%</span>
          </div>
          
          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-red-400 mb-2">Errores:</h3>
              <ul className="space-y-1">
                {result.errors.map((err: string, i: number) => (
                  <li key={i} className="text-sm text-red-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {err}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-yellow-400 mb-2">Warnings:</h3>
              <ul className="space-y-1">
                {result.warnings.map((warn: string, i: number) => (
                  <li key={i} className="text-sm text-yellow-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {warn}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {!result.errors.length && !result.warnings.length && result.valid && (
            <p className="text-green-400 text-sm">No se detectaron problemas — todo limpio.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Validation;
