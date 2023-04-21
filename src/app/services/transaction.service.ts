import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, of } from 'rxjs';

import { Category, Transaction } from '../common/models/transaction.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private _storage!: Storage;
  private readonly _transactionKey = 'transactions';
  private readonly _categoriesKey = 'categories';

  constructor(private storage: Storage) {
    this.initStorage();
  }

  createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    const id = uuidv4();

    return from(
      this.getTransactionsFromStorage().then(transactions => {
        transaction.id = id;
        transactions.push(transaction as Transaction);
        this.setTransaction(transactions);
        return transaction as Transaction;
      })
    );
  }

  getCategoriesFromStorage(): Observable<Category[] | undefined> {
    return from(this.getCategories());
  }

  addCategory(newCategory: Category, categories: Category[]): Observable<Category[]> {
    const copy = [...categories];
    copy.push(newCategory);
    this.setCategory(copy);
    return of([...copy]);
  }

  private async setCategory(categories: Category[]): Promise<void> {
    await this._storage.set(this._categoriesKey, categories);
  }

  private async getCategories(): Promise<Category[] | undefined> {
    return await this._storage.get(this._categoriesKey);
  }

  private async setTransaction(transactions: Transaction[]): Promise<void> {
    this._storage.set(this._transactionKey, transactions);
  }

  private async getTransactionsFromStorage(): Promise<Transaction[]> {
    const transactions = (await this._storage.get(this._transactionKey)) as Transaction[];
    return transactions;
  }

  private async initStorage(): Promise<void> {
    this._storage = await this.storage.create();
  }
}
