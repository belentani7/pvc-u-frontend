/** Deterministic, local rules only. NOT an AI safety or regulatory certification. */
export const SUPPORTED_DOMAINS = ['ecommerce', 'salud', 'finanzas', 'chatbot', 'web_design', 'general'] as const;

export interface LocalValidationResult {
  valid: boolean; // "no flags under these rules", not a guarantee of correctness
  errors: string[];
  warnings: string[];
  checksExecuted: string[];
  engine: 'LOCAL_RULES_V1';
}

const normalized = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function validateLocally(domain: string, prompt: string, response: string): LocalValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const checksExecuted = ['formato', 'instrucciones', 'datos sensibles', 'afirmaciones absolutas'];
  if (!SUPPORTED_DOMAINS.includes(domain as typeof SUPPORTED_DOMAINS[number])) {
    errors.push('Dominio no admitido por las reglas locales.');
  }
  if (!prompt.trim() || !response.trim()) {
    errors.push('Prompt y respuesta no pueden estar vacíos.');
  }
  if (prompt.length > 10_000 || response.length > 10_000) {
    errors.push('Cada entrada debe contener como máximo 10.000 caracteres.');
  }

  const instructionText = normalized(prompt + '\n' + response);
  if (/(?:ignora|ignore|bypass|omite|descarta).{0,50}(?:instrucciones|reglas|politicas|sistema|instructions|rules|system prompt)/i.test(instructionText)) {
    warnings.push('Posible instrucción para eludir reglas. Revisión humana necesaria.');
  }

  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(response)) {
    warnings.push('Posible dirección de correo electrónico en la respuesta.');
  }
  // Heuristic only: patterns are intentionally conservative and never include the matched value in results.
  const possibleSecrets = [
    /\bsk-[A-Za-z0-9_-]{20,}/i,
    /\bgh[pousr]_[A-Za-z0-9]{20,}/i,
    /\bgithub_pat_[A-Za-z0-9_]{20,}/i,
    /\bbearer\s+[A-Za-z0-9._~+/-]{16,}={0,2}/i,
    /\bAKIA[0-9A-Z]{16}\b/,
  ];
  if (possibleSecrets.some(pattern => pattern.test(response))) {
    warnings.push('Posible token o secreto en la respuesta. No se almacena su valor.');
  }
  const answer = normalized(response);
  if (/(?:100\s*%\s*(?:seguro|garantizado|correcto)|cumple\s*(?:hipaa|gdpr|rgpd)\s*(?:al\s*100\s*%)?)/i.test(answer)) {
    warnings.push('Posible afirmación absoluta de exactitud o cumplimiento no verificado.');
  }

  return {
    valid: errors.length === 0 && warnings.length === 0,
    errors,
    warnings,
    checksExecuted,
    engine: 'LOCAL_RULES_V1',
  };
}
