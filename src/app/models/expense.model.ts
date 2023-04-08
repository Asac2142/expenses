export type ExpenseCategory = 'Shopping' | 'Medicine' | 'Pets' | 'Food' | 'Enterntaintment';

export interface Expense {
  id: string;
  expense: number;
  income: number;
  total: number;
  dateRegistered: Date;
  description: string;
  category: ExpenseCategory;
}
