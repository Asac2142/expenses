import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, of } from 'rxjs';

import { Expense } from '../models/expense.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private _storage!: Storage;
  private readonly _expenseKey = 'expenses';

  constructor(private storage: Storage) {
    this.initStorage();
  }

  createExpense(expense: Partial<Expense>): Observable<Expense> {
    const id = uuidv4();

    return from(
      this.getExpensesFromStorage().then(expenses => {
        expense.id = id;
        expenses.push(expense as Expense);
        this.setExpense(expenses);
        return expense as Expense;
      })
    );
  }

  private async setExpense(expenses: Expense[]): Promise<void> {
    this._storage.set(this._expenseKey, expenses);
  }

  private async getExpensesFromStorage(): Promise<Expense[]> {
    const expenses = (await this._storage.get(this._expenseKey)) as Expense[];
    return expenses;
  }

  private async initStorage(): Promise<void> {
    this._storage = await this.storage.create();
  }
}
