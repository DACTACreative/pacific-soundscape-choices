import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

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

  return (
    <div className="mt-4 space-y-4">
      {/* Chart Visualization */}
      {chart && (
        <div className="group">
  {/* Minimal container */}
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
        </ResponsiveContainer>
      </div>
    </div>
  </div>
</div>
      )}

      {/* Counter Visualization */}
      {counter && (
        <div className="bg-black/60 border border-[#35c5f2]/30 p-4 rounded-lg">
          <h4 className="text-[#35c5f2] text-sm font-semibold mb-2 uppercase tracking-wide">
            {counter.title}
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-white">
              {counter.value}
            </span>
            <span className="text-lg text-white/70">
              {counter.unit}
            </span>
          </div>
          {counter.comparison && (
            <p className="text-sm text-white/60 mt-1">
              {counter.comparison}
            </p>
          )}
        </div>
      )}

      {/* Metrics Visualization */}
      {metrics && metrics.length > 0 && (
        <div className="bg-black/60 border border-[#35c5f2]/30 p-4 rounded-lg">
          <h4 className="text-[#35c5f2] text-sm font-semibold mb-3 uppercase tracking-wide">
            Key Metrics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {metrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-white/80 text-sm">
                  {metric.label}
                </span>
                <span className="text-white font-semibold">
                  {metric.value}{metric.unit || ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}