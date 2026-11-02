import { Injectable, inject } from "@angular/core";
//import { K8ExternalIp } from "../../constants/url";
import { API_URL_FC } from "../../constants/url";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { FoodCataloguePage } from "../../shared/model/foodcataloguepage";
import { FoodItemDTO } from "../../shared/model/fooditem";


@Injectable({
    providedIn: 'root'
})
export class FoodItemService {
    // private apiUrl = K8ExternalIp + '/foodCatalogue/fetchRestaurantAndFoodItemsById/';
    // private apiFoodsUrl = K8ExternalIp + '/foodCatalogue/fetchFoodItemListByRestaurantId/';

    private apiUrl = API_URL_FC + '/foodCatalogue/fetchRestaurantAndFoodItemsById/';
    private apiFoodsUrl = API_URL_FC + '/foodCatalogue/fetchFoodItemListByRestaurantId/';

    //constructor(private http: HttpClient) { }
    private http = inject(HttpClient);

    //fetch data from the backend, RxJS stream
    getFoodItemsByRestaurant(id: number): Observable<FoodCataloguePage> {
        return this.http.get<FoodCataloguePage>(`${this.apiUrl+id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    getFoodItemsListByRestaurant(id: number): Observable<FoodItemDTO[]> {
        return this.http.get<FoodItemDTO[]>(`${this.apiFoodsUrl+id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('An error occurred: ', error);
        return throwError(() => new Error(error.message || error));
    }

}
