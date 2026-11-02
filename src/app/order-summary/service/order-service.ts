import { Injectable, inject } from "@angular/core";
//import { K8ExternalIp } from "../../constants/url";
import { API_URL_ORDER } from "../../constants/url";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { OrderDTOFromFE } from "../model/order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    // private apiUrl = K8ExternalIp+'/order/saveOrder';

    private apiUrl = API_URL_ORDER+'/order/saveOrder';

    //constructor(private http: HttpClient) { }
    http = inject(HttpClient);

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': 'http://localhost:4200' // Replace with your Angular app URL
        })
    };

    saveOrder(data: any): Observable<OrderDTOFromFE> {
        return this.http.post<OrderDTOFromFE>(this.apiUrl, data);
    }

    private handleError(error: any) {
        console.error('An error occurred: ', error);
        return throwError(() => Error(error.message || error));
    }
}