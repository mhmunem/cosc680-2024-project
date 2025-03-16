
export type PriceHistory = {
  date: Date;
  price: number;
}

export type PriceHistoryData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }>;
}
