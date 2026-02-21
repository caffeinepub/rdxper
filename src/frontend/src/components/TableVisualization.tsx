import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { TableData } from '../backend';

interface TableVisualizationProps {
  data: TableData[];
  topic: string;
}

// Helper function to detect if a value is numeric
function isNumeric(value: string): boolean {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

export function TableVisualization({ data, topic }: TableVisualizationProps) {
  return (
    <div className="grid gap-6">
      {data.map((tableData, index) => (
        <div key={index} className="grid gap-6">
          <Card className="border border-[#D0D0D0] rounded-none shadow-none">
            <CardHeader className="border-b border-[#D0D0D0] bg-white">
              <CardTitle className="font-['Arial',sans-serif] text-base font-normal text-[#000000]">
                Detailed Data Table {data.length > 1 ? `#${index + 1}` : ''}
              </CardTitle>
              <CardDescription className="font-['Arial',sans-serif] text-sm text-[#606060]">
                Comprehensive data breakdown for {topic}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <Table className="border-collapse">
                  <TableHeader>
                    <TableRow className="bg-[#F5F5F5] border-b border-[#D0D0D0] hover:bg-[#F5F5F5]">
                      {tableData.headers.map((header, headerIndex) => (
                        <TableHead 
                          key={headerIndex} 
                          className="font-['Arial',sans-serif] text-[#000000] font-normal text-xs border-r border-[#D0D0D0] last:border-r-0 h-8 px-3"
                        >
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.rows.map((row, rowIndex) => (
                      <TableRow 
                        key={rowIndex} 
                        className="border-b border-[#D0D0D0] hover:bg-white"
                      >
                        {row.map((cell, cellIndex) => (
                          <TableCell 
                            key={cellIndex}
                            className={`font-['Arial',sans-serif] text-[#000000] text-xs border-r border-[#D0D0D0] last:border-r-0 h-8 px-3 ${
                              isNumeric(cell) ? 'text-right' : 'text-left'
                            }`}
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Summary Statistics Card */}
          <Card className="border border-[#D0D0D0] rounded-none shadow-none">
            <CardHeader className="border-b border-[#D0D0D0] bg-white">
              <CardTitle className="font-['Arial',sans-serif] text-base font-normal text-[#000000]">
                Data Summary {data.length > 1 ? `#${index + 1}` : ''}
              </CardTitle>
              <CardDescription className="font-['Arial',sans-serif] text-sm text-[#606060]">
                Quick statistics and overview
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-[#D0D0D0] bg-[#F5F5F5] rounded-none">
                  <p className="font-['Arial',sans-serif] text-xs text-[#606060] mb-1">Total Rows</p>
                  <p className="font-['Arial',sans-serif] text-2xl font-normal text-[#000000]">{tableData.rows.length}</p>
                </div>
                <div className="p-4 border border-[#D0D0D0] bg-[#F5F5F5] rounded-none">
                  <p className="font-['Arial',sans-serif] text-xs text-[#606060] mb-1">Total Columns</p>
                  <p className="font-['Arial',sans-serif] text-2xl font-normal text-[#000000]">{tableData.headers.length}</p>
                </div>
                <div className="p-4 border border-[#D0D0D0] bg-[#F5F5F5] rounded-none">
                  <p className="font-['Arial',sans-serif] text-xs text-[#606060] mb-1">Data Points</p>
                  <p className="font-['Arial',sans-serif] text-2xl font-normal text-[#000000]">
                    {tableData.rows.length * tableData.headers.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
