export type Rates = {
  buy: number;
  sell: number;
  topup: number;
};

export type Tier = {
  label: string;
  rate: number;
  fee?: number;
};

export type HistoryPoint = {
  time: string;
  buy: number;
  sell: number;
  topup: number;
};

export type Config = {
  siteName: string;
  menu: { label: string; href: string }[];
  rates: Rates;
  tiers: Tier[];
  warning: string;
  noteBox: string[];
  contacts: { zalo: string; telegram: string };
  history: HistoryPoint[];
};
