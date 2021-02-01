import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError(error => {
            // If error 401 throw status test of error back to components
            if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
                return throwError(error.statusText);
            }
            // If error of type 500
            if (Error instanceof HttpErrorResponse) {
              const applicationError = error.headers.get('Application-Error');
              if (applicationError) {
                return throwError(applicationError);
              }
            }
            // ModelState errors
            const serverError = error.error;

            let modelStateErrors = '';
            // If there are errors in the resp and within the error object 
            // And if the error is a type of server error
            if (serverError.errors && typeof serverError.errors === 'object') {
              // Loop through the keys of the array within the errors object
              for (const key in serverError.errors) {
                if (serverError.errors[key]) {
                  // build up a list of strings of modelstate errors
                  modelStateErrors += serverError.errors[key] + '\n';
                }
              }
            }
            return throwError(modelStateErrors || serverError || 'Server Error');
            }
        })
    );
  }
}
// Registering a new interceptor provider to the Angular HTTP Interceptor
// Array of providers
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
