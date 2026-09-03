import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, AlertTriangle } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center">
      {/* Hero Title */}
      <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text">
        Protocolo de Validación
      </h1>
      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-300">
        Continua Universal
      </h2>
      <p className="text-xl max-w-2xl mb-12 text-gray-400">
        Garantiza que la IA no alucina, no filtra datos y cumple normativa regulatoria
      </p>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
        <div 
          className="glass-card p-6 glow-border float cursor-pointer"
          onClick={() => navigate('/validate')}
        >
          <Shield className="w-12 h-12 mx-auto mb-4 neon-text" />
          <h3 className="text-lg font-semibold mb-2">Validación Continua</h3>
          <p className="text-gray-400">
            Esferas 0-4A verificando cada respuesta en tiempo real
          </p>
        </div>
        
        <div className="glass-card p-6 glow-border float cursor-pointer" style={{ animationDelay: '0.5s' }}>
          <Zap className="w-12 h-12 mx-auto mb-4 neon-text" />
          <h3 className="text-lg font-semibold mb-2">Auto-Corrección</h3>
          <p className="text-gray-400">
            Loop iterativo corrige automáticamente fallos detectados
          </p>
        </div>
        
        <div className="glass-card p-6 glow-border float cursor-pointer" style={{ animationDelay: '1s' }}>
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 neon-text" />
          <h3 className="text-lg font-semibold mb-2">Compliance Enterprise</h3>
          <p className="text-gray-400">
            HIPAA, PCI-DSS, GDPR — perfiles por dominio regulatorio
          </p>
        </div>
      </div>
      
      {/* CTA Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/validate')}
          className="bg-[#ff073a] hover:bg-[#e00635] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
        >
          Validar Respuesta
        </button>
        <button
          onClick={() => navigate('/docs')}
          className="glass-card px-8 py-3 hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200"
        >
          Ver Documentación
        </button>
      </div>
    </div>
  );
};

export default Hero;
