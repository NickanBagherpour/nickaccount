export interface ReportData {
  id: string;
  title: string;
  description?: string;
  date: string;
  author: string;
  data: {
    revenue?: number;
    expenses?: number;
    profit?: number;
    customerGrowth?: number;
    topProducts?: Array<{ name: string; sales: number }>;
  };
}
