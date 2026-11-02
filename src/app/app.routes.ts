import { Routes } from '@angular/router';
import { RestaurantListing } from './restaurant-listing/components/restaurant-listing';
import { FoodCatalogue } from './food-catalogue/components/food-catalogue';
import { OrderSummary } from './order-summary/components/order-summary';

export const routes: Routes = [
    { path: '', redirectTo: 'restaurant-listing', pathMatch: 'full' },
    { path: '', component: RestaurantListing},
    { path: 'home', component: RestaurantListing},
    { path: 'food-catalogue/:id', component: FoodCatalogue },
    { path: 'orderSummary', component: OrderSummary }
];
