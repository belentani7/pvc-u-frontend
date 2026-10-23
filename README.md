# PVC-U Frontend

Dashboard PVC-U Liquid Glass + Neon Red con comprobación heurística **local**. No utiliza un servicio de IA conectado ni emite certificaciones.

## Qué es

Un panel de control construido sobre el sistema visual del universo Belentani: superficies de
cristal, acento rojo neón y tipografía técnica.

## Stack

- **Vite 7** — build
- **React 19** — interfaz
- **TypeScript 5.6** — tipado
- **Tailwind 4** — estilos
- **shadcn/ui** — componentes

## Puesta en marcha

```bash
npm install
npm run dev
```

## Despliegue

`npm run build` y servir `dist/`. Se publica como sitio estático. El proxy Vite de desarrollo no significa que exista una API desplegada.

## Nota

El README original tenía un bloque `"""` de Python y una ruta absoluta local
(`C:\Users\USER\Documents\01_PROYECTOS\...`). Ambos se han retirado: una ruta de disco
no significa nada para quien lee el repositorio.

## Validación real y privacidad

El formulario aplica reglas deterministas limitadas (longitud, posible elusión de instrucciones, patrones de correo/tokens y afirmaciones absolutas). No comprueba la veracidad de una respuesta, no ejecuta LLM, no certifica seguridad ni cumplimiento legal. No introducir información confidencial.

El dashboard muestra **únicamente contadores de esta sesión**, calculados a partir de resultados locales. Ni prompts ni respuestas se guardan en localStorage, sessionStorage o backend. El historial volátil desaparece al recargar la página.

```bash
npm ci
npm run verify
```

`verify` ejecuta build TypeScript/Vite y tests. Un workflow que falla sin ejecutar pasos no equivale a tests fallidos o aprobados.

## Licencia

MIT; consulte `LICENSE`.
