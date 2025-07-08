import { Injectable,signal} from '@angular/core';
import { Expense } from '../models/expense.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private expenseSignal = signal<Expense[]>([]);


  constructor(private http:HttpClient) {}

  getExpenses() {//signals are private...
    this.http.get<Expense[]>('http://localhost:3000/expenses')
    .subscribe(expenses => this.expenseSignal.set(expenses));
    }
    get expenses() {
      return this.expenseSignal;
    }
//add expense...
    addExpense(expense: Expense) {
      this.http.post('http://localhost:3000/expenses',expense)
      .subscribe(()=>{this.getExpenses()});
    }
//delete expense..
    deleteExpense(id: number) {
      this.http.delete(`http://localhost:3000/expenses/${id}`)
      .subscribe(()=>{this.getExpenses()});
    }
//update expense...
    updateExpense(id:string,updatedExpense:Expense) {
      this.http.put(`http://localhost:3000/expenses/${id}`,updatedExpense)
      .subscribe(() => {this.getExpenses()});
    }
  //getExpenseById...
    getExpenseById(id: number){
      return this.expenseSignal().find(expense => expense.id === id);
    }
}