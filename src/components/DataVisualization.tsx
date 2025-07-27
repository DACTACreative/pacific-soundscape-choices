import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface ChartData {
  type: string;
  title: string;
  unit: string;
  data: Array<{ label: string; value: number }>;
}

interface CounterData {
  title: string;
  unit: string;
  value: number;
  comparison?: string;
}

interface MetricData {
  label: string;
  value: string | number;
  unit?: string;
}

interface DataVisualizationProps {
  chart?: ChartData;
  counter?: CounterData;
  metrics?: MetricData[];
}

export function DataVisualization({ chart, counter, metrics }: DataVisualizationProps) {
  if (!chart && !counter && !metrics?.length) {
    return null;
  }

  // Colors for pie/doughnut charts
  const COLORS = ['#35c5f2', '#0ea5e9', '#0284c7', '#0369a1'];

  return (
    <div className="mt-4 space-y-4">
      {/* Chart Visualization - Ultra-Minimalist Style */}
      {chart && (
        <div className="group">
          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-[#35c5f2]/30 transition-all duration-500">
            
            {/* Ultra-minimal header */}
            <div className="px-6 py-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h4 className="text-white/90 text-sm font-light tracking-wide">
                  {chart.title}
                </h4>
                <span className="text-[#35c5f2] text-xs font-mono opacity-60">
                  {chart.unit}
                </span>
              </div>
            </div>

            {/* Clean chart area */}
            <div className="p-6">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  {chart.type === 'bar' ? (
                    <BarChart data={chart.data}>
                      <XAxis 
                        dataKey="label" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#ffffff60', fontSize: 11, fontWeight: 300 }}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#000000f0',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 300,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}
                        formatter={(value) => [`${value}${chart.unit}`, '']}
                        labelStyle={{ display: 'none' }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#35c5f2" 
                        radius={[2, 2, 0, 0]}
                        opacity={0.9}
                      />
                    </BarChart>
                  ) : chart.type === 'doughnut' || chart.type === 'pie' ? (
                    <PieChart>
                      <Pie
                        data={chart.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={chart.type === 'doughnut' ? 40 : 0}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chart.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.9} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#000000f0',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 300,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}
                        formatter={(value) => [`${value}${chart.unit}`, '']}
                        labelStyle={{ color: '#ffffff60', fontSize: '10px' }}
                      />
                    </PieChart>
                  ) : null}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Counter Visualization - Ultra-Minimalist Style */}
      {counter && (
        <div className="group">
          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-[#35c5f2]/30 transition-all duration-500">
            
            {/* Ultra-minimal header */}
            <div className="px-6 py-4 border-b border-white/5">
              <h4 className="text-white/90 text-sm font-light tracking-wide">
                {counter.title}
              </h4>
            </div>

            {/* Clean counter area */}
            <div className="p-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-light text-[#35c5f2]">
                  {counter.value}
                </span>
                <span className="text-lg text-white/60 font-light">
                  {counter.unit}
                </span>
              </div>
              {counter.comparison && (
                <p className="text-sm text-white/50 mt-3 font-light">
                  {counter.comparison}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Metrics Visualization - Ultra-Minimalist Style */}
      {metrics && metrics.length > 0 && (
        <div className="group">
          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-[#35c5f2]/30 transition-all duration-500">
            
            {/* Ultra-minimal header */}
            <div className="px-6 py-4 border-b border-white/5">
              <h4 className="text-white/90 text-sm font-light tracking-wide">
                Key Metrics
              </h4>
            </div>

            {/* Clean metrics area */}
            <div className="p-6">
              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="text-white/70 text-sm font-light">
                      {metric.label}
                    </span>
                    <span className="text-white font-light">
                      {metric.value}{metric.unit || ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}