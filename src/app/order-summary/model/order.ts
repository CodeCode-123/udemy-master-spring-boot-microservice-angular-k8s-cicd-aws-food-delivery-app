import {FoodItemDTO} from '../../shared/model/fooditem';
import {RestaurantDTO} from '../../shared/model/restaurant';

export interface OrderDTOFromFE {
    foodItemsList?: FoodItemDTO[];
    userId?: number;
    restaurantDTO?: RestaurantDTO;
}