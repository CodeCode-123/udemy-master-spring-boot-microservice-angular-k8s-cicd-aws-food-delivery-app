import { RestaurantDTO } from "./restaurant";
import { FoodItemDTO } from "./fooditem";

export interface FoodCataloguePage {
    foodItemsList: FoodItemDTO[];
    restaurantDTO: RestaurantDTO;
}