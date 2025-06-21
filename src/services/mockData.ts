import { KpiResponse, RevenueData, MarketingData, GeographyData, HeatmapData } from '../types'

export const mockKpiData: KpiResponse = {
  mrr: 125000,
  arr: 1500000,
  arpu: 89,
  churnRate: 3.2,
}

export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', starter: 25000, pro: 45000, enterprise: 80000, netRevenue: 150000, refunds: 5000 },
  { month: 'Feb', starter: 28000, pro: 48000, enterprise: 85000, netRevenue: 161000, refunds: 4500 },
  { month: 'Mar', starter: 30000, pro: 52000, enterprise: 90000, netRevenue: 172000, refunds: 6000 },
  { month: 'Apr', starter: 32000, pro: 55000, enterprise: 95000, netRevenue: 182000, refunds: 5500 },
  { month: 'May', starter: 35000, pro: 58000, enterprise: 100000, netRevenue: 193000, refunds: 4800 },
  { month: 'Jun', starter: 38000, pro: 62000, enterprise: 105000, netRevenue: 205000, refunds: 5200 },
]

export const mockMarketingData: MarketingData[] = [
  { source: 'SEO', visitors: 15000, trials: 750, paid: 112, conversionRate: 14.9 },
  { source: 'Paid', visitors: 8500, trials: 510, paid: 89, conversionRate: 17.5 },
  { source: 'Referral', visitors: 5200, trials: 260, paid: 45, conversionRate: 17.3 },
  { source: 'Direct', visitors: 12000, trials: 480, paid: 67, conversionRate: 14.0 },
]

export const mockGeographyData: GeographyData[] = [
  { city: 'San Francisco', country: 'USA', revenue: 245000, users: 2840, lat: 37.7749, lng: -122.4194 },
  { city: 'New York', country: 'USA', revenue: 198000, users: 2240, lat: 40.7128, lng: -74.0060 },
  { city: 'London', country: 'UK', revenue: 167000, users: 1890, lat: 51.5074, lng: -0.1278 },
  { city: 'Toronto', country: 'Canada', revenue: 134000, users: 1520, lat: 43.6532, lng: -79.3832 },
  { city: 'Berlin', country: 'Germany', revenue: 112000, users: 1280, lat: 52.5200, lng: 13.4050 },
]

export const mockHeatmapData: HeatmapData[] = [
  // Sunday (day: 0)
  { hour: 0, day: 0, conversionRate: 2.1 },
  { hour: 1, day: 0, conversionRate: 1.8 },
  { hour: 2, day: 0, conversionRate: 1.5 },
  { hour: 3, day: 0, conversionRate: 1.2 },
  { hour: 8, day: 0, conversionRate: 3.4 },
  { hour: 9, day: 0, conversionRate: 4.1 },
  { hour: 10, day: 0, conversionRate: 4.8 },
  { hour: 11, day: 0, conversionRate: 5.2 },
  { hour: 14, day: 0, conversionRate: 6.1 },
  { hour: 15, day: 0, conversionRate: 5.8 },
  { hour: 20, day: 0, conversionRate: 3.2 },
  
  // Monday (day: 1)
  { hour: 8, day: 1, conversionRate: 4.2 },
  { hour: 9, day: 1, conversionRate: 5.2 },
  { hour: 10, day: 1, conversionRate: 6.8 },
  { hour: 11, day: 1, conversionRate: 7.1 },
  { hour: 12, day: 1, conversionRate: 6.9 },
  { hour: 13, day: 1, conversionRate: 7.5 },
  { hour: 14, day: 1, conversionRate: 8.2 },
  { hour: 15, day: 1, conversionRate: 7.9 },
  { hour: 16, day: 1, conversionRate: 7.3 },
  { hour: 17, day: 1, conversionRate: 6.1 },
  
  // Tuesday (day: 2)
  { hour: 8, day: 2, conversionRate: 4.5 },
  { hour: 9, day: 2, conversionRate: 5.8 },
  { hour: 10, day: 2, conversionRate: 7.2 },
  { hour: 11, day: 2, conversionRate: 7.8 },
  { hour: 12, day: 2, conversionRate: 7.1 },
  { hour: 13, day: 2, conversionRate: 8.1 },
  { hour: 14, day: 2, conversionRate: 8.9 },
  { hour: 15, day: 2, conversionRate: 8.4 },
  { hour: 16, day: 2, conversionRate: 7.7 },
  { hour: 17, day: 2, conversionRate: 6.8 },
  
  // Wednesday (day: 3)
  { hour: 8, day: 3, conversionRate: 4.3 },
  { hour: 9, day: 3, conversionRate: 5.5 },
  { hour: 10, day: 3, conversionRate: 6.9 },
  { hour: 11, day: 3, conversionRate: 7.4 },
  { hour: 12, day: 3, conversionRate: 6.8 },
  { hour: 13, day: 3, conversionRate: 7.8 },
  { hour: 14, day: 3, conversionRate: 8.5 },
  { hour: 15, day: 3, conversionRate: 8.1 },
  { hour: 16, day: 3, conversionRate: 7.4 },
  { hour: 17, day: 3, conversionRate: 6.3 },
  
  // Thursday (day: 4)
  { hour: 8, day: 4, conversionRate: 4.6 },
  { hour: 9, day: 4, conversionRate: 6.1 },
  { hour: 10, day: 4, conversionRate: 7.5 },
  { hour: 11, day: 4, conversionRate: 8.0 },
  { hour: 12, day: 4, conversionRate: 7.3 },
  { hour: 13, day: 4, conversionRate: 8.3 },
  { hour: 14, day: 4, conversionRate: 9.1 },
  { hour: 15, day: 4, conversionRate: 8.7 },
  { hour: 16, day: 4, conversionRate: 8.0 },
  { hour: 17, day: 4, conversionRate: 7.1 },
  
  // Friday (day: 5)
  { hour: 8, day: 5, conversionRate: 4.1 },
  { hour: 9, day: 5, conversionRate: 5.3 },
  { hour: 10, day: 5, conversionRate: 6.7 },
  { hour: 11, day: 5, conversionRate: 7.2 },
  { hour: 12, day: 5, conversionRate: 6.5 },
  { hour: 13, day: 5, conversionRate: 7.4 },
  { hour: 14, day: 5, conversionRate: 8.0 },
  { hour: 15, day: 5, conversionRate: 7.6 },
  { hour: 16, day: 5, conversionRate: 6.9 },
  { hour: 17, day: 5, conversionRate: 5.8 },
  
  // Saturday (day: 6)
  { hour: 9, day: 6, conversionRate: 3.8 },
  { hour: 10, day: 6, conversionRate: 4.5 },
  { hour: 11, day: 6, conversionRate: 5.1 },
  { hour: 12, day: 6, conversionRate: 5.8 },
  { hour: 13, day: 6, conversionRate: 6.2 },
  { hour: 14, day: 6, conversionRate: 6.8 },
  { hour: 15, day: 6, conversionRate: 6.1 },
  { hour: 16, day: 6, conversionRate: 5.4 },
  { hour: 20, day: 6, conversionRate: 3.9 },
]

// Mock API functions
export const fetchKpi = async (): Promise<KpiResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  return mockKpiData
}

export const fetchRevenueData = async (): Promise<RevenueData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockRevenueData
}

export const fetchMarketingData = async (): Promise<MarketingData[]> => {
  await new Promise(resolve => setTimeout(resolve, 400))
  return mockMarketingData
}

export const fetchGeographyData = async (): Promise<GeographyData[]> => {
  await new Promise(resolve => setTimeout(resolve, 600))
  return mockGeographyData
}

export const fetchHeatmapData = async (): Promise<HeatmapData[]> => {
  await new Promise(resolve => setTimeout(resolve, 350))
  return mockHeatmapData
}