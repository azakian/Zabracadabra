import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

export function injectRouteParam(paramName: string): Signal<string | undefined>;
export function injectRouteParam<T>(
  paramName: string,
  parse: (value: string) => T,
): Signal<T | undefined>;
export function injectRouteParam<T = string>(
  paramName: string,
  parse?: (value: string) => T,
): Signal<T | undefined> {
  const route = inject(ActivatedRoute);

  return toSignal(
    route.paramMap.pipe(
      map((params) => {
        const value = params.get(paramName);
        if (value === null) return undefined;
        return parse ? parse(value) : (value as T);
      }),
    ),
  );
}
