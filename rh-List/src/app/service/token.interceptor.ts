import { HttpInterceptorFn } from '@angular/common/http';
import { timeout } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let myToken = '';
  if (typeof localStorage !== 'undefined') {
    myToken = localStorage.getItem('loginToken') || '';
  }
  const TIMEOUT = 6000000;

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  return next(cloneRequest).pipe(timeout(TIMEOUT));
};
