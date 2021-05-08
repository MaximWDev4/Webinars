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
  {params}: ActivatedRoute,
  webinarService: WebinarService,
): Observable<Webinar> {
  return params.pipe(
    switchMap((param: ParamMap) => {
      const id = param.get('id');

      return webinarService.getWebinarByName$(id);
    }),
  );
}
