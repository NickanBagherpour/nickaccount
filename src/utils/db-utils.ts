
import { db } from '@/lib';
import { User } from '@/types/user.type';
import { Nullable } from '@/types/utility.type';
import { uuid } from './helper';

export const dbUtils = {
  async findUserByEmail(email: string): Promise<Nullable<User>> {
    await db.read();
    return db.data?.users.find((u) => u?.email?.toLowerCase() === email.toLowerCase());
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
};
