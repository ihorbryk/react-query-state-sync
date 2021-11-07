declare type SettersKeys<Type> = {
    [Property in keyof Type as `set_${string & Property}`]: Type[Property];
};
export interface IUseQueryStateResult<Type> {
    queryParams: Type;
    querySetters: Record<keyof SettersKeys<Type>, (value: string) => void>;
}
export declare const useQueryStateSync: <T extends Record<keyof T, string>>(parameters: T) => IUseQueryStateResult<T>;
export {};
