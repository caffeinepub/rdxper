import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { BarGraphData } from '../backend';

interface BarGraphVisualizationProps {
  data: BarGraphData[];
  topic: string;
}

export function BarGraphVisualization({ data, topic }: BarGraphVisualizationProps) {
  return (
    <div className="grid gap-6">
      {data.map((graphData, index) => {
        // Transform backend data to recharts format
        const chartData = graphData.categories.map((category, catIndex) => ({
          name: category,
          value: graphData.values[catIndex] || 0,
        }));

        return (
          <div key={index} className="grid gap-6">
            <Card className="border border-[#D0D0D0] rounded-none shadow-none">
              <CardHeader className="border-b border-[#D0D0D0] bg-white">
                <CardTitle className="font-['Arial',sans-serif] text-base font-normal text-[#000000]">
                  Data Distribution {data.length > 1 ? `#${index + 1}` : ''}
                </CardTitle>
                <CardDescription className="font-['Arial',sans-serif] text-sm text-[#606060]">
                  Categorical breakdown for {topic}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="w-full h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      barCategoryGap="10%"
                      barGap={2}
                    >
                      <CartesianGrid 
                        strokeDasharray="0" 
                        stroke="#E0E0E0" 
                        strokeWidth={1}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        stroke="#808080"
                        tick={{ fill: '#000000', fontFamily: 'Arial, sans-serif', fontSize: 11 }}
                        tickLine={{ stroke: '#808080' }}
                      />
                      <YAxis 
                        stroke="#808080"
                        tick={{ fill: '#000000', fontFamily: 'Arial, sans-serif', fontSize: 11 }}
                        tickLine={{ stroke: '#808080' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D0D0D0',
                          borderRadius: '0',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '11px',
                          color: '#000000',
                        }}
                        cursor={{ fill: '#F0F0F0' }}
                      />
                      <Legend 
                        wrapperStyle={{ 
                          paddingTop: '20px',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '11px'
                        }} 
                      />
                      <Bar
                        dataKey="value"
                        fill="#4472C4"
                        radius={0}
                        name="Value"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Additional visualization with different styling */}
            <Card className="border border-[#D0D0D0] rounded-none shadow-none">
              <CardHeader className="border-b border-[#D0D0D0] bg-white">
                <CardTitle className="font-['Arial',sans-serif] text-base font-normal text-[#000000]">
                  Comparative Analysis {data.length > 1 ? `#${index + 1}` : ''}
                </CardTitle>
                <CardDescription className="font-['Arial',sans-serif] text-sm text-[#606060]">
                  Alternative view of the data distribution
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="w-full h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                      barCategoryGap="10%"
                      barGap={2}
                    >
                      <CartesianGrid 
                        strokeDasharray="0" 
                        stroke="#E0E0E0" 
                        strokeWidth={1}
                        horizontal={false}
                      />
                      <XAxis 
                        type="number" 
                        stroke="#808080"
                        tick={{ fill: '#000000', fontFamily: 'Arial, sans-serif', fontSize: 11 }}
                        tickLine={{ stroke: '#808080' }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        stroke="#808080"
                        tick={{ fill: '#000000', fontFamily: 'Arial, sans-serif', fontSize: 11 }}
                        tickLine={{ stroke: '#808080' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D0D0D0',
                          borderRadius: '0',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '11px',
                          color: '#000000',
                        }}
                        cursor={{ fill: '#F0F0F0' }}
                      />
                      <Legend 
                        wrapperStyle={{ 
                          paddingTop: '20px',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '11px'
                        }} 
                      />
                      <Bar
                        dataKey="value"
                        fill="#70AD47"
                        radius={0}
                        name="Value"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
