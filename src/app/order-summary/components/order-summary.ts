import { Component, signal } from '@angular/core';
import { OrderDTOFromFE } from '../model/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order-service';
import { FoodCataloguePage } from '../../shared/model/foodcataloguepage';

@Component({
  selector: 'app-order-summary',
  imports: [],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary {
  orderSummary?: OrderDTOFromFE;
  obj: FoodCataloguePage | any;
  total?: any;
  showDialog = signal(false);

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    //data from the food-catalogue router.navigate['/orderSummary'], orderSummary: foodCataloguePage
    const data = this.route.snapshot.queryParams['data'];
    this.obj = JSON.parse(data);
    this.obj.userId = 1;
    this.orderSummary = this.obj;

    this.total = this.orderSummary?.foodItemsList?.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.quantity * currentValue.price!);
    }, 0);
  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary)
    .subscribe({
      next: response => {this.showDialog.set(true)},
      error: error => {console.error('Failed to save data: ', error)}
    });
  }

  closeDialog() {
    this.showDialog.set(false);
    this.router.navigate(['/']); // Replace '/home' with the actual route for your home page
  }
}
