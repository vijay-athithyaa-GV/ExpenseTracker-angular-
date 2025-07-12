import { Component, effect, inject, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '../models/expense.model';
import { ɵEmptyOutletComponent } from "../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-expense-grid',
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, MatButtonModule, MatCardModule,RouterModule],
  templateUrl: './expense-grid.component.html',
  styleUrl: './expense-grid.component.css'
})
export class ExpenseGridComponent {
  expenseService  = inject(ExpensesService);
  snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['id','title','category','amount','date','actions'];
  dataSource = new MatTableDataSource<Expense>([]);
  totalItems :number = 0;
  pageSize:number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  expenses = this.expenseService.expenses;
  
  constructor(){
    this.expenseService.getExpenses();
    //every time expenses change, update the data source
    effect(()=>{
      const expenses = this.expenses();
      this.dataSource.data = expenses;
      console.log(this.dataSource);
      this.totalItems = expenses.length;
    })
  }
 onPageChange(event: any) {
  this.pageSize = event.pageSize;
  this.dataSource.paginator = this.paginator
  }
}
