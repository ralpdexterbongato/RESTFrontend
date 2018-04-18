import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { TokenService } from './services/token.service';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
constructor(private token:TokenService) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

console.log("intercepted request ... ");

// Clone the request to add the new header.
const authReq = req.clone({ headers: req.headers.set("Authorization", "Bearer "+this.token.get())});

console.log("Sending request with new header now ...");

//send the newly created request
return next.handle(authReq)
.catch((error, caught) => {
//intercept the respons error and displace it to the console
console.log("Error Occurred");
console.log(error);
//return the error to the method that called it
return Observable.throw(error);
}) as any;
}
}
