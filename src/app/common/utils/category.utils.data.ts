import { format, startOfMonth, endOfMonth, addDays } from 'date-fns';
import { Category } from '../models/transaction.model';

export const categoryData: Category[] = [
  { color: 'danger', iconName: 'medkit', label: 'Medicine', type: 'expense' },
  { color: 'danger', iconName: 'newspaper', label: 'Bills', type: 'expense' },
  { color: 'danger', iconName: 'car-sport', label: 'Car', type: 'expense' },
  { color: 'danger', iconName: 'shirt', label: 'Clothing', type: 'expense' },
  { color: 'danger', iconName: 'school', label: 'Education', type: 'expense' },
  { color: 'danger', iconName: 'flash', label: 'Electronics', type: 'expense' },
  { color: 'danger', iconName: 'wine', label: 'Entertainment', type: 'expense' },
  { color: 'danger', iconName: 'fast-food', label: 'Food', type: 'expense' },
  { color: 'danger', iconName: 'fitness', label: 'Health', type: 'expense' },
  { color: 'danger', iconName: 'home', label: 'Home', type: 'expense' },
  { color: 'danger', iconName: 'lock-closed', label: 'Insurance', type: 'expense' },
  { color: 'danger', iconName: 'paw', label: 'Pet', type: 'expense' },
  { color: 'danger', iconName: 'journal', label: 'Shopping', type: 'expense' },
  { color: 'danger', iconName: 'people', label: 'Social', type: 'expense' },
  { color: 'danger', iconName: 'tennisball', label: 'Sport', type: 'expense' },
  { color: 'danger', iconName: 'journal', label: 'Taxes', type: 'expense' },
  { color: 'danger', iconName: 'phone-portrait', label: 'Telephone', type: 'expense' },
  { color: 'danger', iconName: 'bus', label: 'Transportation', type: 'expense' },
  { color: 'danger', iconName: 'barbell', label: 'Gym', type: 'expense' },
  { color: 'success', iconName: 'cash', label: 'Salary', type: 'income' },
  { color: 'success', iconName: 'diamond', label: 'Investment', type: 'income' },
  { color: 'success', iconName: 'bag-add', label: 'Sale', type: 'income' },
  { color: 'success', iconName: 'logo-usd', label: 'Rental', type: 'income' },
  { color: 'success', iconName: 'wallet', label: 'Utility', type: 'income' }
];

export function formatIonDate(date: string, formatDesired: string = 'yyyy-MM-dd') {
  return format(new Date(date.replace(/-/g, '/')), formatDesired);
}
export function formatDate(date: Date, formatDesired: string = 'yyyy/MM/dd') {
  return format(date, formatDesired);
}

export function getStartOfMonth(date: Date): Date {
  return startOfMonth(date);
}

export function getEndOfMonth(date: Date): Date {
  return endOfMonth(date);
}

export function addDaysToDate(date: Date, amountDays: number): Date {
  return addDays(date, amountDays);
}
