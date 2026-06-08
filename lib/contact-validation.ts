const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const CONTROL_CHAR_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const NAME_REGEX = /^[\p{L}\p{M}'\-. ]+$/u;

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 5000,
  bodyMaxBytes: 12_000,
} as const;

export interface ContactFields {
  name: string;
  email: string;
  message: string;
}

export interface ContactValidationResult {
  ok: true;
  data: ContactFields;
}

export interface ContactValidationError {
  ok: false;
  error: string;
}

export type ParsedContactInput = ContactValidationResult | ContactValidationError;

function stripControlChars(value: string, allowNewlines = false): string {
  if (allowNewlines) {
    return value.replace(CONTROL_CHAR_REGEX, "");
  }
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\n\r]/g, "");
}

export function sanitizeText(value: unknown, allowNewlines = false): string {
  if (typeof value !== "string") {
    return "";
  }
  return stripControlChars(value, allowNewlines).trim();
}

function isValidEmail(email: string): boolean {
  if (email.length > CONTACT_LIMITS.emailMax) {
    return false;
  }
  if (!EMAIL_REGEX.test(email)) {
    return false;
  }
  const [local, domain] = email.split("@");
  if (!local || !domain || local.startsWith(".") || local.endsWith(".")) {
    return false;
  }
  if (local.includes("..") || domain.includes("..")) {
    return false;
  }
  return domain.includes(".");
}

export function parseContactInput(body: unknown): ParsedContactInput {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const name = sanitizeText(raw.name);
  const email = sanitizeText(raw.email).toLowerCase();
  const message = sanitizeText(raw.message, true);

  if (!name || !email || !message) {
    return { ok: false, error: "All fields are required." };
  }

  if (name.length < CONTACT_LIMITS.nameMin || name.length > CONTACT_LIMITS.nameMax) {
    return { ok: false, error: "Name must be between 2 and 100 characters." };
  }

  if (!NAME_REGEX.test(name)) {
    return { ok: false, error: "Name contains invalid characters." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  if (message.length < CONTACT_LIMITS.messageMin) {
    return { ok: false, error: "Message must be at least 10 characters." };
  }

  if (message.length > CONTACT_LIMITS.messageMax) {
    return { ok: false, error: "Message must be 5000 characters or fewer." };
  }

  return { ok: true, data: { name, email, message } };
}

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
