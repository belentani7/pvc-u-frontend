# PROJECT MASTER PROMPT — pvc-u-frontend

## Identidad
Este repositorio es la **interfaz React/TypeScript PVC-U**, con diseño Liquid Glass + Neon Red del universo Belentani. Es actualmente un sitio estático con demostración local de reglas explicables para prompts/respuestas, no el backend completo de un sistema de seguridad de IA. Preservar identidad, páginas y componentes; no mezclar el motor fiscal RH Fiscal Ultra (otro producto).

## Fuente de verdad
- `src/pages/Validation.tsx`: experiencia de revisión.
- `src/lib/local-validation.ts`: motor determinista local y contratos de resultado.
- `src/lib/session-history.ts`: recuentos volátiles sin datos del prompt/respuesta.
- `src/pages/Dashboard.tsx`: medidas reales de la sesión, no telemetría inventada.
- `src/pages/Docs.tsx`, `Hero.tsx`: capacidades reales y límites.
- `package.json`, `vite.config.ts`, `tests/local-validation.test.cjs`: construcción y pruebas.

## Diagnóstico de origen 2026-10-23
1. El formulario usaba `setTimeout` y resultados inventados basados en `prompt.includes('ignora')` o `response.includes('juan@')`, con scores falsos del 95%; no validaba nada sustancial.
2. El dashboard mostraba 1284 validaciones, porcentajes y eventos de fechas antiguas sin backend ni datos reales.
3. Hero y documentación decían que se garantizaba que IA no alucinaba, que hacía auto-healing/HIPAA/PCI-DSS/GDPR, y publicitaban endpoints inexistentes.
4. CI usaba `--if-present` y un workflow build sin compilación funcional; los tests eran smoke triviales.

## Visión de máximo potencial útil
Un panel claro, local y honesto con validaciones explicables, gestión transparente de privacidad, accesibilidad y componentes consistentes. Evolución a sistema con políticas versionadas por dominio, revisión humana, firma/autenticación de evidencias, verificación robusta de API, monitoreo real con consentimiento y límites regulatorios explícitos. Ninguna certificación o garantía de ausencia de alucinaciones sin verificaciones sustantivas y profesionales.

## Recursos adecuados
- React 19 y TypeScript estrictos del proyecto: UI accesible y segura.
- `typescript` + `node:test`: pruebas del motor de reglas sin contratar servicios.
- Vite build + `npm ci`: artefacto reproducible y tipado.
- Reglas de privacidad: mantener datos de entrada solo en RAM; no guardar ni transmitir prompts/respuestas.
- Si se añade backend en el futuro: API autenticada, permisos por tenant, validación de esquemas, rate limits, audit logs sin PII y revisión de cumplimiento por jurisdicción. Nunca simular capacidades que no existan.

## Fases ejecutables
1. **Este PR**: motor local verdadero y pruebas, métricas de sesión en lugar de indicadores ficticios, documentación honesta, CI que construya/pruebe.
2. **UX**: contrastes WCAG, errores de red, formularios accesibles, exportación de solo resumen bajo consentimiento, traducción ES/PT/EN.
3. **Políticas**: reglas parametrizables, ejemplos de falsos positivos/negativos y batería adversarial abierta; revisión de seguridad independiente.
4. **Backend**: únicamente cuando exista demanda real, contratos, identidad/permiso y entorno de pruebas. No marcarlo online sin operación confirmada.

## Prompt operativo reutilizable
Lee el README, fuentes actuales, PRs abiertos y este documento. Por cada incremento comprueba un problema real, estudia recursos aptos, cambia código funcional en rama, añade regresiones y ejecuta `npm ci` y `npm run verify`. Relee archivos de GitHub para confirmar que commits/diffs son los esperados. Comprueba qué pasos de GitHub Actions se ejecutaron realmente, no solo su conclusión. En caso de bloqueo, conserva PR draft y anota pendientes; no fusionar ni publicar. Avanza al siguiente repositorio únicamente con estado explícito y evidencia. No alterar otros productos, no eliminar repos archivados sin copia completa verificada en Drive, no exponer datos privados, no inventar eficacia de IA ni certificaciones.
