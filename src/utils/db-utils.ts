import { db } from '@/lib';
import { User } from '@/types/user.type';
import { Nullable } from '@/types/utility.type';
import { uuid } from './helper';
import { Category } from '@/types/category.type';
import { Transaction, TransactionWithCategory } from '@/types/transaction.type';

export const dbUtils = {
  async findUserByEmail(email: string): Promise<Nullable<User>> {
    await db.read();
    return db.data?.users.find((u) => u?.email?.toLowerCase() === email.toLowerCase());
  },

  async findUserById(id: string): Promise<Nullable<User>> {
    await db.read();
    return db.data?.users.find((u) => u?.id?.toLowerCase() === id.toLowerCase());
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    await db.read();
    const newUser = {
      ...user,
      id: uuid(),
    };
    db.data!.users.push(newUser);
    await db.write();
    return newUser;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<Nullable<User>> {
    await db.read();
    const userIndex = db.data!.users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      db.data!.users[userIndex] = { ...db.data!.users[userIndex], ...updates };
      await db.write();
      return db.data!.users[userIndex];
    }
    return undefined;
  },

  async deleteUser(id: string): Promise<boolean> {
    await db.read();
    const initialLength = db.data!.users.length;
    db.data!.users = db.data!.users.filter((u) => u.id !== id);
    if (db.data!.users.length < initialLength) {
      await db.write();
      return true;
    }
    return false;
  },

  async getAllUsers(): Promise<User[]> {
    await db.read();
    return db.data!.users;
  },

  async getAllCategories(): Promise<Category[]> {
    await db.read();
    return db.data!.categories;
  },

  async getCategoryById(id: string | undefined): Promise<Nullable<Category>> {
    await db.read();
    if (!id) {
      return null;
    }
    return db.data?.categories?.find((c) => c?.id?.toLowerCase() === id.toLowerCase());
  },

  async getAllTransactions(): Promise<Transaction[]> {
    await db.read();
    return db.data!.transactions;
  },

  async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    await db.read();
    const newTransaction = {
      ...transaction,
      id: uuid(),
    };
    db.data!.transactions.push(newTransaction);
    await db.write();
    return newTransaction;
  },

  async getTransactionsByUserId(userId: string): Promise<TransactionWithCategory[]> {
    await db.read();
    const transactions = db.data!.transactions.filter((t) => t.userId === userId);
    const transactionsWithCategory = await Promise.all(
      transactions.map(async (t) => {
        const category = await dbUtils.getCategoryById(t.categoryId);
        return { ...t, category: category?.name || 'Unknown' };
      }),
    );
    return transactionsWithCategory;
  },

  async getUserBalance(userId: string): Promise<number> {
    await db.read();
    const transactions = db.data!.transactions.filter((t) => t.userId === userId);
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  },
};
