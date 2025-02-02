import { MonthlyInvoiceTotals, OverdueInvoicesTrend, TotalsByStatus } from "../entities/dashboard.interface";

const PORT = 3000;

export const fetchTotalsByStatus = async (queryString: string) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/dashboard/getTotalByStatus?${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: TotalsByStatus[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error getDashboard:', error);
    throw error;
  }
}


export const fetchOverdueInvoicesTrend = async (queryString: string) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/dashboard/getOverdueInvoicesTrend?${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: OverdueInvoicesTrend[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error getDashboard:', error);
    throw error;
  }
}
export const fetchMonthlyInvoiceTotals = async (queryString: string) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/dashboard/getMonthlyInvoiceTotals?${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: MonthlyInvoiceTotals[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error getDashboard:', error);
    throw error;
  }
}
// 


export const fetchCustomerAnalysis = async (queryString: string) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/dashboard/getCustomerAnalysis?${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: MonthlyInvoiceTotals[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error getDashboard:', error);
    throw error;
  }
}

export const upload = async (file: File) => {
  try {

    const formData = new FormData();

    formData.append('file', file);


    const response = await fetch(`http://localhost:${PORT}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message;

  } catch (error) {
    console.error('Error getDashboard:', error);
    throw error;
  }
}