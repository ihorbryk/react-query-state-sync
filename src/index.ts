import React from "react";
import { useHistory, useLocation } from "react-router-dom";

type SettersKeys<Type> = {
  [Property in keyof Type as `set_${string & Property}`]: Type[Property];
};

export interface IUseQueryStateResult<Type> {
  queryParams: Type;
  querySetters: Record<keyof SettersKeys<Type>, (value: string) => void>;
}

export const useQueryStateSync = <T extends Record<keyof T, string>>(
  parameters: T
): IUseQueryStateResult<T> => {
  const history = useHistory();

  const currentQString = useLocation().search;
  const query = new URLSearchParams(currentQString);

  (Object.keys(parameters) as Array<keyof T>).forEach((key: keyof T) => {
    const p = query.get(String(key));
    if (p) {
      parameters[key] = p as T[keyof T];
    }
  });

  const [queryParams, setQueryParams] = React.useState(parameters);

  (Object.keys(parameters) as Array<keyof T>).forEach((key: keyof T) => {
    if (
      queryParams[key] !== "" &&
      queryParams[key] !== undefined &&
      queryParams[key] !== "undefined" &&
      queryParams[key] != null &&
      queryParams[key] !== "null"
    ) {
      query.set(String(key), queryParams[key]);
    } else {
      query.delete(String(key));
    }
  });

  const nextQString = query.toString();

  React.useEffect(() => {
    if (currentQString !== "?" + nextQString) {
      history.push({ search: query.toString() });
    }
  }, [currentQString, nextQString]);

  const querySetters = (Object.keys(queryParams) as Array<keyof T>).reduce(
    (acc: Record<keyof SettersKeys<T>, (value: string) => void>, key) => {
      acc[("set_" + key) as keyof SettersKeys<T>] = (value: string) => {
        setQueryParams((prev: typeof queryParams) => {
          return {
            ...prev,
            [key]: value,
          };
        });
      };

      return acc;
    },
    {} as Record<keyof SettersKeys<T>, (value: string) => void>
  );

  return { queryParams, querySetters };
};
