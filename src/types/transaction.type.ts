export interface Transaction {
  id: string;
  userId?: string;
  amount: number;
  categoryId?: string;
  description?: string;
}

export interface TransactionWithCategory extends Transaction {
  category: string;
}
