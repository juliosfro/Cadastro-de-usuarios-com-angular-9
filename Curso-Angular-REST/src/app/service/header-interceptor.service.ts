import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/* A cada requisicao este interceptador sera chamado para colocar o token junto. */
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem("token") !== null) {
      const token = "Bearer " + localStorage.getItem("token");
      const tokenRequest = req.clone({
        headers: req.headers.set("Authorization", token)
      });
      return next.handle(tokenRequest).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
          //console.info("Sucesso na operação.");
          //window.alert("Sucesso na operação.");
        }
      }), catchError(this.processError));
    } else {
      return next.handle(req).pipe(catchError(this.processError));
    }
  }

  processError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = "Erro desconhecido.";
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;
    } else {
      errorMessage = 'Código: ' + error.error.code + '\nMessage: ' + error.error.message;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}


@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },],
})

export class HttpInterceptorModule {

}