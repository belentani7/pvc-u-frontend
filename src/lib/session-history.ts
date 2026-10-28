import type { LocalValidationResult } from './local-validation';

export interface ValidationEvent {
  id: number;
  domain: string;
  timestamp: string;
  valid: boolean;
  errors: number;
  warnings: number;
}

// Volatile, memory-only summary: NEVER persist or transmit the original prompt/response.
let events: ValidationEvent[] = [];
let nextId = 1;

export function recordValidation(domain: string, result: LocalValidationResult): void {
  events = [{
    id: nextId++,
    domain,
    timestamp: new Date().toISOString(),
    valid: result.valid,
    errors: result.errors.length,
    warnings: result.warnings.length,
  }, ...events].slice(0, 50);
}

export function getSessionEvents(): ValidationEvent[] {
  return events.map(event => ({ ...event }));
}

export function clearSessionEvents(): void {
  events = [];
  nextId = 1;
}
