import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { format, startOfMonth, endOfMonth, addDays, addMonths } from 'date-fns';
import subMonths from 'date-fns/subMonths';
import { v4 as uuidv4 } from 'uuid';

import { Category } from '../models/transaction.model';

export const categoryData: Category[] = [
  { id: uuidv4(), color: 'danger', iconName: 'medkit', label: 'Medicine', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'newspaper', label: 'Bills', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'car-sport', label: 'Car', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'shirt', label: 'Clothing', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'school', label: 'Education', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'flash', label: 'Electronics', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'wine', label: 'Entertainment', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'fast-food', label: 'Food', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'fitness', label: 'Health', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'home', label: 'Home', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'lock-closed', label: 'Insurance', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'paw', label: 'Pet', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'bag-remove', label: 'Shopping', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'people', label: 'Social', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'tennisball', label: 'Sport', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'journal', label: 'Taxes', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'phone-portrait', label: 'Telephone', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'bus', label: 'Transportation', type: 'expense' },
  { id: uuidv4(), color: 'danger', iconName: 'barbell', label: 'Gym', type: 'expense' },
  { id: uuidv4(), color: 'success', iconName: 'cash', label: 'Salary', type: 'income' },
  { id: uuidv4(), color: 'success', iconName: 'diamond', label: 'Investment', type: 'income' },
  { id: uuidv4(), color: 'success', iconName: 'bag-add', label: 'Sale', type: 'income' },
  { id: uuidv4(), color: 'success', iconName: 'logo-usd', label: 'Rental', type: 'income' },
  { id: uuidv4(), color: 'success', iconName: 'wallet', label: 'Utility', type: 'income' }
];

export function formatIonDate(date: string, formatDesired: string = 'yyyy-MM-dd'): string {
  return format(new Date(date.replace(/-/g, '/')), formatDesired);
}
export function formatDate(date: Date, formatDesired: string = 'yyyy/MM/dd'): string {
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

export function addMonthToDate(date: Date, monthAmount: number): Date {
  return addMonths(date, monthAmount);
}

export function subMonthToDate(date: Date, monthAmount: number): Date {
  return subMonths(date, monthAmount);
}

export function toFixed(amount: number, precision = 2): number {
  return Number(amount.toFixed(precision));
}

export async function createFile(): Promise<void> {
  try {
    await Filesystem.mkdir({
      path: 'Downloads',
      directory: Directory.External,
      recursive: false
    }).catch(error => console.log('Error when creating folder: ', error));

    await Filesystem.writeFile({
      path: 'Downloads/data.txt',
      data: 'This is a test',
      directory: Directory.External,
      encoding: Encoding.UTF8
    }).catch(error => console.log('Error when creating file: ', error));
  } catch (error) {
    console.error('Could not create or write folder/file: ', error);
  }
}
