import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { WebinarService } from '../../_services/webinar.service';
import { switchMap } from 'rxjs/operators';
import { Webinar } from '../../_models/webinar';


export const WEBINAR_INFO = new InjectionToken<Observable<Webinar>>(
  'A stream with current webinar information',
);

export const WEBINAR_PROVIDERS: Provider[] = [
    {
      provide: WEBINAR_INFO,
      deps: [ActivatedRoute, WebinarService],
      useFactory: webinarFactory,
    },
];

export function webinarFactory(
  route: ActivatedRoute,
  webinarService: WebinarService,
): Observable<Webinar> {
  // return route.paramMap.subscribe(
  //   (params: ParamMap) => {
  //     const id = params.get('id');
  //   }
  // );
  const params = route.params;

  return params.pipe(
    switchMap((param) => {
      console.log(route);
      console.log(param);
      const id = param.getAll('id');

      return webinarService.getWebinarById(id);
    }),
  );
}
