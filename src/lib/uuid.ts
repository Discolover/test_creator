export function uuid(): `${string}-${string}-${string}-${string}-${string}` {
    return crypto.randomUUID();
} 