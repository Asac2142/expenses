import { Filesystem, Directory, Encoding, ReadFileResult } from '@capacitor/filesystem';
import { format, startOfMonth, endOfMonth, addDays, addMonths } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import subMonths from 'date-fns/subMonths';

import { Category, Transaction } from '../models/transaction.model';
import { RootState } from '@store/index';
import { ToastController } from '@ionic/angular';
import { TransactionStateEntity } from '@store/transaction/transaction.entity';
import { noop } from 'rxjs';

const folder = 'Downloads';
const filename = 'store.json';
const filePath = `${folder}/${filename}`;

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

export function getValidTransactions(transactionEntity: TransactionStateEntity): Transaction[] {
  const transactions: Transaction[] = [];
  Object.entries(transactionEntity.entities).forEach(v => (v[1]?.category ? transactions.push(v[1]) : noop));
  return transactions;
}

export async function createFile(contentFile: RootState, toast: ToastController): Promise<void> {
  const content = JSON.stringify(contentFile);
  deleteFile();

  await Filesystem.mkdir({
    path: folder,
    directory: Directory.External,
    recursive: false
  }).catch(async () => handleError('folder', toast));

  await Filesystem.writeFile({
    path: filePath,
    data: content,
    directory: Directory.External,
    encoding: Encoding.UTF8
  })
    .then(async () => handleFileCreationOutput(toast))
    .catch(async () => handleError('file', toast));
}

export async function readFile(): Promise<ReadFileResult | undefined> {
  try {
    const content = await Filesystem.readFile({
      path: filePath,
      directory: Directory.External,
      encoding: Encoding.UTF8
    });

    return content;
  } catch(e) {}

  return undefined;
}

function handleFileCreationOutput(toast: ToastController): void {
  const message = 'File was created successfully';
  const duration = 2000;
  const icon = 'document';

  handleToast(message, duration, toast, icon);
}

function handleError(asset: 'file' | 'folder', toast: ToastController): void {
  const message = `Error while creating ${asset}`;
  const duration = 2000;
  const icon = 'alert-circle';

  handleToast(message, duration, toast, icon);
}

async function handleToast(message: string, duration: number, toast: ToastController, icon: string): Promise<void> {
  const _modal = await toast.create({ message, duration, icon });
  _modal.present();
}

async function deleteFile(): Promise<void> {
  try {
    await Filesystem.deleteFile({
      path: filePath,
      directory: Directory.External
    });
  } catch (e) {}
}
