import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from } from 'rxjs';

import { Transaction } from '../models/transaction.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private _storage!: Storage;
  private readonly _transactionKey = 'transactions';

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
