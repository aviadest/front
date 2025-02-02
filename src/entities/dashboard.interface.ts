export interface TotalsByStatus {
    status: string;
    total_amount: string;
}

export interface OverdueInvoicesTrend {
    month: string;
    overdue_count: string;
}
export interface MonthlyInvoiceTotals {
    month: string;
    total_amount: string;
}

export interface CustomerAnalysis {
    customer: string;
    total_amount: string;
}

