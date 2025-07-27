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
        <div className="bg-black/60 border border-[#35c5f2]/30 p-4 rounded-lg">
          <h4 className="text-[#35c5f2] text-sm font-semibold mb-3 uppercase tracking-wide">
            {chart.title}
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart.data}>
                <XAxis 
                  dataKey="label" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#fff', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#fff', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(53, 197, 242, 0.3)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`${value}${chart.unit}`, chart.title]}
                />
                <Bar dataKey="value" fill="#35c5f2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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