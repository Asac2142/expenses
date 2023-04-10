import { FormControl } from "@angular/forms";

export type Category = 'Shopping' | 'Medicine' | 'Pets' | 'Food' | 'Enterntaintment';
export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  dateRegistered: Date;
  description: string;
  category: Category;
}

export interface TransactionForm {
  category: FormControl<Category | null>;
  type: FormControl<TransactionType | null>;
  description: FormControl<string | null>;
  date: FormControl<string | null>;
  amount: FormControl<number | null>;
}
