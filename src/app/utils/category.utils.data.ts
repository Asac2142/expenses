import { Category } from '../models/transaction.model';
import { format } from 'date-fns';

export const categoryData: Category[] = [
  { iconName: '', label: 'Medicine', type: 'expense' },
  { iconName: '', label: 'Bills', type: 'expense' },
  { iconName: '', label: 'Car', type: 'expense' },
  { iconName: '', label: 'Clothing', type: 'expense' },
  { iconName: '', label: 'Education', type: 'expense' },
  { iconName: '', label: 'Electronics', type: 'expense' },
  { iconName: '', label: 'Entertainment', type: 'expense' },
  { iconName: '', label: 'Food', type: 'expense' },
  { iconName: '', label: 'Health', type: 'expense' },
  { iconName: '', label: 'Home', type: 'expense' },
  { iconName: '', label: 'Insurance', type: 'expense' },
  { iconName: '', label: 'Pet', type: 'expense' },
  { iconName: '', label: 'Shopping', type: 'expense' },
  { iconName: '', label: 'Social', type: 'expense' },
  { iconName: '', label: 'Sport', type: 'expense' },
  { iconName: '', label: 'Taxes', type: 'expense' },
  { iconName: '', label: 'Telephone', type: 'expense' },
  { iconName: '', label: 'Transportation', type: 'expense' },
  { iconName: '', label: 'Gym', type: 'expense' },
  { iconName: '', label: 'Salary', type: 'income' },
  { iconName: '', label: 'Investment', type: 'income' },
  { iconName: '', label: 'Sale', type: 'income' },
  { iconName: '', label: 'Rental', type: 'income' },
  { iconName: '', label: 'Utility', type: 'income' }
];

export function formatDate(date: string, formatDesired: string = 'yyyy-MM-dd') {
  return format(new Date(date.replace(/-/g, '/')), formatDesired);
}
