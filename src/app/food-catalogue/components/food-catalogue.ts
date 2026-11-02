import { Component, inject, OnInit, input, signal } from '@angular/core';
import { FoodCataloguePage } from '../../shared/model/foodcataloguepage';
import { FoodItemDTO } from '../../shared/model/fooditem';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem-service';
import { RestaurantDTO } from '../../shared/model/restaurant';


@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.html',
  styleUrl: './food-catalogue.css',
})
export class FoodCatalogue implements OnInit {
  restaurantId: number;
  foodItemCart: FoodItemDTO[] = [];
  orderSummary: FoodCataloguePage;
  restaurantDTO: RestaurantDTO;

  item = signal<FoodCataloguePage | null>(null);
  foodItemList = signal<FoodItemDTO[]>([]);
  isLoadingItemList = signal<boolean>(true);
  
  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +(params.get('id') ?? 0);
      this.getFoodItemsByRestaurant(this.restaurantId);
      this.getFoodItemsList(this.restaurantId);
    });
  }

  getFoodItemsByRestaurant(restaurant: number) {
    this.foodItemService.getFoodItemsByRestaurant(restaurant).subscribe({
      next: (data) => {
        this.item.set(data);
      },
      error: (err) => {
        console.error('Error fetching data from backend', err);
      }
    })
  }

  getFoodItemsList(restaurant: number) {
    this.foodItemService.getFoodItemsListByRestaurant(restaurant).subscribe({
      next: (data) => {
        this.foodItemList.set(data);
        this.isLoadingItemList.set(false);
      },
      error: (err) => {
        console.error('Error fetching data from backend', err);
      }
    });
  }

  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index =  this.foodItemCart.findIndex(item => item.id === food.id);
      //if the quantity == 0, remove the item from the array using splice()
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }
    }
  }

  onCheckOut() {
    this.foodItemCart;
    this.orderSummary = {
      foodItemsList: [],
      restaurantDTO: null as any
    };

    this.orderSummary.foodItemsList = this.foodItemCart;
    this.orderSummary.restaurantDTO = this.item()?.restaurantDTO ?? (null as any);
    //turning a Java object to a string and display the text parameter when the page loads
    this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary)}});
  }
}


