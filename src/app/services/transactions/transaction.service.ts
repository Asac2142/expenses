import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { TransactionState } from '@store/transaction/transaction.reducer';
import { Transaction, Category } from 'src/app/common/models/transaction.model';
import { categoryData, getValidTransactions } from 'src/app/common/utils/category.utils.data';

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

  setState({ categories, transaction }: TransactionState): Observable<boolean> {
    const _transactions = getValidTransactions(transaction);
    this.setCategories(categories);
    this.setTransaction(_transactions);

    return of(true);
  }

  eraseAllData(): Observable<boolean> {
    this.eraseEverything();
    return of(true);
  }

  createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    const id = uuidv4();
    const transactionAdded: Transaction = { ...transaction, id } as Transaction;

    return from(
      this.getTransactions().then(transactions => {
        transactions.push(transactionAdded as Transaction);
        this.setTransaction(transactions);
        return transactionAdded;
      })
    );
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return from(
      this.getTransactions().then(transactions => {
        const index = transactions.findIndex(t => t.id === transaction.id);
        transactions[index] = { ...transaction };
        this.setTransaction(transactions);
        return transaction;
      })
    );
  }

  deleteTransaction(id: string): Observable<string> {
    return from(
      this.getTransactions().then(transactions => {
        const removed = transactions.filter(t => t.id !== id);
        this.setTransaction(removed);
        return id;
      })
    );
  }

  getCategoriesFromStorage(): Observable<Category[] | undefined> {
    return from(this.getCategories());
  }

  getTransactionsFromStorage(): Observable<Transaction[]> {
    return from(this.getTransactions());
  }

  addCategory(newCategory: Category, categories: Category[]): Observable<Category[]> {
    const copy = [...categories];
    copy.unshift(newCategory);
    this.setCategories(copy);
    return of([...copy]);
  }

  private async eraseEverything(): Promise<void> {
    await this._storage.clear();
  }

  private async setCategories(categories: Category[]): Promise<void> {
    await this._storage.set(this._categoriesKey, categories);
  }

  private async getCategories(): Promise<Category[]> {
    const existCategories = (await this._storage.get(this._categoriesKey)) as Category[] | undefined;

    if (existCategories?.length) return existCategories;
    else {
      this.setCategories(categoryData);
      return categoryData;
    }
  }

  private async setTransaction(transactions: Transaction[]): Promise<void> {
    this._storage.set(this._transactionKey, transactions);
  }

  private async getTransactions(): Promise<Transaction[]> {
    const transactions = (await this._storage.get(this._transactionKey)) as Transaction[];
    return transactions?.length ? transactions : [];
  }

  private async initStorage(): Promise<void> {
    this._storage = await this.storage.create();
  }
}
