import { ParsedData } from "./data-processors/csv-processor";

export interface ChartDataConfig {
  chartType: string;
  xAxis: string;
  yAxis: string;
  groupBy?: string;
  filter?: {
    column: string;
    operator: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'contains';
    value: string | number;
  };
  sortBy?: {
    column: string;
    direction: 'asc' | 'desc';
  };
  colors: string[];
  aggregation?: 'sum' | 'average' | 'count' | 'min' | 'max';
}

/**
 * Prepares data for chart visualization based on configuration
 * @param data The parsed data
 * @param config Chart configuration
 * @returns Formatted data for chart rendering
 */
export function prepareChartData(data: ParsedData, config: ChartDataConfig): any[] {
  let processedData = [...data.rows];
  
  // Apply filtering if specified
  if (config.filter) {
    processedData = processedData.filter(row => {
      const value = row[config.filter!.column];
      switch (config.filter!.operator) {
        case 'equals':
          return value === config.filter!.value;
        case 'notEquals':
          return value !== config.filter!.value;
        case 'greaterThan':
          return value > config.filter!.value;
        case 'lessThan':
          return value < config.filter!.value;
        case 'contains':
          return typeof value === 'string' && value.includes(String(config.filter!.value));
        default:
          return true;
      }
    });
  }
  
  // Apply sorting if specified
  if (config.sortBy) {
    processedData.sort((a, b) => {
      const valueA = a[config.sortBy!.column];
      const valueB = b[config.sortBy!.column];
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return config.sortBy!.direction === 'asc' ? valueA - valueB : valueB - valueA;
      }
      
      const stringA = String(valueA);
      const stringB = String(valueB);
      
      return config.sortBy!.direction === 'asc' 
        ? stringA.localeCompare(stringB) 
        : stringB.localeCompare(stringA);
    });
  }
  
  // If no grouping, return the processed data with just the x and y values
  if (!config.groupBy) {
    return processedData.map(row => ({
      name: row[config.xAxis],
      value: row[config.yAxis]
    }));
  }
  
  // Handle grouping with aggregation
  const groupedData: Record<string, Record<string, number>> = {};
  
  processedData.forEach(row => {
    const xValue = row[config.xAxis];
    const yValue = row[config.yAxis];
    const groupValue = row[config.groupBy!];
    
    if (!groupedData[xValue]) {
      groupedData[xValue] = {};
    }
    
    if (!groupedData[xValue][groupValue]) {
      groupedData[xValue][groupValue] = 0;
    }
    
    if (config.aggregation === 'count') {
      groupedData[xValue][groupValue]++;
    } else if (config.aggregation === 'sum' || !config.aggregation) {
      groupedData[xValue][groupValue] += Number(yValue) || 0;
    } else if (config.aggregation === 'average') {
      // For average, we'll need to keep track of sum and count separately
      // This is simplified for now
      groupedData[xValue][groupValue] += Number(yValue) || 0;
    }
    // Min and max would require additional logic
  });
  
  // Convert the grouped data to the format needed by charts
  return Object.entries(groupedData).map(([xValue, yValues]) => {
    return {
      name: xValue,
      ...yValues
    };
  });
}

/**
 * Get appropriate chart type options based on data structure
 * @param data The parsed data
 * @returns Recommended chart types
 */
export function getRecommendedChartTypes(data: ParsedData): string[] {
  const numericColumns = data.headers.filter(header => {
    // Check if most values in this column are numeric
    const numericCount = data.rows.reduce((count, row) => {
      return typeof row[header] === 'number' ? count + 1 : count;
    }, 0);
    
    return numericCount / data.rows.length > 0.5; // More than 50% are numbers
  });
  
  const categoricalColumns = data.headers.filter(header => !numericColumns.includes(header));
  const hasDateColumn = categoricalColumns.some(header => {
    // Simple check for date-like values
    const dateCount = data.rows.reduce((count, row) => {
      const value = String(row[header]);
      return /^\d{4}-\d{2}-\d{2}/.test(value) ? count + 1 : count;
    }, 0);
    
    return dateCount / data.rows.length > 0.5;
  });
  
  const recommendedCharts = [];
  
  if (numericColumns.length >= 1 && categoricalColumns.length >= 1) {
    recommendedCharts.push('bar', 'line');
    
    if (hasDateColumn) {
      recommendedCharts.push('area', 'timeline');
    }
    
    if (categoricalColumns.length >= 2) {
      recommendedCharts.push('heatmap', 'grouped-bar');
    }
    
    if (numericColumns.length >= 2) {
      recommendedCharts.push('scatter', 'bubble');
    }
  }
  
  if (categoricalColumns.length === 1 && numericColumns.length === 1) {
    recommendedCharts.push('pie', 'donut');
  }
  
  return recommendedCharts.length > 0 ? recommendedCharts : ['bar']; // Default to bar chart
}