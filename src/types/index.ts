export interface KpiResponse {
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  arpu: number; // Average Revenue Per User
  churnRate: number; // %
}

export interface RevenueData {
  month: string;
  starter: number;
  pro: number;
  enterprise: number;
  netRevenue: number;
  refunds: number;
}

export interface MarketingData {
  source: string;
  visitors: number;
  trials: number;
  paid: number;
  conversionRate: number;
}

export interface GeographyData {
  city: string;
  country: string;
  revenue: number;
  users: number;
  lat: number;
  lng: number;
}

export interface HeatmapData {
  hour: number;
  day: number;
  conversionRate: number;
}