declare type Extension = (param1: any, param2: any) => any;
interface IConfig {
    extensions: Extension[];
}
/**
 * Merge anything recursively.
 * Objects get merged, special objects (classes etc.) are re-assigned "as is".
 * Basic types overwrite objects or other basic types.
 *
 * @param {(IConfig | any)} origin
 * @param {...any[]} newComers
 * @returns the result
 */
export default function merge(origin: IConfig | any, ...newComers: any[]): any;
export {};
