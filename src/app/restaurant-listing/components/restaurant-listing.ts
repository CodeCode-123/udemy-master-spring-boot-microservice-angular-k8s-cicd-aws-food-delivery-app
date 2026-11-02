import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { RestaurantDTO } from '../../shared/model/restaurant';
import { RestaurantService } from '../service/restaurant-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.html',
  styleUrl: './restaurant-listing.css',
  imports: [],
})
export class RestaurantListing implements OnInit {
  private router = inject(Router);
  private restaurantService = inject(RestaurantService);
  http = inject(HttpClient);
  items = signal<RestaurantDTO[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.getAllRestaurants();
  }
  //constructor(private router: Router, private restaurantService: RestaurantService) { }

  getAllRestaurants() {
    this.isLoading.set(true);
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Error fetching data from backend', err);
      }
    })
  }

  addItem(newItem: any) {
    this.items.update(currentItems => [...currentItems, newItem]);
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomImage(): string {
    const imageCount = 8; // Adjust this number based on the number of images in your asset folder
    const randomIndex = this.getRandomNumber(1, imageCount);
    return `${randomIndex}.jpg`; // Replace with your image filename pattern
  }

  onButtonClick(id: number) {
    this.router.navigate(['/food-catalogue', id]);
  }
}
