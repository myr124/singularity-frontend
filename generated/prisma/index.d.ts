
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model DevUser
 * 
 */
export type DevUser = $Result.DefaultSelection<Prisma.$DevUserPayload>
/**
 * Model RunSession
 * 
 */
export type RunSession = $Result.DefaultSelection<Prisma.$RunSessionPayload>
/**
 * Model RunStep
 * 
 */
export type RunStep = $Result.DefaultSelection<Prisma.$RunStepPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more DevUsers
 * const devUsers = await prisma.devUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more DevUsers
   * const devUsers = await prisma.devUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.devUser`: Exposes CRUD operations for the **DevUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DevUsers
    * const devUsers = await prisma.devUser.findMany()
    * ```
    */
  get devUser(): Prisma.DevUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.runSession`: Exposes CRUD operations for the **RunSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RunSessions
    * const runSessions = await prisma.runSession.findMany()
    * ```
    */
  get runSession(): Prisma.RunSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.runStep`: Exposes CRUD operations for the **RunStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RunSteps
    * const runSteps = await prisma.runStep.findMany()
    * ```
    */
  get runStep(): Prisma.RunStepDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    DevUser: 'DevUser',
    RunSession: 'RunSession',
    RunStep: 'RunStep'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "devUser" | "runSession" | "runStep"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DevUser: {
        payload: Prisma.$DevUserPayload<ExtArgs>
        fields: Prisma.DevUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DevUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DevUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload>
          }
          findFirst: {
            args: Prisma.DevUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DevUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload>
          }
          findMany: {
            args: Prisma.DevUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload>[]
          }
          create: {
            args: Prisma.DevUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload>
          }
          createMany: {
            args: Prisma.DevUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DevUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload>[]
          }
          delete: {
            args: Prisma.DevUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload>
          }
          update: {
            args: Prisma.DevUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload>
          }
          deleteMany: {
            args: Prisma.DevUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DevUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DevUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload>[]
          }
          upsert: {
            args: Prisma.DevUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevUserPayload>
          }
          aggregate: {
            args: Prisma.DevUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevUser>
          }
          groupBy: {
            args: Prisma.DevUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<DevUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.DevUserCountArgs<ExtArgs>
            result: $Utils.Optional<DevUserCountAggregateOutputType> | number
          }
        }
      }
      RunSession: {
        payload: Prisma.$RunSessionPayload<ExtArgs>
        fields: Prisma.RunSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RunSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RunSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload>
          }
          findFirst: {
            args: Prisma.RunSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RunSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload>
          }
          findMany: {
            args: Prisma.RunSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload>[]
          }
          create: {
            args: Prisma.RunSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload>
          }
          createMany: {
            args: Prisma.RunSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RunSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload>[]
          }
          delete: {
            args: Prisma.RunSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload>
          }
          update: {
            args: Prisma.RunSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload>
          }
          deleteMany: {
            args: Prisma.RunSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RunSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RunSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload>[]
          }
          upsert: {
            args: Prisma.RunSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunSessionPayload>
          }
          aggregate: {
            args: Prisma.RunSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRunSession>
          }
          groupBy: {
            args: Prisma.RunSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RunSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RunSessionCountArgs<ExtArgs>
            result: $Utils.Optional<RunSessionCountAggregateOutputType> | number
          }
        }
      }
      RunStep: {
        payload: Prisma.$RunStepPayload<ExtArgs>
        fields: Prisma.RunStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RunStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RunStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload>
          }
          findFirst: {
            args: Prisma.RunStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RunStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload>
          }
          findMany: {
            args: Prisma.RunStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload>[]
          }
          create: {
            args: Prisma.RunStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload>
          }
          createMany: {
            args: Prisma.RunStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RunStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload>[]
          }
          delete: {
            args: Prisma.RunStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload>
          }
          update: {
            args: Prisma.RunStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload>
          }
          deleteMany: {
            args: Prisma.RunStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RunStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RunStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload>[]
          }
          upsert: {
            args: Prisma.RunStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunStepPayload>
          }
          aggregate: {
            args: Prisma.RunStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRunStep>
          }
          groupBy: {
            args: Prisma.RunStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<RunStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.RunStepCountArgs<ExtArgs>
            result: $Utils.Optional<RunStepCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    devUser?: DevUserOmit
    runSession?: RunSessionOmit
    runStep?: RunStepOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DevUserCountOutputType
   */

  export type DevUserCountOutputType = {
    sessions: number
  }

  export type DevUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | DevUserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * DevUserCountOutputType without action
   */
  export type DevUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUserCountOutputType
     */
    select?: DevUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DevUserCountOutputType without action
   */
  export type DevUserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RunSessionWhereInput
  }


  /**
   * Count Type RunSessionCountOutputType
   */

  export type RunSessionCountOutputType = {
    steps: number
  }

  export type RunSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | RunSessionCountOutputTypeCountStepsArgs
  }

  // Custom InputTypes
  /**
   * RunSessionCountOutputType without action
   */
  export type RunSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSessionCountOutputType
     */
    select?: RunSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RunSessionCountOutputType without action
   */
  export type RunSessionCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RunStepWhereInput
  }


  /**
   * Models
   */

  /**
   * Model DevUser
   */

  export type AggregateDevUser = {
    _count: DevUserCountAggregateOutputType | null
    _min: DevUserMinAggregateOutputType | null
    _max: DevUserMaxAggregateOutputType | null
  }

  export type DevUserMinAggregateOutputType = {
    id: string | null
    displayName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DevUserMaxAggregateOutputType = {
    id: string | null
    displayName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DevUserCountAggregateOutputType = {
    id: number
    displayName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DevUserMinAggregateInputType = {
    id?: true
    displayName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DevUserMaxAggregateInputType = {
    id?: true
    displayName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DevUserCountAggregateInputType = {
    id?: true
    displayName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DevUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DevUser to aggregate.
     */
    where?: DevUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DevUsers to fetch.
     */
    orderBy?: DevUserOrderByWithRelationInput | DevUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DevUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DevUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DevUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DevUsers
    **/
    _count?: true | DevUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DevUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DevUserMaxAggregateInputType
  }

  export type GetDevUserAggregateType<T extends DevUserAggregateArgs> = {
        [P in keyof T & keyof AggregateDevUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevUser[P]>
      : GetScalarType<T[P], AggregateDevUser[P]>
  }




  export type DevUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DevUserWhereInput
    orderBy?: DevUserOrderByWithAggregationInput | DevUserOrderByWithAggregationInput[]
    by: DevUserScalarFieldEnum[] | DevUserScalarFieldEnum
    having?: DevUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DevUserCountAggregateInputType | true
    _min?: DevUserMinAggregateInputType
    _max?: DevUserMaxAggregateInputType
  }

  export type DevUserGroupByOutputType = {
    id: string
    displayName: string
    createdAt: Date
    updatedAt: Date
    _count: DevUserCountAggregateOutputType | null
    _min: DevUserMinAggregateOutputType | null
    _max: DevUserMaxAggregateOutputType | null
  }

  type GetDevUserGroupByPayload<T extends DevUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DevUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DevUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DevUserGroupByOutputType[P]>
            : GetScalarType<T[P], DevUserGroupByOutputType[P]>
        }
      >
    >


  export type DevUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | DevUser$sessionsArgs<ExtArgs>
    _count?: boolean | DevUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["devUser"]>

  export type DevUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["devUser"]>

  export type DevUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["devUser"]>

  export type DevUserSelectScalar = {
    id?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DevUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "displayName" | "createdAt" | "updatedAt", ExtArgs["result"]["devUser"]>
  export type DevUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | DevUser$sessionsArgs<ExtArgs>
    _count?: boolean | DevUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DevUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DevUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DevUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DevUser"
    objects: {
      sessions: Prisma.$RunSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      displayName: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["devUser"]>
    composites: {}
  }

  type DevUserGetPayload<S extends boolean | null | undefined | DevUserDefaultArgs> = $Result.GetResult<Prisma.$DevUserPayload, S>

  type DevUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DevUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DevUserCountAggregateInputType | true
    }

  export interface DevUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DevUser'], meta: { name: 'DevUser' } }
    /**
     * Find zero or one DevUser that matches the filter.
     * @param {DevUserFindUniqueArgs} args - Arguments to find a DevUser
     * @example
     * // Get one DevUser
     * const devUser = await prisma.devUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DevUserFindUniqueArgs>(args: SelectSubset<T, DevUserFindUniqueArgs<ExtArgs>>): Prisma__DevUserClient<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DevUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DevUserFindUniqueOrThrowArgs} args - Arguments to find a DevUser
     * @example
     * // Get one DevUser
     * const devUser = await prisma.devUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DevUserFindUniqueOrThrowArgs>(args: SelectSubset<T, DevUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DevUserClient<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DevUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevUserFindFirstArgs} args - Arguments to find a DevUser
     * @example
     * // Get one DevUser
     * const devUser = await prisma.devUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DevUserFindFirstArgs>(args?: SelectSubset<T, DevUserFindFirstArgs<ExtArgs>>): Prisma__DevUserClient<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DevUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevUserFindFirstOrThrowArgs} args - Arguments to find a DevUser
     * @example
     * // Get one DevUser
     * const devUser = await prisma.devUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DevUserFindFirstOrThrowArgs>(args?: SelectSubset<T, DevUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__DevUserClient<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DevUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DevUsers
     * const devUsers = await prisma.devUser.findMany()
     * 
     * // Get first 10 DevUsers
     * const devUsers = await prisma.devUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const devUserWithIdOnly = await prisma.devUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DevUserFindManyArgs>(args?: SelectSubset<T, DevUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DevUser.
     * @param {DevUserCreateArgs} args - Arguments to create a DevUser.
     * @example
     * // Create one DevUser
     * const DevUser = await prisma.devUser.create({
     *   data: {
     *     // ... data to create a DevUser
     *   }
     * })
     * 
     */
    create<T extends DevUserCreateArgs>(args: SelectSubset<T, DevUserCreateArgs<ExtArgs>>): Prisma__DevUserClient<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DevUsers.
     * @param {DevUserCreateManyArgs} args - Arguments to create many DevUsers.
     * @example
     * // Create many DevUsers
     * const devUser = await prisma.devUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DevUserCreateManyArgs>(args?: SelectSubset<T, DevUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DevUsers and returns the data saved in the database.
     * @param {DevUserCreateManyAndReturnArgs} args - Arguments to create many DevUsers.
     * @example
     * // Create many DevUsers
     * const devUser = await prisma.devUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DevUsers and only return the `id`
     * const devUserWithIdOnly = await prisma.devUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DevUserCreateManyAndReturnArgs>(args?: SelectSubset<T, DevUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DevUser.
     * @param {DevUserDeleteArgs} args - Arguments to delete one DevUser.
     * @example
     * // Delete one DevUser
     * const DevUser = await prisma.devUser.delete({
     *   where: {
     *     // ... filter to delete one DevUser
     *   }
     * })
     * 
     */
    delete<T extends DevUserDeleteArgs>(args: SelectSubset<T, DevUserDeleteArgs<ExtArgs>>): Prisma__DevUserClient<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DevUser.
     * @param {DevUserUpdateArgs} args - Arguments to update one DevUser.
     * @example
     * // Update one DevUser
     * const devUser = await prisma.devUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DevUserUpdateArgs>(args: SelectSubset<T, DevUserUpdateArgs<ExtArgs>>): Prisma__DevUserClient<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DevUsers.
     * @param {DevUserDeleteManyArgs} args - Arguments to filter DevUsers to delete.
     * @example
     * // Delete a few DevUsers
     * const { count } = await prisma.devUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DevUserDeleteManyArgs>(args?: SelectSubset<T, DevUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DevUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DevUsers
     * const devUser = await prisma.devUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DevUserUpdateManyArgs>(args: SelectSubset<T, DevUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DevUsers and returns the data updated in the database.
     * @param {DevUserUpdateManyAndReturnArgs} args - Arguments to update many DevUsers.
     * @example
     * // Update many DevUsers
     * const devUser = await prisma.devUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DevUsers and only return the `id`
     * const devUserWithIdOnly = await prisma.devUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DevUserUpdateManyAndReturnArgs>(args: SelectSubset<T, DevUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DevUser.
     * @param {DevUserUpsertArgs} args - Arguments to update or create a DevUser.
     * @example
     * // Update or create a DevUser
     * const devUser = await prisma.devUser.upsert({
     *   create: {
     *     // ... data to create a DevUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DevUser we want to update
     *   }
     * })
     */
    upsert<T extends DevUserUpsertArgs>(args: SelectSubset<T, DevUserUpsertArgs<ExtArgs>>): Prisma__DevUserClient<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DevUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevUserCountArgs} args - Arguments to filter DevUsers to count.
     * @example
     * // Count the number of DevUsers
     * const count = await prisma.devUser.count({
     *   where: {
     *     // ... the filter for the DevUsers we want to count
     *   }
     * })
    **/
    count<T extends DevUserCountArgs>(
      args?: Subset<T, DevUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DevUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DevUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DevUserAggregateArgs>(args: Subset<T, DevUserAggregateArgs>): Prisma.PrismaPromise<GetDevUserAggregateType<T>>

    /**
     * Group by DevUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DevUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DevUserGroupByArgs['orderBy'] }
        : { orderBy?: DevUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DevUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDevUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DevUser model
   */
  readonly fields: DevUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DevUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DevUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends DevUser$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, DevUser$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DevUser model
   */
  interface DevUserFieldRefs {
    readonly id: FieldRef<"DevUser", 'String'>
    readonly displayName: FieldRef<"DevUser", 'String'>
    readonly createdAt: FieldRef<"DevUser", 'DateTime'>
    readonly updatedAt: FieldRef<"DevUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DevUser findUnique
   */
  export type DevUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    /**
     * Filter, which DevUser to fetch.
     */
    where: DevUserWhereUniqueInput
  }

  /**
   * DevUser findUniqueOrThrow
   */
  export type DevUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    /**
     * Filter, which DevUser to fetch.
     */
    where: DevUserWhereUniqueInput
  }

  /**
   * DevUser findFirst
   */
  export type DevUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    /**
     * Filter, which DevUser to fetch.
     */
    where?: DevUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DevUsers to fetch.
     */
    orderBy?: DevUserOrderByWithRelationInput | DevUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DevUsers.
     */
    cursor?: DevUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DevUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DevUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DevUsers.
     */
    distinct?: DevUserScalarFieldEnum | DevUserScalarFieldEnum[]
  }

  /**
   * DevUser findFirstOrThrow
   */
  export type DevUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    /**
     * Filter, which DevUser to fetch.
     */
    where?: DevUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DevUsers to fetch.
     */
    orderBy?: DevUserOrderByWithRelationInput | DevUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DevUsers.
     */
    cursor?: DevUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DevUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DevUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DevUsers.
     */
    distinct?: DevUserScalarFieldEnum | DevUserScalarFieldEnum[]
  }

  /**
   * DevUser findMany
   */
  export type DevUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    /**
     * Filter, which DevUsers to fetch.
     */
    where?: DevUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DevUsers to fetch.
     */
    orderBy?: DevUserOrderByWithRelationInput | DevUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DevUsers.
     */
    cursor?: DevUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DevUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DevUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DevUsers.
     */
    distinct?: DevUserScalarFieldEnum | DevUserScalarFieldEnum[]
  }

  /**
   * DevUser create
   */
  export type DevUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    /**
     * The data needed to create a DevUser.
     */
    data: XOR<DevUserCreateInput, DevUserUncheckedCreateInput>
  }

  /**
   * DevUser createMany
   */
  export type DevUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DevUsers.
     */
    data: DevUserCreateManyInput | DevUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DevUser createManyAndReturn
   */
  export type DevUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * The data used to create many DevUsers.
     */
    data: DevUserCreateManyInput | DevUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DevUser update
   */
  export type DevUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    /**
     * The data needed to update a DevUser.
     */
    data: XOR<DevUserUpdateInput, DevUserUncheckedUpdateInput>
    /**
     * Choose, which DevUser to update.
     */
    where: DevUserWhereUniqueInput
  }

  /**
   * DevUser updateMany
   */
  export type DevUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DevUsers.
     */
    data: XOR<DevUserUpdateManyMutationInput, DevUserUncheckedUpdateManyInput>
    /**
     * Filter which DevUsers to update
     */
    where?: DevUserWhereInput
    /**
     * Limit how many DevUsers to update.
     */
    limit?: number
  }

  /**
   * DevUser updateManyAndReturn
   */
  export type DevUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * The data used to update DevUsers.
     */
    data: XOR<DevUserUpdateManyMutationInput, DevUserUncheckedUpdateManyInput>
    /**
     * Filter which DevUsers to update
     */
    where?: DevUserWhereInput
    /**
     * Limit how many DevUsers to update.
     */
    limit?: number
  }

  /**
   * DevUser upsert
   */
  export type DevUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    /**
     * The filter to search for the DevUser to update in case it exists.
     */
    where: DevUserWhereUniqueInput
    /**
     * In case the DevUser found by the `where` argument doesn't exist, create a new DevUser with this data.
     */
    create: XOR<DevUserCreateInput, DevUserUncheckedCreateInput>
    /**
     * In case the DevUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DevUserUpdateInput, DevUserUncheckedUpdateInput>
  }

  /**
   * DevUser delete
   */
  export type DevUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    /**
     * Filter which DevUser to delete.
     */
    where: DevUserWhereUniqueInput
  }

  /**
   * DevUser deleteMany
   */
  export type DevUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DevUsers to delete
     */
    where?: DevUserWhereInput
    /**
     * Limit how many DevUsers to delete.
     */
    limit?: number
  }

  /**
   * DevUser.sessions
   */
  export type DevUser$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    where?: RunSessionWhereInput
    orderBy?: RunSessionOrderByWithRelationInput | RunSessionOrderByWithRelationInput[]
    cursor?: RunSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RunSessionScalarFieldEnum | RunSessionScalarFieldEnum[]
  }

  /**
   * DevUser without action
   */
  export type DevUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
  }


  /**
   * Model RunSession
   */

  export type AggregateRunSession = {
    _count: RunSessionCountAggregateOutputType | null
    _min: RunSessionMinAggregateOutputType | null
    _max: RunSessionMaxAggregateOutputType | null
  }

  export type RunSessionMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    accentColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
  }

  export type RunSessionMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    accentColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
  }

  export type RunSessionCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    accentColor: number
    createdAt: number
    updatedAt: number
    ownerId: number
    _all: number
  }


  export type RunSessionMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    accentColor?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type RunSessionMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    accentColor?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type RunSessionCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    accentColor?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    _all?: true
  }

  export type RunSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RunSession to aggregate.
     */
    where?: RunSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunSessions to fetch.
     */
    orderBy?: RunSessionOrderByWithRelationInput | RunSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RunSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RunSessions
    **/
    _count?: true | RunSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RunSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RunSessionMaxAggregateInputType
  }

  export type GetRunSessionAggregateType<T extends RunSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateRunSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRunSession[P]>
      : GetScalarType<T[P], AggregateRunSession[P]>
  }




  export type RunSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RunSessionWhereInput
    orderBy?: RunSessionOrderByWithAggregationInput | RunSessionOrderByWithAggregationInput[]
    by: RunSessionScalarFieldEnum[] | RunSessionScalarFieldEnum
    having?: RunSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RunSessionCountAggregateInputType | true
    _min?: RunSessionMinAggregateInputType
    _max?: RunSessionMaxAggregateInputType
  }

  export type RunSessionGroupByOutputType = {
    id: string
    title: string
    description: string | null
    status: string
    accentColor: string
    createdAt: Date
    updatedAt: Date
    ownerId: string | null
    _count: RunSessionCountAggregateOutputType | null
    _min: RunSessionMinAggregateOutputType | null
    _max: RunSessionMaxAggregateOutputType | null
  }

  type GetRunSessionGroupByPayload<T extends RunSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RunSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RunSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RunSessionGroupByOutputType[P]>
            : GetScalarType<T[P], RunSessionGroupByOutputType[P]>
        }
      >
    >


  export type RunSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    accentColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    owner?: boolean | RunSession$ownerArgs<ExtArgs>
    steps?: boolean | RunSession$stepsArgs<ExtArgs>
    _count?: boolean | RunSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runSession"]>

  export type RunSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    accentColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    owner?: boolean | RunSession$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["runSession"]>

  export type RunSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    accentColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    owner?: boolean | RunSession$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["runSession"]>

  export type RunSessionSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    accentColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
  }

  export type RunSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "accentColor" | "createdAt" | "updatedAt" | "ownerId", ExtArgs["result"]["runSession"]>
  export type RunSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | RunSession$ownerArgs<ExtArgs>
    steps?: boolean | RunSession$stepsArgs<ExtArgs>
    _count?: boolean | RunSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RunSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | RunSession$ownerArgs<ExtArgs>
  }
  export type RunSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | RunSession$ownerArgs<ExtArgs>
  }

  export type $RunSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RunSession"
    objects: {
      owner: Prisma.$DevUserPayload<ExtArgs> | null
      steps: Prisma.$RunStepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      status: string
      accentColor: string
      createdAt: Date
      updatedAt: Date
      ownerId: string | null
    }, ExtArgs["result"]["runSession"]>
    composites: {}
  }

  type RunSessionGetPayload<S extends boolean | null | undefined | RunSessionDefaultArgs> = $Result.GetResult<Prisma.$RunSessionPayload, S>

  type RunSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RunSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RunSessionCountAggregateInputType | true
    }

  export interface RunSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RunSession'], meta: { name: 'RunSession' } }
    /**
     * Find zero or one RunSession that matches the filter.
     * @param {RunSessionFindUniqueArgs} args - Arguments to find a RunSession
     * @example
     * // Get one RunSession
     * const runSession = await prisma.runSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RunSessionFindUniqueArgs>(args: SelectSubset<T, RunSessionFindUniqueArgs<ExtArgs>>): Prisma__RunSessionClient<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RunSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RunSessionFindUniqueOrThrowArgs} args - Arguments to find a RunSession
     * @example
     * // Get one RunSession
     * const runSession = await prisma.runSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RunSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, RunSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RunSessionClient<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RunSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunSessionFindFirstArgs} args - Arguments to find a RunSession
     * @example
     * // Get one RunSession
     * const runSession = await prisma.runSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RunSessionFindFirstArgs>(args?: SelectSubset<T, RunSessionFindFirstArgs<ExtArgs>>): Prisma__RunSessionClient<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RunSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunSessionFindFirstOrThrowArgs} args - Arguments to find a RunSession
     * @example
     * // Get one RunSession
     * const runSession = await prisma.runSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RunSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, RunSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RunSessionClient<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RunSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RunSessions
     * const runSessions = await prisma.runSession.findMany()
     * 
     * // Get first 10 RunSessions
     * const runSessions = await prisma.runSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const runSessionWithIdOnly = await prisma.runSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RunSessionFindManyArgs>(args?: SelectSubset<T, RunSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RunSession.
     * @param {RunSessionCreateArgs} args - Arguments to create a RunSession.
     * @example
     * // Create one RunSession
     * const RunSession = await prisma.runSession.create({
     *   data: {
     *     // ... data to create a RunSession
     *   }
     * })
     * 
     */
    create<T extends RunSessionCreateArgs>(args: SelectSubset<T, RunSessionCreateArgs<ExtArgs>>): Prisma__RunSessionClient<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RunSessions.
     * @param {RunSessionCreateManyArgs} args - Arguments to create many RunSessions.
     * @example
     * // Create many RunSessions
     * const runSession = await prisma.runSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RunSessionCreateManyArgs>(args?: SelectSubset<T, RunSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RunSessions and returns the data saved in the database.
     * @param {RunSessionCreateManyAndReturnArgs} args - Arguments to create many RunSessions.
     * @example
     * // Create many RunSessions
     * const runSession = await prisma.runSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RunSessions and only return the `id`
     * const runSessionWithIdOnly = await prisma.runSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RunSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, RunSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RunSession.
     * @param {RunSessionDeleteArgs} args - Arguments to delete one RunSession.
     * @example
     * // Delete one RunSession
     * const RunSession = await prisma.runSession.delete({
     *   where: {
     *     // ... filter to delete one RunSession
     *   }
     * })
     * 
     */
    delete<T extends RunSessionDeleteArgs>(args: SelectSubset<T, RunSessionDeleteArgs<ExtArgs>>): Prisma__RunSessionClient<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RunSession.
     * @param {RunSessionUpdateArgs} args - Arguments to update one RunSession.
     * @example
     * // Update one RunSession
     * const runSession = await prisma.runSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RunSessionUpdateArgs>(args: SelectSubset<T, RunSessionUpdateArgs<ExtArgs>>): Prisma__RunSessionClient<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RunSessions.
     * @param {RunSessionDeleteManyArgs} args - Arguments to filter RunSessions to delete.
     * @example
     * // Delete a few RunSessions
     * const { count } = await prisma.runSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RunSessionDeleteManyArgs>(args?: SelectSubset<T, RunSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RunSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RunSessions
     * const runSession = await prisma.runSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RunSessionUpdateManyArgs>(args: SelectSubset<T, RunSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RunSessions and returns the data updated in the database.
     * @param {RunSessionUpdateManyAndReturnArgs} args - Arguments to update many RunSessions.
     * @example
     * // Update many RunSessions
     * const runSession = await prisma.runSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RunSessions and only return the `id`
     * const runSessionWithIdOnly = await prisma.runSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RunSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, RunSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RunSession.
     * @param {RunSessionUpsertArgs} args - Arguments to update or create a RunSession.
     * @example
     * // Update or create a RunSession
     * const runSession = await prisma.runSession.upsert({
     *   create: {
     *     // ... data to create a RunSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RunSession we want to update
     *   }
     * })
     */
    upsert<T extends RunSessionUpsertArgs>(args: SelectSubset<T, RunSessionUpsertArgs<ExtArgs>>): Prisma__RunSessionClient<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RunSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunSessionCountArgs} args - Arguments to filter RunSessions to count.
     * @example
     * // Count the number of RunSessions
     * const count = await prisma.runSession.count({
     *   where: {
     *     // ... the filter for the RunSessions we want to count
     *   }
     * })
    **/
    count<T extends RunSessionCountArgs>(
      args?: Subset<T, RunSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RunSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RunSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RunSessionAggregateArgs>(args: Subset<T, RunSessionAggregateArgs>): Prisma.PrismaPromise<GetRunSessionAggregateType<T>>

    /**
     * Group by RunSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RunSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RunSessionGroupByArgs['orderBy'] }
        : { orderBy?: RunSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RunSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRunSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RunSession model
   */
  readonly fields: RunSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RunSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RunSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends RunSession$ownerArgs<ExtArgs> = {}>(args?: Subset<T, RunSession$ownerArgs<ExtArgs>>): Prisma__DevUserClient<$Result.GetResult<Prisma.$DevUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    steps<T extends RunSession$stepsArgs<ExtArgs> = {}>(args?: Subset<T, RunSession$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RunSession model
   */
  interface RunSessionFieldRefs {
    readonly id: FieldRef<"RunSession", 'String'>
    readonly title: FieldRef<"RunSession", 'String'>
    readonly description: FieldRef<"RunSession", 'String'>
    readonly status: FieldRef<"RunSession", 'String'>
    readonly accentColor: FieldRef<"RunSession", 'String'>
    readonly createdAt: FieldRef<"RunSession", 'DateTime'>
    readonly updatedAt: FieldRef<"RunSession", 'DateTime'>
    readonly ownerId: FieldRef<"RunSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RunSession findUnique
   */
  export type RunSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    /**
     * Filter, which RunSession to fetch.
     */
    where: RunSessionWhereUniqueInput
  }

  /**
   * RunSession findUniqueOrThrow
   */
  export type RunSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    /**
     * Filter, which RunSession to fetch.
     */
    where: RunSessionWhereUniqueInput
  }

  /**
   * RunSession findFirst
   */
  export type RunSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    /**
     * Filter, which RunSession to fetch.
     */
    where?: RunSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunSessions to fetch.
     */
    orderBy?: RunSessionOrderByWithRelationInput | RunSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RunSessions.
     */
    cursor?: RunSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunSessions.
     */
    distinct?: RunSessionScalarFieldEnum | RunSessionScalarFieldEnum[]
  }

  /**
   * RunSession findFirstOrThrow
   */
  export type RunSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    /**
     * Filter, which RunSession to fetch.
     */
    where?: RunSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunSessions to fetch.
     */
    orderBy?: RunSessionOrderByWithRelationInput | RunSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RunSessions.
     */
    cursor?: RunSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunSessions.
     */
    distinct?: RunSessionScalarFieldEnum | RunSessionScalarFieldEnum[]
  }

  /**
   * RunSession findMany
   */
  export type RunSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    /**
     * Filter, which RunSessions to fetch.
     */
    where?: RunSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunSessions to fetch.
     */
    orderBy?: RunSessionOrderByWithRelationInput | RunSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RunSessions.
     */
    cursor?: RunSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunSessions.
     */
    distinct?: RunSessionScalarFieldEnum | RunSessionScalarFieldEnum[]
  }

  /**
   * RunSession create
   */
  export type RunSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a RunSession.
     */
    data: XOR<RunSessionCreateInput, RunSessionUncheckedCreateInput>
  }

  /**
   * RunSession createMany
   */
  export type RunSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RunSessions.
     */
    data: RunSessionCreateManyInput | RunSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RunSession createManyAndReturn
   */
  export type RunSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * The data used to create many RunSessions.
     */
    data: RunSessionCreateManyInput | RunSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RunSession update
   */
  export type RunSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a RunSession.
     */
    data: XOR<RunSessionUpdateInput, RunSessionUncheckedUpdateInput>
    /**
     * Choose, which RunSession to update.
     */
    where: RunSessionWhereUniqueInput
  }

  /**
   * RunSession updateMany
   */
  export type RunSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RunSessions.
     */
    data: XOR<RunSessionUpdateManyMutationInput, RunSessionUncheckedUpdateManyInput>
    /**
     * Filter which RunSessions to update
     */
    where?: RunSessionWhereInput
    /**
     * Limit how many RunSessions to update.
     */
    limit?: number
  }

  /**
   * RunSession updateManyAndReturn
   */
  export type RunSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * The data used to update RunSessions.
     */
    data: XOR<RunSessionUpdateManyMutationInput, RunSessionUncheckedUpdateManyInput>
    /**
     * Filter which RunSessions to update
     */
    where?: RunSessionWhereInput
    /**
     * Limit how many RunSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RunSession upsert
   */
  export type RunSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the RunSession to update in case it exists.
     */
    where: RunSessionWhereUniqueInput
    /**
     * In case the RunSession found by the `where` argument doesn't exist, create a new RunSession with this data.
     */
    create: XOR<RunSessionCreateInput, RunSessionUncheckedCreateInput>
    /**
     * In case the RunSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RunSessionUpdateInput, RunSessionUncheckedUpdateInput>
  }

  /**
   * RunSession delete
   */
  export type RunSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
    /**
     * Filter which RunSession to delete.
     */
    where: RunSessionWhereUniqueInput
  }

  /**
   * RunSession deleteMany
   */
  export type RunSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RunSessions to delete
     */
    where?: RunSessionWhereInput
    /**
     * Limit how many RunSessions to delete.
     */
    limit?: number
  }

  /**
   * RunSession.owner
   */
  export type RunSession$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DevUser
     */
    select?: DevUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DevUser
     */
    omit?: DevUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DevUserInclude<ExtArgs> | null
    where?: DevUserWhereInput
  }

  /**
   * RunSession.steps
   */
  export type RunSession$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    where?: RunStepWhereInput
    orderBy?: RunStepOrderByWithRelationInput | RunStepOrderByWithRelationInput[]
    cursor?: RunStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RunStepScalarFieldEnum | RunStepScalarFieldEnum[]
  }

  /**
   * RunSession without action
   */
  export type RunSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunSession
     */
    select?: RunSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunSession
     */
    omit?: RunSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunSessionInclude<ExtArgs> | null
  }


  /**
   * Model RunStep
   */

  export type AggregateRunStep = {
    _count: RunStepCountAggregateOutputType | null
    _avg: RunStepAvgAggregateOutputType | null
    _sum: RunStepSumAggregateOutputType | null
    _min: RunStepMinAggregateOutputType | null
    _max: RunStepMaxAggregateOutputType | null
  }

  export type RunStepAvgAggregateOutputType = {
    stepIndex: number | null
  }

  export type RunStepSumAggregateOutputType = {
    stepIndex: number | null
  }

  export type RunStepMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    stepIndex: number | null
    createdAt: Date | null
  }

  export type RunStepMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    stepIndex: number | null
    createdAt: Date | null
  }

  export type RunStepCountAggregateOutputType = {
    id: number
    sessionId: number
    stepIndex: number
    envState: number
    decision: number
    iterations: number
    transition: number
    availableAction: number
    createdAt: number
    _all: number
  }


  export type RunStepAvgAggregateInputType = {
    stepIndex?: true
  }

  export type RunStepSumAggregateInputType = {
    stepIndex?: true
  }

  export type RunStepMinAggregateInputType = {
    id?: true
    sessionId?: true
    stepIndex?: true
    createdAt?: true
  }

  export type RunStepMaxAggregateInputType = {
    id?: true
    sessionId?: true
    stepIndex?: true
    createdAt?: true
  }

  export type RunStepCountAggregateInputType = {
    id?: true
    sessionId?: true
    stepIndex?: true
    envState?: true
    decision?: true
    iterations?: true
    transition?: true
    availableAction?: true
    createdAt?: true
    _all?: true
  }

  export type RunStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RunStep to aggregate.
     */
    where?: RunStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunSteps to fetch.
     */
    orderBy?: RunStepOrderByWithRelationInput | RunStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RunStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RunSteps
    **/
    _count?: true | RunStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RunStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RunStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RunStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RunStepMaxAggregateInputType
  }

  export type GetRunStepAggregateType<T extends RunStepAggregateArgs> = {
        [P in keyof T & keyof AggregateRunStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRunStep[P]>
      : GetScalarType<T[P], AggregateRunStep[P]>
  }




  export type RunStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RunStepWhereInput
    orderBy?: RunStepOrderByWithAggregationInput | RunStepOrderByWithAggregationInput[]
    by: RunStepScalarFieldEnum[] | RunStepScalarFieldEnum
    having?: RunStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RunStepCountAggregateInputType | true
    _avg?: RunStepAvgAggregateInputType
    _sum?: RunStepSumAggregateInputType
    _min?: RunStepMinAggregateInputType
    _max?: RunStepMaxAggregateInputType
  }

  export type RunStepGroupByOutputType = {
    id: string
    sessionId: string
    stepIndex: number
    envState: JsonValue
    decision: JsonValue
    iterations: JsonValue
    transition: JsonValue
    availableAction: JsonValue | null
    createdAt: Date
    _count: RunStepCountAggregateOutputType | null
    _avg: RunStepAvgAggregateOutputType | null
    _sum: RunStepSumAggregateOutputType | null
    _min: RunStepMinAggregateOutputType | null
    _max: RunStepMaxAggregateOutputType | null
  }

  type GetRunStepGroupByPayload<T extends RunStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RunStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RunStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RunStepGroupByOutputType[P]>
            : GetScalarType<T[P], RunStepGroupByOutputType[P]>
        }
      >
    >


  export type RunStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    stepIndex?: boolean
    envState?: boolean
    decision?: boolean
    iterations?: boolean
    transition?: boolean
    availableAction?: boolean
    createdAt?: boolean
    session?: boolean | RunSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runStep"]>

  export type RunStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    stepIndex?: boolean
    envState?: boolean
    decision?: boolean
    iterations?: boolean
    transition?: boolean
    availableAction?: boolean
    createdAt?: boolean
    session?: boolean | RunSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runStep"]>

  export type RunStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    stepIndex?: boolean
    envState?: boolean
    decision?: boolean
    iterations?: boolean
    transition?: boolean
    availableAction?: boolean
    createdAt?: boolean
    session?: boolean | RunSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runStep"]>

  export type RunStepSelectScalar = {
    id?: boolean
    sessionId?: boolean
    stepIndex?: boolean
    envState?: boolean
    decision?: boolean
    iterations?: boolean
    transition?: boolean
    availableAction?: boolean
    createdAt?: boolean
  }

  export type RunStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "stepIndex" | "envState" | "decision" | "iterations" | "transition" | "availableAction" | "createdAt", ExtArgs["result"]["runStep"]>
  export type RunStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RunSessionDefaultArgs<ExtArgs>
  }
  export type RunStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RunSessionDefaultArgs<ExtArgs>
  }
  export type RunStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RunSessionDefaultArgs<ExtArgs>
  }

  export type $RunStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RunStep"
    objects: {
      session: Prisma.$RunSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      stepIndex: number
      envState: Prisma.JsonValue
      decision: Prisma.JsonValue
      iterations: Prisma.JsonValue
      transition: Prisma.JsonValue
      availableAction: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["runStep"]>
    composites: {}
  }

  type RunStepGetPayload<S extends boolean | null | undefined | RunStepDefaultArgs> = $Result.GetResult<Prisma.$RunStepPayload, S>

  type RunStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RunStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RunStepCountAggregateInputType | true
    }

  export interface RunStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RunStep'], meta: { name: 'RunStep' } }
    /**
     * Find zero or one RunStep that matches the filter.
     * @param {RunStepFindUniqueArgs} args - Arguments to find a RunStep
     * @example
     * // Get one RunStep
     * const runStep = await prisma.runStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RunStepFindUniqueArgs>(args: SelectSubset<T, RunStepFindUniqueArgs<ExtArgs>>): Prisma__RunStepClient<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RunStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RunStepFindUniqueOrThrowArgs} args - Arguments to find a RunStep
     * @example
     * // Get one RunStep
     * const runStep = await prisma.runStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RunStepFindUniqueOrThrowArgs>(args: SelectSubset<T, RunStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RunStepClient<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RunStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunStepFindFirstArgs} args - Arguments to find a RunStep
     * @example
     * // Get one RunStep
     * const runStep = await prisma.runStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RunStepFindFirstArgs>(args?: SelectSubset<T, RunStepFindFirstArgs<ExtArgs>>): Prisma__RunStepClient<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RunStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunStepFindFirstOrThrowArgs} args - Arguments to find a RunStep
     * @example
     * // Get one RunStep
     * const runStep = await prisma.runStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RunStepFindFirstOrThrowArgs>(args?: SelectSubset<T, RunStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__RunStepClient<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RunSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RunSteps
     * const runSteps = await prisma.runStep.findMany()
     * 
     * // Get first 10 RunSteps
     * const runSteps = await prisma.runStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const runStepWithIdOnly = await prisma.runStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RunStepFindManyArgs>(args?: SelectSubset<T, RunStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RunStep.
     * @param {RunStepCreateArgs} args - Arguments to create a RunStep.
     * @example
     * // Create one RunStep
     * const RunStep = await prisma.runStep.create({
     *   data: {
     *     // ... data to create a RunStep
     *   }
     * })
     * 
     */
    create<T extends RunStepCreateArgs>(args: SelectSubset<T, RunStepCreateArgs<ExtArgs>>): Prisma__RunStepClient<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RunSteps.
     * @param {RunStepCreateManyArgs} args - Arguments to create many RunSteps.
     * @example
     * // Create many RunSteps
     * const runStep = await prisma.runStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RunStepCreateManyArgs>(args?: SelectSubset<T, RunStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RunSteps and returns the data saved in the database.
     * @param {RunStepCreateManyAndReturnArgs} args - Arguments to create many RunSteps.
     * @example
     * // Create many RunSteps
     * const runStep = await prisma.runStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RunSteps and only return the `id`
     * const runStepWithIdOnly = await prisma.runStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RunStepCreateManyAndReturnArgs>(args?: SelectSubset<T, RunStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RunStep.
     * @param {RunStepDeleteArgs} args - Arguments to delete one RunStep.
     * @example
     * // Delete one RunStep
     * const RunStep = await prisma.runStep.delete({
     *   where: {
     *     // ... filter to delete one RunStep
     *   }
     * })
     * 
     */
    delete<T extends RunStepDeleteArgs>(args: SelectSubset<T, RunStepDeleteArgs<ExtArgs>>): Prisma__RunStepClient<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RunStep.
     * @param {RunStepUpdateArgs} args - Arguments to update one RunStep.
     * @example
     * // Update one RunStep
     * const runStep = await prisma.runStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RunStepUpdateArgs>(args: SelectSubset<T, RunStepUpdateArgs<ExtArgs>>): Prisma__RunStepClient<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RunSteps.
     * @param {RunStepDeleteManyArgs} args - Arguments to filter RunSteps to delete.
     * @example
     * // Delete a few RunSteps
     * const { count } = await prisma.runStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RunStepDeleteManyArgs>(args?: SelectSubset<T, RunStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RunSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RunSteps
     * const runStep = await prisma.runStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RunStepUpdateManyArgs>(args: SelectSubset<T, RunStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RunSteps and returns the data updated in the database.
     * @param {RunStepUpdateManyAndReturnArgs} args - Arguments to update many RunSteps.
     * @example
     * // Update many RunSteps
     * const runStep = await prisma.runStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RunSteps and only return the `id`
     * const runStepWithIdOnly = await prisma.runStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RunStepUpdateManyAndReturnArgs>(args: SelectSubset<T, RunStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RunStep.
     * @param {RunStepUpsertArgs} args - Arguments to update or create a RunStep.
     * @example
     * // Update or create a RunStep
     * const runStep = await prisma.runStep.upsert({
     *   create: {
     *     // ... data to create a RunStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RunStep we want to update
     *   }
     * })
     */
    upsert<T extends RunStepUpsertArgs>(args: SelectSubset<T, RunStepUpsertArgs<ExtArgs>>): Prisma__RunStepClient<$Result.GetResult<Prisma.$RunStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RunSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunStepCountArgs} args - Arguments to filter RunSteps to count.
     * @example
     * // Count the number of RunSteps
     * const count = await prisma.runStep.count({
     *   where: {
     *     // ... the filter for the RunSteps we want to count
     *   }
     * })
    **/
    count<T extends RunStepCountArgs>(
      args?: Subset<T, RunStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RunStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RunStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RunStepAggregateArgs>(args: Subset<T, RunStepAggregateArgs>): Prisma.PrismaPromise<GetRunStepAggregateType<T>>

    /**
     * Group by RunStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RunStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RunStepGroupByArgs['orderBy'] }
        : { orderBy?: RunStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RunStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRunStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RunStep model
   */
  readonly fields: RunStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RunStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RunStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends RunSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RunSessionDefaultArgs<ExtArgs>>): Prisma__RunSessionClient<$Result.GetResult<Prisma.$RunSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RunStep model
   */
  interface RunStepFieldRefs {
    readonly id: FieldRef<"RunStep", 'String'>
    readonly sessionId: FieldRef<"RunStep", 'String'>
    readonly stepIndex: FieldRef<"RunStep", 'Int'>
    readonly envState: FieldRef<"RunStep", 'Json'>
    readonly decision: FieldRef<"RunStep", 'Json'>
    readonly iterations: FieldRef<"RunStep", 'Json'>
    readonly transition: FieldRef<"RunStep", 'Json'>
    readonly availableAction: FieldRef<"RunStep", 'Json'>
    readonly createdAt: FieldRef<"RunStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RunStep findUnique
   */
  export type RunStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    /**
     * Filter, which RunStep to fetch.
     */
    where: RunStepWhereUniqueInput
  }

  /**
   * RunStep findUniqueOrThrow
   */
  export type RunStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    /**
     * Filter, which RunStep to fetch.
     */
    where: RunStepWhereUniqueInput
  }

  /**
   * RunStep findFirst
   */
  export type RunStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    /**
     * Filter, which RunStep to fetch.
     */
    where?: RunStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunSteps to fetch.
     */
    orderBy?: RunStepOrderByWithRelationInput | RunStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RunSteps.
     */
    cursor?: RunStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunSteps.
     */
    distinct?: RunStepScalarFieldEnum | RunStepScalarFieldEnum[]
  }

  /**
   * RunStep findFirstOrThrow
   */
  export type RunStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    /**
     * Filter, which RunStep to fetch.
     */
    where?: RunStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunSteps to fetch.
     */
    orderBy?: RunStepOrderByWithRelationInput | RunStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RunSteps.
     */
    cursor?: RunStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunSteps.
     */
    distinct?: RunStepScalarFieldEnum | RunStepScalarFieldEnum[]
  }

  /**
   * RunStep findMany
   */
  export type RunStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    /**
     * Filter, which RunSteps to fetch.
     */
    where?: RunStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunSteps to fetch.
     */
    orderBy?: RunStepOrderByWithRelationInput | RunStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RunSteps.
     */
    cursor?: RunStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunSteps.
     */
    distinct?: RunStepScalarFieldEnum | RunStepScalarFieldEnum[]
  }

  /**
   * RunStep create
   */
  export type RunStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    /**
     * The data needed to create a RunStep.
     */
    data: XOR<RunStepCreateInput, RunStepUncheckedCreateInput>
  }

  /**
   * RunStep createMany
   */
  export type RunStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RunSteps.
     */
    data: RunStepCreateManyInput | RunStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RunStep createManyAndReturn
   */
  export type RunStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * The data used to create many RunSteps.
     */
    data: RunStepCreateManyInput | RunStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RunStep update
   */
  export type RunStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    /**
     * The data needed to update a RunStep.
     */
    data: XOR<RunStepUpdateInput, RunStepUncheckedUpdateInput>
    /**
     * Choose, which RunStep to update.
     */
    where: RunStepWhereUniqueInput
  }

  /**
   * RunStep updateMany
   */
  export type RunStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RunSteps.
     */
    data: XOR<RunStepUpdateManyMutationInput, RunStepUncheckedUpdateManyInput>
    /**
     * Filter which RunSteps to update
     */
    where?: RunStepWhereInput
    /**
     * Limit how many RunSteps to update.
     */
    limit?: number
  }

  /**
   * RunStep updateManyAndReturn
   */
  export type RunStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * The data used to update RunSteps.
     */
    data: XOR<RunStepUpdateManyMutationInput, RunStepUncheckedUpdateManyInput>
    /**
     * Filter which RunSteps to update
     */
    where?: RunStepWhereInput
    /**
     * Limit how many RunSteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RunStep upsert
   */
  export type RunStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    /**
     * The filter to search for the RunStep to update in case it exists.
     */
    where: RunStepWhereUniqueInput
    /**
     * In case the RunStep found by the `where` argument doesn't exist, create a new RunStep with this data.
     */
    create: XOR<RunStepCreateInput, RunStepUncheckedCreateInput>
    /**
     * In case the RunStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RunStepUpdateInput, RunStepUncheckedUpdateInput>
  }

  /**
   * RunStep delete
   */
  export type RunStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
    /**
     * Filter which RunStep to delete.
     */
    where: RunStepWhereUniqueInput
  }

  /**
   * RunStep deleteMany
   */
  export type RunStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RunSteps to delete
     */
    where?: RunStepWhereInput
    /**
     * Limit how many RunSteps to delete.
     */
    limit?: number
  }

  /**
   * RunStep without action
   */
  export type RunStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunStep
     */
    select?: RunStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunStep
     */
    omit?: RunStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunStepInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DevUserScalarFieldEnum: {
    id: 'id',
    displayName: 'displayName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DevUserScalarFieldEnum = (typeof DevUserScalarFieldEnum)[keyof typeof DevUserScalarFieldEnum]


  export const RunSessionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    accentColor: 'accentColor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId'
  };

  export type RunSessionScalarFieldEnum = (typeof RunSessionScalarFieldEnum)[keyof typeof RunSessionScalarFieldEnum]


  export const RunStepScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    stepIndex: 'stepIndex',
    envState: 'envState',
    decision: 'decision',
    iterations: 'iterations',
    transition: 'transition',
    availableAction: 'availableAction',
    createdAt: 'createdAt'
  };

  export type RunStepScalarFieldEnum = (typeof RunStepScalarFieldEnum)[keyof typeof RunStepScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DevUserWhereInput = {
    AND?: DevUserWhereInput | DevUserWhereInput[]
    OR?: DevUserWhereInput[]
    NOT?: DevUserWhereInput | DevUserWhereInput[]
    id?: StringFilter<"DevUser"> | string
    displayName?: StringFilter<"DevUser"> | string
    createdAt?: DateTimeFilter<"DevUser"> | Date | string
    updatedAt?: DateTimeFilter<"DevUser"> | Date | string
    sessions?: RunSessionListRelationFilter
  }

  export type DevUserOrderByWithRelationInput = {
    id?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: RunSessionOrderByRelationAggregateInput
  }

  export type DevUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DevUserWhereInput | DevUserWhereInput[]
    OR?: DevUserWhereInput[]
    NOT?: DevUserWhereInput | DevUserWhereInput[]
    displayName?: StringFilter<"DevUser"> | string
    createdAt?: DateTimeFilter<"DevUser"> | Date | string
    updatedAt?: DateTimeFilter<"DevUser"> | Date | string
    sessions?: RunSessionListRelationFilter
  }, "id">

  export type DevUserOrderByWithAggregationInput = {
    id?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DevUserCountOrderByAggregateInput
    _max?: DevUserMaxOrderByAggregateInput
    _min?: DevUserMinOrderByAggregateInput
  }

  export type DevUserScalarWhereWithAggregatesInput = {
    AND?: DevUserScalarWhereWithAggregatesInput | DevUserScalarWhereWithAggregatesInput[]
    OR?: DevUserScalarWhereWithAggregatesInput[]
    NOT?: DevUserScalarWhereWithAggregatesInput | DevUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DevUser"> | string
    displayName?: StringWithAggregatesFilter<"DevUser"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DevUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DevUser"> | Date | string
  }

  export type RunSessionWhereInput = {
    AND?: RunSessionWhereInput | RunSessionWhereInput[]
    OR?: RunSessionWhereInput[]
    NOT?: RunSessionWhereInput | RunSessionWhereInput[]
    id?: StringFilter<"RunSession"> | string
    title?: StringFilter<"RunSession"> | string
    description?: StringNullableFilter<"RunSession"> | string | null
    status?: StringFilter<"RunSession"> | string
    accentColor?: StringFilter<"RunSession"> | string
    createdAt?: DateTimeFilter<"RunSession"> | Date | string
    updatedAt?: DateTimeFilter<"RunSession"> | Date | string
    ownerId?: StringNullableFilter<"RunSession"> | string | null
    owner?: XOR<DevUserNullableScalarRelationFilter, DevUserWhereInput> | null
    steps?: RunStepListRelationFilter
  }

  export type RunSessionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    accentColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    owner?: DevUserOrderByWithRelationInput
    steps?: RunStepOrderByRelationAggregateInput
  }

  export type RunSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RunSessionWhereInput | RunSessionWhereInput[]
    OR?: RunSessionWhereInput[]
    NOT?: RunSessionWhereInput | RunSessionWhereInput[]
    title?: StringFilter<"RunSession"> | string
    description?: StringNullableFilter<"RunSession"> | string | null
    status?: StringFilter<"RunSession"> | string
    accentColor?: StringFilter<"RunSession"> | string
    createdAt?: DateTimeFilter<"RunSession"> | Date | string
    updatedAt?: DateTimeFilter<"RunSession"> | Date | string
    ownerId?: StringNullableFilter<"RunSession"> | string | null
    owner?: XOR<DevUserNullableScalarRelationFilter, DevUserWhereInput> | null
    steps?: RunStepListRelationFilter
  }, "id">

  export type RunSessionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    accentColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    _count?: RunSessionCountOrderByAggregateInput
    _max?: RunSessionMaxOrderByAggregateInput
    _min?: RunSessionMinOrderByAggregateInput
  }

  export type RunSessionScalarWhereWithAggregatesInput = {
    AND?: RunSessionScalarWhereWithAggregatesInput | RunSessionScalarWhereWithAggregatesInput[]
    OR?: RunSessionScalarWhereWithAggregatesInput[]
    NOT?: RunSessionScalarWhereWithAggregatesInput | RunSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RunSession"> | string
    title?: StringWithAggregatesFilter<"RunSession"> | string
    description?: StringNullableWithAggregatesFilter<"RunSession"> | string | null
    status?: StringWithAggregatesFilter<"RunSession"> | string
    accentColor?: StringWithAggregatesFilter<"RunSession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RunSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RunSession"> | Date | string
    ownerId?: StringNullableWithAggregatesFilter<"RunSession"> | string | null
  }

  export type RunStepWhereInput = {
    AND?: RunStepWhereInput | RunStepWhereInput[]
    OR?: RunStepWhereInput[]
    NOT?: RunStepWhereInput | RunStepWhereInput[]
    id?: StringFilter<"RunStep"> | string
    sessionId?: StringFilter<"RunStep"> | string
    stepIndex?: IntFilter<"RunStep"> | number
    envState?: JsonFilter<"RunStep">
    decision?: JsonFilter<"RunStep">
    iterations?: JsonFilter<"RunStep">
    transition?: JsonFilter<"RunStep">
    availableAction?: JsonNullableFilter<"RunStep">
    createdAt?: DateTimeFilter<"RunStep"> | Date | string
    session?: XOR<RunSessionScalarRelationFilter, RunSessionWhereInput>
  }

  export type RunStepOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    stepIndex?: SortOrder
    envState?: SortOrder
    decision?: SortOrder
    iterations?: SortOrder
    transition?: SortOrder
    availableAction?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: RunSessionOrderByWithRelationInput
  }

  export type RunStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId_stepIndex?: RunStepSessionIdStepIndexCompoundUniqueInput
    AND?: RunStepWhereInput | RunStepWhereInput[]
    OR?: RunStepWhereInput[]
    NOT?: RunStepWhereInput | RunStepWhereInput[]
    sessionId?: StringFilter<"RunStep"> | string
    stepIndex?: IntFilter<"RunStep"> | number
    envState?: JsonFilter<"RunStep">
    decision?: JsonFilter<"RunStep">
    iterations?: JsonFilter<"RunStep">
    transition?: JsonFilter<"RunStep">
    availableAction?: JsonNullableFilter<"RunStep">
    createdAt?: DateTimeFilter<"RunStep"> | Date | string
    session?: XOR<RunSessionScalarRelationFilter, RunSessionWhereInput>
  }, "id" | "sessionId_stepIndex">

  export type RunStepOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    stepIndex?: SortOrder
    envState?: SortOrder
    decision?: SortOrder
    iterations?: SortOrder
    transition?: SortOrder
    availableAction?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RunStepCountOrderByAggregateInput
    _avg?: RunStepAvgOrderByAggregateInput
    _max?: RunStepMaxOrderByAggregateInput
    _min?: RunStepMinOrderByAggregateInput
    _sum?: RunStepSumOrderByAggregateInput
  }

  export type RunStepScalarWhereWithAggregatesInput = {
    AND?: RunStepScalarWhereWithAggregatesInput | RunStepScalarWhereWithAggregatesInput[]
    OR?: RunStepScalarWhereWithAggregatesInput[]
    NOT?: RunStepScalarWhereWithAggregatesInput | RunStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RunStep"> | string
    sessionId?: StringWithAggregatesFilter<"RunStep"> | string
    stepIndex?: IntWithAggregatesFilter<"RunStep"> | number
    envState?: JsonWithAggregatesFilter<"RunStep">
    decision?: JsonWithAggregatesFilter<"RunStep">
    iterations?: JsonWithAggregatesFilter<"RunStep">
    transition?: JsonWithAggregatesFilter<"RunStep">
    availableAction?: JsonNullableWithAggregatesFilter<"RunStep">
    createdAt?: DateTimeWithAggregatesFilter<"RunStep"> | Date | string
  }

  export type DevUserCreateInput = {
    id?: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: RunSessionCreateNestedManyWithoutOwnerInput
  }

  export type DevUserUncheckedCreateInput = {
    id?: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: RunSessionUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type DevUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: RunSessionUpdateManyWithoutOwnerNestedInput
  }

  export type DevUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: RunSessionUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type DevUserCreateManyInput = {
    id?: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DevUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DevUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunSessionCreateInput = {
    id?: string
    title: string
    description?: string | null
    status: string
    accentColor?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: DevUserCreateNestedOneWithoutSessionsInput
    steps?: RunStepCreateNestedManyWithoutSessionInput
  }

  export type RunSessionUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    status: string
    accentColor?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: string | null
    steps?: RunStepUncheckedCreateNestedManyWithoutSessionInput
  }

  export type RunSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: DevUserUpdateOneWithoutSessionsNestedInput
    steps?: RunStepUpdateManyWithoutSessionNestedInput
  }

  export type RunSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    steps?: RunStepUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type RunSessionCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    status: string
    accentColor?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: string | null
  }

  export type RunSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RunStepCreateInput = {
    id?: string
    stepIndex: number
    envState: JsonNullValueInput | InputJsonValue
    decision: JsonNullValueInput | InputJsonValue
    iterations: JsonNullValueInput | InputJsonValue
    transition: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    session: RunSessionCreateNestedOneWithoutStepsInput
  }

  export type RunStepUncheckedCreateInput = {
    id?: string
    sessionId: string
    stepIndex: number
    envState: JsonNullValueInput | InputJsonValue
    decision: JsonNullValueInput | InputJsonValue
    iterations: JsonNullValueInput | InputJsonValue
    transition: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunStepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepIndex?: IntFieldUpdateOperationsInput | number
    envState?: JsonNullValueInput | InputJsonValue
    decision?: JsonNullValueInput | InputJsonValue
    iterations?: JsonNullValueInput | InputJsonValue
    transition?: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: RunSessionUpdateOneRequiredWithoutStepsNestedInput
  }

  export type RunStepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    stepIndex?: IntFieldUpdateOperationsInput | number
    envState?: JsonNullValueInput | InputJsonValue
    decision?: JsonNullValueInput | InputJsonValue
    iterations?: JsonNullValueInput | InputJsonValue
    transition?: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunStepCreateManyInput = {
    id?: string
    sessionId: string
    stepIndex: number
    envState: JsonNullValueInput | InputJsonValue
    decision: JsonNullValueInput | InputJsonValue
    iterations: JsonNullValueInput | InputJsonValue
    transition: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunStepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepIndex?: IntFieldUpdateOperationsInput | number
    envState?: JsonNullValueInput | InputJsonValue
    decision?: JsonNullValueInput | InputJsonValue
    iterations?: JsonNullValueInput | InputJsonValue
    transition?: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunStepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    stepIndex?: IntFieldUpdateOperationsInput | number
    envState?: JsonNullValueInput | InputJsonValue
    decision?: JsonNullValueInput | InputJsonValue
    iterations?: JsonNullValueInput | InputJsonValue
    transition?: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RunSessionListRelationFilter = {
    every?: RunSessionWhereInput
    some?: RunSessionWhereInput
    none?: RunSessionWhereInput
  }

  export type RunSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DevUserCountOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DevUserMaxOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DevUserMinOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DevUserNullableScalarRelationFilter = {
    is?: DevUserWhereInput | null
    isNot?: DevUserWhereInput | null
  }

  export type RunStepListRelationFilter = {
    every?: RunStepWhereInput
    some?: RunStepWhereInput
    none?: RunStepWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RunStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RunSessionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    accentColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type RunSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    accentColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type RunSessionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    accentColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RunSessionScalarRelationFilter = {
    is?: RunSessionWhereInput
    isNot?: RunSessionWhereInput
  }

  export type RunStepSessionIdStepIndexCompoundUniqueInput = {
    sessionId: string
    stepIndex: number
  }

  export type RunStepCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    stepIndex?: SortOrder
    envState?: SortOrder
    decision?: SortOrder
    iterations?: SortOrder
    transition?: SortOrder
    availableAction?: SortOrder
    createdAt?: SortOrder
  }

  export type RunStepAvgOrderByAggregateInput = {
    stepIndex?: SortOrder
  }

  export type RunStepMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    stepIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type RunStepMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    stepIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type RunStepSumOrderByAggregateInput = {
    stepIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type RunSessionCreateNestedManyWithoutOwnerInput = {
    create?: XOR<RunSessionCreateWithoutOwnerInput, RunSessionUncheckedCreateWithoutOwnerInput> | RunSessionCreateWithoutOwnerInput[] | RunSessionUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RunSessionCreateOrConnectWithoutOwnerInput | RunSessionCreateOrConnectWithoutOwnerInput[]
    createMany?: RunSessionCreateManyOwnerInputEnvelope
    connect?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
  }

  export type RunSessionUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<RunSessionCreateWithoutOwnerInput, RunSessionUncheckedCreateWithoutOwnerInput> | RunSessionCreateWithoutOwnerInput[] | RunSessionUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RunSessionCreateOrConnectWithoutOwnerInput | RunSessionCreateOrConnectWithoutOwnerInput[]
    createMany?: RunSessionCreateManyOwnerInputEnvelope
    connect?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RunSessionUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<RunSessionCreateWithoutOwnerInput, RunSessionUncheckedCreateWithoutOwnerInput> | RunSessionCreateWithoutOwnerInput[] | RunSessionUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RunSessionCreateOrConnectWithoutOwnerInput | RunSessionCreateOrConnectWithoutOwnerInput[]
    upsert?: RunSessionUpsertWithWhereUniqueWithoutOwnerInput | RunSessionUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: RunSessionCreateManyOwnerInputEnvelope
    set?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
    disconnect?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
    delete?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
    connect?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
    update?: RunSessionUpdateWithWhereUniqueWithoutOwnerInput | RunSessionUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: RunSessionUpdateManyWithWhereWithoutOwnerInput | RunSessionUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: RunSessionScalarWhereInput | RunSessionScalarWhereInput[]
  }

  export type RunSessionUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<RunSessionCreateWithoutOwnerInput, RunSessionUncheckedCreateWithoutOwnerInput> | RunSessionCreateWithoutOwnerInput[] | RunSessionUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: RunSessionCreateOrConnectWithoutOwnerInput | RunSessionCreateOrConnectWithoutOwnerInput[]
    upsert?: RunSessionUpsertWithWhereUniqueWithoutOwnerInput | RunSessionUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: RunSessionCreateManyOwnerInputEnvelope
    set?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
    disconnect?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
    delete?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
    connect?: RunSessionWhereUniqueInput | RunSessionWhereUniqueInput[]
    update?: RunSessionUpdateWithWhereUniqueWithoutOwnerInput | RunSessionUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: RunSessionUpdateManyWithWhereWithoutOwnerInput | RunSessionUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: RunSessionScalarWhereInput | RunSessionScalarWhereInput[]
  }

  export type DevUserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<DevUserCreateWithoutSessionsInput, DevUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: DevUserCreateOrConnectWithoutSessionsInput
    connect?: DevUserWhereUniqueInput
  }

  export type RunStepCreateNestedManyWithoutSessionInput = {
    create?: XOR<RunStepCreateWithoutSessionInput, RunStepUncheckedCreateWithoutSessionInput> | RunStepCreateWithoutSessionInput[] | RunStepUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RunStepCreateOrConnectWithoutSessionInput | RunStepCreateOrConnectWithoutSessionInput[]
    createMany?: RunStepCreateManySessionInputEnvelope
    connect?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
  }

  export type RunStepUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<RunStepCreateWithoutSessionInput, RunStepUncheckedCreateWithoutSessionInput> | RunStepCreateWithoutSessionInput[] | RunStepUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RunStepCreateOrConnectWithoutSessionInput | RunStepCreateOrConnectWithoutSessionInput[]
    createMany?: RunStepCreateManySessionInputEnvelope
    connect?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DevUserUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<DevUserCreateWithoutSessionsInput, DevUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: DevUserCreateOrConnectWithoutSessionsInput
    upsert?: DevUserUpsertWithoutSessionsInput
    disconnect?: DevUserWhereInput | boolean
    delete?: DevUserWhereInput | boolean
    connect?: DevUserWhereUniqueInput
    update?: XOR<XOR<DevUserUpdateToOneWithWhereWithoutSessionsInput, DevUserUpdateWithoutSessionsInput>, DevUserUncheckedUpdateWithoutSessionsInput>
  }

  export type RunStepUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RunStepCreateWithoutSessionInput, RunStepUncheckedCreateWithoutSessionInput> | RunStepCreateWithoutSessionInput[] | RunStepUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RunStepCreateOrConnectWithoutSessionInput | RunStepCreateOrConnectWithoutSessionInput[]
    upsert?: RunStepUpsertWithWhereUniqueWithoutSessionInput | RunStepUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RunStepCreateManySessionInputEnvelope
    set?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
    disconnect?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
    delete?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
    connect?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
    update?: RunStepUpdateWithWhereUniqueWithoutSessionInput | RunStepUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RunStepUpdateManyWithWhereWithoutSessionInput | RunStepUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RunStepScalarWhereInput | RunStepScalarWhereInput[]
  }

  export type RunStepUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RunStepCreateWithoutSessionInput, RunStepUncheckedCreateWithoutSessionInput> | RunStepCreateWithoutSessionInput[] | RunStepUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RunStepCreateOrConnectWithoutSessionInput | RunStepCreateOrConnectWithoutSessionInput[]
    upsert?: RunStepUpsertWithWhereUniqueWithoutSessionInput | RunStepUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RunStepCreateManySessionInputEnvelope
    set?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
    disconnect?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
    delete?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
    connect?: RunStepWhereUniqueInput | RunStepWhereUniqueInput[]
    update?: RunStepUpdateWithWhereUniqueWithoutSessionInput | RunStepUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RunStepUpdateManyWithWhereWithoutSessionInput | RunStepUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RunStepScalarWhereInput | RunStepScalarWhereInput[]
  }

  export type RunSessionCreateNestedOneWithoutStepsInput = {
    create?: XOR<RunSessionCreateWithoutStepsInput, RunSessionUncheckedCreateWithoutStepsInput>
    connectOrCreate?: RunSessionCreateOrConnectWithoutStepsInput
    connect?: RunSessionWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RunSessionUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<RunSessionCreateWithoutStepsInput, RunSessionUncheckedCreateWithoutStepsInput>
    connectOrCreate?: RunSessionCreateOrConnectWithoutStepsInput
    upsert?: RunSessionUpsertWithoutStepsInput
    connect?: RunSessionWhereUniqueInput
    update?: XOR<XOR<RunSessionUpdateToOneWithWhereWithoutStepsInput, RunSessionUpdateWithoutStepsInput>, RunSessionUncheckedUpdateWithoutStepsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RunSessionCreateWithoutOwnerInput = {
    id?: string
    title: string
    description?: string | null
    status: string
    accentColor?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: RunStepCreateNestedManyWithoutSessionInput
  }

  export type RunSessionUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    description?: string | null
    status: string
    accentColor?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: RunStepUncheckedCreateNestedManyWithoutSessionInput
  }

  export type RunSessionCreateOrConnectWithoutOwnerInput = {
    where: RunSessionWhereUniqueInput
    create: XOR<RunSessionCreateWithoutOwnerInput, RunSessionUncheckedCreateWithoutOwnerInput>
  }

  export type RunSessionCreateManyOwnerInputEnvelope = {
    data: RunSessionCreateManyOwnerInput | RunSessionCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type RunSessionUpsertWithWhereUniqueWithoutOwnerInput = {
    where: RunSessionWhereUniqueInput
    update: XOR<RunSessionUpdateWithoutOwnerInput, RunSessionUncheckedUpdateWithoutOwnerInput>
    create: XOR<RunSessionCreateWithoutOwnerInput, RunSessionUncheckedCreateWithoutOwnerInput>
  }

  export type RunSessionUpdateWithWhereUniqueWithoutOwnerInput = {
    where: RunSessionWhereUniqueInput
    data: XOR<RunSessionUpdateWithoutOwnerInput, RunSessionUncheckedUpdateWithoutOwnerInput>
  }

  export type RunSessionUpdateManyWithWhereWithoutOwnerInput = {
    where: RunSessionScalarWhereInput
    data: XOR<RunSessionUpdateManyMutationInput, RunSessionUncheckedUpdateManyWithoutOwnerInput>
  }

  export type RunSessionScalarWhereInput = {
    AND?: RunSessionScalarWhereInput | RunSessionScalarWhereInput[]
    OR?: RunSessionScalarWhereInput[]
    NOT?: RunSessionScalarWhereInput | RunSessionScalarWhereInput[]
    id?: StringFilter<"RunSession"> | string
    title?: StringFilter<"RunSession"> | string
    description?: StringNullableFilter<"RunSession"> | string | null
    status?: StringFilter<"RunSession"> | string
    accentColor?: StringFilter<"RunSession"> | string
    createdAt?: DateTimeFilter<"RunSession"> | Date | string
    updatedAt?: DateTimeFilter<"RunSession"> | Date | string
    ownerId?: StringNullableFilter<"RunSession"> | string | null
  }

  export type DevUserCreateWithoutSessionsInput = {
    id?: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DevUserUncheckedCreateWithoutSessionsInput = {
    id?: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DevUserCreateOrConnectWithoutSessionsInput = {
    where: DevUserWhereUniqueInput
    create: XOR<DevUserCreateWithoutSessionsInput, DevUserUncheckedCreateWithoutSessionsInput>
  }

  export type RunStepCreateWithoutSessionInput = {
    id?: string
    stepIndex: number
    envState: JsonNullValueInput | InputJsonValue
    decision: JsonNullValueInput | InputJsonValue
    iterations: JsonNullValueInput | InputJsonValue
    transition: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunStepUncheckedCreateWithoutSessionInput = {
    id?: string
    stepIndex: number
    envState: JsonNullValueInput | InputJsonValue
    decision: JsonNullValueInput | InputJsonValue
    iterations: JsonNullValueInput | InputJsonValue
    transition: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunStepCreateOrConnectWithoutSessionInput = {
    where: RunStepWhereUniqueInput
    create: XOR<RunStepCreateWithoutSessionInput, RunStepUncheckedCreateWithoutSessionInput>
  }

  export type RunStepCreateManySessionInputEnvelope = {
    data: RunStepCreateManySessionInput | RunStepCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type DevUserUpsertWithoutSessionsInput = {
    update: XOR<DevUserUpdateWithoutSessionsInput, DevUserUncheckedUpdateWithoutSessionsInput>
    create: XOR<DevUserCreateWithoutSessionsInput, DevUserUncheckedCreateWithoutSessionsInput>
    where?: DevUserWhereInput
  }

  export type DevUserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: DevUserWhereInput
    data: XOR<DevUserUpdateWithoutSessionsInput, DevUserUncheckedUpdateWithoutSessionsInput>
  }

  export type DevUserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DevUserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunStepUpsertWithWhereUniqueWithoutSessionInput = {
    where: RunStepWhereUniqueInput
    update: XOR<RunStepUpdateWithoutSessionInput, RunStepUncheckedUpdateWithoutSessionInput>
    create: XOR<RunStepCreateWithoutSessionInput, RunStepUncheckedCreateWithoutSessionInput>
  }

  export type RunStepUpdateWithWhereUniqueWithoutSessionInput = {
    where: RunStepWhereUniqueInput
    data: XOR<RunStepUpdateWithoutSessionInput, RunStepUncheckedUpdateWithoutSessionInput>
  }

  export type RunStepUpdateManyWithWhereWithoutSessionInput = {
    where: RunStepScalarWhereInput
    data: XOR<RunStepUpdateManyMutationInput, RunStepUncheckedUpdateManyWithoutSessionInput>
  }

  export type RunStepScalarWhereInput = {
    AND?: RunStepScalarWhereInput | RunStepScalarWhereInput[]
    OR?: RunStepScalarWhereInput[]
    NOT?: RunStepScalarWhereInput | RunStepScalarWhereInput[]
    id?: StringFilter<"RunStep"> | string
    sessionId?: StringFilter<"RunStep"> | string
    stepIndex?: IntFilter<"RunStep"> | number
    envState?: JsonFilter<"RunStep">
    decision?: JsonFilter<"RunStep">
    iterations?: JsonFilter<"RunStep">
    transition?: JsonFilter<"RunStep">
    availableAction?: JsonNullableFilter<"RunStep">
    createdAt?: DateTimeFilter<"RunStep"> | Date | string
  }

  export type RunSessionCreateWithoutStepsInput = {
    id?: string
    title: string
    description?: string | null
    status: string
    accentColor?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: DevUserCreateNestedOneWithoutSessionsInput
  }

  export type RunSessionUncheckedCreateWithoutStepsInput = {
    id?: string
    title: string
    description?: string | null
    status: string
    accentColor?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: string | null
  }

  export type RunSessionCreateOrConnectWithoutStepsInput = {
    where: RunSessionWhereUniqueInput
    create: XOR<RunSessionCreateWithoutStepsInput, RunSessionUncheckedCreateWithoutStepsInput>
  }

  export type RunSessionUpsertWithoutStepsInput = {
    update: XOR<RunSessionUpdateWithoutStepsInput, RunSessionUncheckedUpdateWithoutStepsInput>
    create: XOR<RunSessionCreateWithoutStepsInput, RunSessionUncheckedCreateWithoutStepsInput>
    where?: RunSessionWhereInput
  }

  export type RunSessionUpdateToOneWithWhereWithoutStepsInput = {
    where?: RunSessionWhereInput
    data: XOR<RunSessionUpdateWithoutStepsInput, RunSessionUncheckedUpdateWithoutStepsInput>
  }

  export type RunSessionUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: DevUserUpdateOneWithoutSessionsNestedInput
  }

  export type RunSessionUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RunSessionCreateManyOwnerInput = {
    id?: string
    title: string
    description?: string | null
    status: string
    accentColor?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RunSessionUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: RunStepUpdateManyWithoutSessionNestedInput
  }

  export type RunSessionUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: RunStepUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type RunSessionUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunStepCreateManySessionInput = {
    id?: string
    stepIndex: number
    envState: JsonNullValueInput | InputJsonValue
    decision: JsonNullValueInput | InputJsonValue
    iterations: JsonNullValueInput | InputJsonValue
    transition: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunStepUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepIndex?: IntFieldUpdateOperationsInput | number
    envState?: JsonNullValueInput | InputJsonValue
    decision?: JsonNullValueInput | InputJsonValue
    iterations?: JsonNullValueInput | InputJsonValue
    transition?: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunStepUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepIndex?: IntFieldUpdateOperationsInput | number
    envState?: JsonNullValueInput | InputJsonValue
    decision?: JsonNullValueInput | InputJsonValue
    iterations?: JsonNullValueInput | InputJsonValue
    transition?: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunStepUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepIndex?: IntFieldUpdateOperationsInput | number
    envState?: JsonNullValueInput | InputJsonValue
    decision?: JsonNullValueInput | InputJsonValue
    iterations?: JsonNullValueInput | InputJsonValue
    transition?: JsonNullValueInput | InputJsonValue
    availableAction?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}