import React from 'react';

const Docs: React.FC = () => (
  <main className="max-w-4xl mx-auto p-6 pb-12">
    <h1 className="text-3xl font-bold mb-2 neon-text">Documentación PVC-U — demo local</h1>
    <p className="text-gray-400 mb-8">
      Esta versión es un panel React estático. Actualmente no contiene un servicio de validación por IA,
      endpoints externos, modelos conectados, defensa certificada ni garantía de cumplimiento normativo.
    </p>

    <section className="glass-card p-6 glow-border mb-6">
      <h2 className="font-semibold mb-3">Qué sí funciona</h2>
      <p className="text-gray-400 mb-3">
        La vista de comprobación ejecuta reglas deterministas en el propio navegador para identificar
        entradas vacías o demasiado largas, posibles instrucciones de elusión, patrones de correo,
        credenciales aparentes y promesas absolutas de exactitud. Pueden existir falsos positivos y
        falsos negativos: el resultado necesita revisión humana y no equivale a una auditoría de seguridad.
      </p>
      <p className="text-gray-400">
        El dashboard muestra únicamente recuentos generados durante la sesión local actual.
        Ni los prompts ni las respuestas se escriben en almacenamiento del navegador ni se envían a un servidor.
        Al recargar la página, el historial volátil se pierde.
      </p>
    </section>

    <section className="glass-card p-6 glow-border mb-6">
      <h2 className="font-semibold mb-3">Usar reglas locales desde TypeScript</h2>
      <pre className="bg-black/30 p-4 rounded-lg font-mono text-sm overflow-x-auto">{`import { validateLocally } from './lib/local-validation';

const result = validateLocally('general', 'Mi prompt', 'Respuesta de ejemplo');
if (!result.valid) {
  console.log(result.errors, result.warnings);
}
// Este resultado NO acredita exactitud, seguridad ni cumplimiento legal.
`}</pre>
    </section>

    <section className="glass-card p-6 glow-border">
      <h2 className="font-semibold mb-3">Posibles integraciones futuras — NO disponibles</h2>
      <p className="text-gray-400">
        Integración autenticada con un motor remoto, perfiles de políticas versionadas, trazabilidad
        de evidencias con autorización, observabilidad sin PII y revisión normativa específica. Los antiguos
        ejemplos de `/v1/validate`, `/v1/auto-heal` y `/metrics` no eran endpoints implementados
        en este repositorio y se han retirado para evitar información engañosa.
      </p>
    </section>
  </main>
);

export default Docs;
