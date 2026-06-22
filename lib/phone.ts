const PHONE_PATTERN = /^[+]?[\d\s()-]{10,20}$/;

export function sanitizePhoneInput(value: string, maxLength = 20): string {
  return value.replace(/[^\d\s()+.-]/g, "").slice(0, maxLength);
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 10 && trimmed.length <= 20 && PHONE_PATTERN.test(trimmed);
}
