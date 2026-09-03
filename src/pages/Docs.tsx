import React from 'react';

const Docs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 neon-text">Documentación API</h1>
      <p className="text-gray-400 mb-8">Endpoints disponibles para integración de PVC-U</p>
      
      {/* Endpoint Cards */}
      <div className="space-y-6">
        <div className="glass-card p-6 glow-border">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-mono">POST</span>
            <code className="text-[#ff073a] font-mono">/v1/validate</code>
          </div>
          <h3 className="font-semibold mb-2">Validar Respuesta IA</h3>
          <p className="text-gray-400 mb-4">Envía un prompt y respuesta para validar contra las esferas PVC-U completas.</p>
          
          <div className="bg-[rgba(0,0,0,0.3)] p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`{
  "domain": "salud",
  "prompt": "¿Cuál es el tratamiento?",
  "response": "El paciente debe tomar...",
  "profile": "fhir+hipaa"
}`}</pre>
          </div>
        </div>
        
        <div className="glass-card p-6 glow-border">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-mono">POST</span>
            <code className="text-[#ff073a] font-mono">/v1/auto-heal</code>
          </div>
          <h3 className="font-semibold mb-2">Auto-Corrección Iterativa</h3>
          <p className="text-gray-400 mb-4">Valida → detecta fallo → regenera con LLM → revalida automáticamente.</p>
          
          <div className="bg-[rgba(0,0,0,0.3)] p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`{
  "task": "Generar informe médico HIPAA-compliant",
  "context": {"patient_id": "X"}
}`}</pre>
          </div>
        </div>
        
        <div className="glass-card p-6 glow-border">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono">GET</span>
            <code className="text-[#ff073a] font-mono">/metrics</code>
          </div>
          <h3 className="font-semibold mb-2">Prometheus Metrics</h3>
          <p className="text-gray-400 mb-4">Exponen métricas para scraping por Prometheus/Grafana.</p>
        </div>
      </div>
      
      {/* Quick Start */}
      <div className="mt-12 glass-card p-6 glow-border">
        <h2 className="text-xl font-bold mb-4">Quick Start Python</h2>
        <div className="bg-[rgba(0,0,0,0.3)] p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`from pvc_u import PVCUOrchestrator

pvc = PVCUOrchestrator()
result = await pvc.validate(
    domain="salud",
    payload={"prompt": "...", "response": "..."}
)

if not result.is_valid:
    print(f"FALLO! {len(result.errors)} errores")`}</pre>
        </div>
      </div>
    </div>
  );
};

export default Docs;
