/**
 * Processes CSV files and converts them to usable JSON data
 */

export interface ParsedData {
  headers: string[];
  rows: Record<string, any>[];
  meta: {
    totalRows: number;
    totalColumns: number;
    fileName: string;
    fileSize: number;
  };
}

/**
 * Parse CSV file content into structured data
 * @param content CSV file content as string
 * @param fileName Original file name
 * @param fileSize Size of the file in bytes
 * @returns Parsed data structure
 */
export function parseCSV(content: string, fileName: string, fileSize: number): ParsedData {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  const rows = lines.slice(1)
    .filter(line => line.trim() !== '') // Skip empty lines
    .map(line => {
      const values = line.split(',');
      const row: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        const value = values[index]?.trim() || '';
        
        // Try to convert to number if possible
        const numValue = Number(value);
        row[header] = !isNaN(numValue) && value !== '' ? numValue : value;
      });
      
      return row;
    });
  
  return {
    headers,
    rows,
    meta: {
      totalRows: rows.length,
      totalColumns: headers.length,
      fileName,
      fileSize
    }
  };
}

/**
 * Converts parsed data to CSV format
 * @param data Parsed data structure
 * @returns CSV content as string
 */
export function toCSV(data: ParsedData): string {
  const headers = data.headers.join(',');
  const rows = data.rows.map(row => {
    return data.headers.map(header => row[header]).join(',');
  });
  
  return [headers, ...rows].join('\n');
}