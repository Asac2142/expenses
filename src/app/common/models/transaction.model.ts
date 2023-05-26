import { FormControl } from '@angular/forms';

export type TransactionType = 'expense' | 'income';
export type CategoryColor = 'success' | 'danger';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  dateRegistered: string;
  description: string;
  category: Category;
}

export interface CategoryGroup {
  transactions: Transaction[];
  total: number;
  category: Category;
}

export interface TransactionForm {
  category: FormControl<Category | null>;
  type: FormControl<TransactionType | null>;
  description: FormControl<string | null>;
  date: FormControl<string | null>;
  amount: FormControl<number | null>;
}

export interface Category {
  id: string;
  type: TransactionType;
  iconName: string;
  label: string;
  color: CategoryColor;
  svgContent?: string;
}

export interface Icon {
  name: string;
  svg: string;
}

export interface Balance {
  expense: number;
  income: number;
  total: number;
}
