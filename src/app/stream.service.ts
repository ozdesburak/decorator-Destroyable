import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  hot1$ = interval(1000).pipe(map(i => `Hot 1 : ${i}`));
  hot2$ = interval(1500).pipe(map(i => `Hot 2 : ${i}`));
}
