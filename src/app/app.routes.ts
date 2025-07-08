import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseAddEditComponent } from './expense-add-edit/expense-add-edit.component';
import { ExpenseGridComponent } from './expense-grid/expense-grid.component';
export const routes: Routes = [
    {path:'add-expense',component: ExpenseAddEditComponent},
    {path:'dashboard',component:ExpenseGridComponent},
    {path:"list",component:ExpenseListComponent},
];
