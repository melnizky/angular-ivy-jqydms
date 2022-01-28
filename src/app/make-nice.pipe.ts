import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'makeNice',
})
export class MakeNicePipe implements PipeTransform {
  transform(n: number, digits: number = 0): string {
    return makeNiceFn(n, digits);
  }
}

export function makeNiceFn(n: number, digits: number = 0): string {
  if (!n) {
    return (0).toFixed(digits);
  }

  if (n >= 1_000_000_000) {
    return (n / 1_000_000_000).toFixed(digits) + 'bil';
  }

  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(digits) + 'mil';
  }

  if (n >= 1_000) {
    return (n / 1_000).toFixed(digits) + 'k';
  }

  return n.toFixed(digits);
}
