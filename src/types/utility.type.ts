/**
 * Makes a type nullable.
 * Example: Nullable<User> becomes User | null
 */
export type Nullable<T> = T | null| undefined;

/**
 * Creates a record with specific keys.
 * Example: RecordWithKeys<'a' | 'b', number> becomes { a: number; b: number }
 */
export type RecordWithKeys<K extends string, T> = { [P in K]: T };

/**
 * Makes specified keys in a type optional.
 * Example: PartialBy<User, 'email'> makes the email property optional in User
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Makes specified keys in a type required.
 * Example: RequiredBy<User, 'email'> makes the email property required in User
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Makes all properties in a type mutable.
 * Example: Mutable<Readonly<User>> makes all properties in User mutable
 */
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * Makes all nested properties in a type optional.
 * Example: DeepPartial<User> makes all nested properties in User optional
 */
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

/**
 * Gets the union type of all the values in an object.
 * Example: ValueOf<{ a: number; b: string }> becomes number | string
 */
export type ValueOf<T> = T[keyof T];

/**
 * Wraps a type in a Promise.
 * Example: Promisify<User> becomes Promise<User>
 */
export type Promisify<T> = Promise<T>;

/**
 * Generic function type.
 * Example: FunctionType<[number, string], boolean> becomes (a: number, b: string) => boolean
 */
export type FunctionType<T extends any[], R> = (...args: T) => R;

/**
 * Generic async function type.
 * Example: AsyncFunctionType<[number, string], boolean> becomes (a: number, b: string) => Promise<boolean>
 */
export type AsyncFunctionType<T extends any[], R> = (...args: T) => Promise<R>;

/**
 * Extracts the type from a Promise, Array, or other container types.
 * Example: Unpacked<Promise<User>> becomes User
 */
export type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

/**
 * Gets keys of an object that have a specific type.
 * Example: KeysOfType<{ a: number; b: string }, number> becomes 'a'
 */
export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
