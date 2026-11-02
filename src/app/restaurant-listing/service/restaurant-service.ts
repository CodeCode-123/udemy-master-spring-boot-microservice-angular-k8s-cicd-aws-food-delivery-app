import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
//import { K8ExternalIp } from '../../constants/url';
import { API_URL_RL } from '../../constants/url';
import { RestaurantDTO } from '../../shared/model/restaurant';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    // private apiUrl = K8ExternalIp + '/restaurant/fetchAllRestaurants';
    
    private apiUrl = API_URL_RL + '/restaurant/fetchAllRestaurants';
    
    constructor(private http: HttpClient) { }

    //fetch data from the backend, RxJS stream
    getAllRestaurants(): Observable<RestaurantDTO[]> {
        return this.http.get<RestaurantDTO[]>(`${this.apiUrl}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error(error.message || error));
    }
}
