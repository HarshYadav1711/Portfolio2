interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

const LIMITS = {
  ip: { limit: 5, windowMs: 10 * 60 * 1000 },
  email: { limit: 3, windowMs: 30 * 60 * 1000 },
} as const satisfies Record<string, RateLimitConfig>;

function getStore(name: string): Map<string, RateLimitEntry> {
  let store = stores.get(name);
  if (!store) {
    store = new Map();
    stores.set(name, store);
  }
  return store;
}

function pruneStore(store: Map<string, RateLimitEntry>, now: number): void {
  if (store.size < 200) {
    return;
  }
  for (const [key, entry] of store) {
    if (now >= entry.resetAt) {
      store.delete(key);
    }
  }
}

function checkLimit(
  storeName: string,
  key: string,
  config: RateLimitConfig,
  now = Date.now()
): RateLimitResult {
  const store = getStore(storeName);
  pruneStore(store, now);

  const entry = store.get(key);
  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true };
  }

  if (entry.count >= config.limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { allowed: true };
}

export function checkContactRateLimit(
  ip: string,
  email: string
): RateLimitResult {
  const ipResult = checkLimit("ip", ip, LIMITS.ip);
  if (!ipResult.allowed) {
    return ipResult;
  }

  return checkLimit("email", email, LIMITS.email);
}
