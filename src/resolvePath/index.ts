/**
 * Safely read a value from an object using a path array like:
 * ["field", "Date", "stringValue"] or ["a", 0, "b"]
 *
 * Typed overload:
 * - If you pass a `const` path tuple (e.g. `as const`), the return type is inferred.
 */
export type PathKey = string | number;

/** Utility type: safely index into objects/arrays for a given key. */
type PathProp<T, K extends PathKey> =
    T extends readonly (infer V)[]
    ? K extends number
    ? V
    : K extends `${number}`
    ? V
    : unknown
    :
    K extends keyof T
    ? T[K]
    : T extends Record<string, unknown>
    ? K extends string
    ? T[K]
    : unknown
    : unknown;

/** Utility type: compute the value type at a path tuple. */
export type PathValue<T, P extends readonly PathKey[]> =
    P extends readonly []
    ? T
    : P extends readonly [infer K, ...infer R]
    ? K extends PathKey
    ? PathValue<PathProp<T, K>, Extract<R, readonly PathKey[]>>
    : unknown
    : unknown;

export function resolvePath<T, const P extends readonly PathKey[]>(
    obj: T,
    path: P
): PathValue<T, P> | undefined;

export function resolvePath(obj: unknown, path: readonly PathKey[]): unknown;

export function resolvePath(obj: unknown, path: readonly PathKey[]): unknown
{
    if (obj == null) return undefined;

    let cur: unknown = obj;

    for (const key of path) {
        if (cur == null) return undefined;

        // Only objects/functions can be indexed safely.
        const t = typeof cur;
        if (t !== "object" && t !== "function") return undefined;

        // Dynamic indexing is intentionally "unknown" at the type level.
        cur = (cur as any)[key];
    }

    return cur;
}