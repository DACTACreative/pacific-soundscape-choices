import React, { useState, useEffect, useRef } from 'react';

interface ThematicScores {
  Political_Leadership_and_Regionalism: number;
  People_Centered_Development: number;
  Peace_and_Security: number;
  Resource_and_Economic_Development: number;
  Climate_Change_and_Disasters: number;
  Ocean_and_Environment: number;
  Technology_and_Connectivity: number;
}

const THEMES = [
  'Political Leadership & Regionalism',
  'People-Centered Development', 
  'Peace & Security',
  'Resource & Economic Development',
  'Climate Change & Disasters',
  'Ocean & Environment',
  'Technology & Connectivity'
];

const THEME_KEYS = [
  'Political_Leadership_and_Regionalism',
  'People_Centered_Development',
  'Peace_and_Security', 
  'Resource_and_Economic_Development',
  'Climate_Change_and_Disasters',
  'Ocean_and_Environment',
  'Technology_and_Connectivity'
];

interface SpiderChartProps {
  className?: string;
}

const ThematicSpiderChart: React.FC<SpiderChartProps> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [thematicScores, setThematicScores] = useState<ThematicScores | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ theme: string; score: number; x: number; y: number } | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const scores = sessionStorage.getItem('thematicScores');
    if (scores) {
      setThematicScores(JSON.parse(scores));
    }
  }, []);

  useEffect(() => {
    if (thematicScores) {
      // Trigger animation after a short delay
      setTimeout(() => setIsAnimated(true), 300);
    }
  }, [thematicScores]);

  if (!thematicScores) {
    return (
      <div className={`flex items-center justify-center h-96 ${className}`}>
        <div className="text-white/60">Loading chart data...</div>
      </div>
    );
  }

  // Use viewport dimensions for responsive sizing
  const size = Math.min(window.innerWidth - 64, window.innerHeight - 64); // Account for margins
  const center = size / 2;
  const maxRadius = size * 0.36; // Scale radius proportionally
  const angleStep = (2 * Math.PI) / 7;

  // Calculate positions for each axis point
  const getAxisPoint = (axisIndex: number, value: number) => {
    const angle = axisIndex * angleStep - Math.PI / 2; // Start from top
    const radius = (value / 7) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    };
  };

  // Generate grid lines (concentric heptagons)
  const generateGridPath = (value: number) => {
    const points = [];
    for (let i = 0; i < 7; i++) {
      const point = getAxisPoint(i, value);
      points.push(`${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`);
    }
    points.push('Z');
    return points.join(' ');
  };

  // Generate ambition zone path (heptagon at 4.5)
  const ambitionZonePath = generateGridPath(4.5);

  // Generate player data path
  const playerScores = THEME_KEYS.map(key => thematicScores[key as keyof ThematicScores] || 0);
  const playerPath = (() => {
    const points = [];
    for (let i = 0; i < 7; i++) {
      const point = getAxisPoint(i, playerScores[i]);
      points.push(`${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`);
    }
    points.push('Z');
    return points.join(' ');
  })();

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-8 ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="w-full h-full max-w-full max-h-full"
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines at 2, 4, 6 marks */}
        {[2, 4, 6].map(value => (
          <path
            key={value}
            d={generateGridPath(value)}
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={Math.max(1, size * 0.002)}
          />
        ))}

        {/* Axis lines */}
        {THEMES.map((_, index) => {
          const endPoint = getAxisPoint(index, 7);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth={Math.max(1, size * 0.002)}
            />
          );
        })}

        {/* Ambition Zone - Semi-transparent heptagon at 4.5 */}
        <path
          d={ambitionZonePath}
          fill="rgba(53, 197, 242, 0.15)"
          stroke="rgba(53, 197, 242, 0.4)"
          strokeWidth={Math.max(2, size * 0.004)}
          strokeDasharray="5,5"
        />

        {/* Player data shape */}
        <path
          d={playerPath}
          fill="rgba(255, 255, 255, 0.1)"
          stroke="white"
          strokeWidth={Math.max(2, size * 0.004)}
          style={{
            strokeDasharray: isAnimated ? 'none' : '2000',
            strokeDashoffset: isAnimated ? '0' : '2000',
            transition: 'stroke-dashoffset 2s ease-out'
          }}
        />

        {/* Player data points with conditional styling */}
        {playerScores.map((score, index) => {
          const point = getAxisPoint(index, score);
          const isSuccess = score >= 4.5;
          
          return (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={isSuccess ? Math.max(10, size * 0.02) : Math.max(6, size * 0.012)}
              fill={isSuccess ? '#35c5f2' : 'white'}
              stroke={isSuccess ? '#35c5f2' : 'rgba(255, 255, 255, 0.8)'}
              strokeWidth={Math.max(2, size * 0.004)}
              className="cursor-pointer transition-all duration-200"
              style={{
                filter: isSuccess ? 'drop-shadow(0 0 12px rgba(53, 197, 242, 0.8))' : 'none',
                opacity: isAnimated ? 1 : 0,
                transition: `opacity 0.5s ease-out ${index * 0.15}s, r 0.2s ease-out`
              }}
              onMouseEnter={(e) => {
                const rect = svgRef.current?.getBoundingClientRect();
                if (rect) {
                  setHoveredPoint({
                    theme: THEMES[index],
                    score: score,
                    x: rect.left + point.x,
                    y: rect.top + point.y
                  });
                }
              }}
              onMouseLeave={() => setHoveredPoint(null)}
              onMouseMove={(e) => {
                const rect = svgRef.current?.getBoundingClientRect();
                if (hoveredPoint && rect) {
                  setHoveredPoint({
                    ...hoveredPoint,
                    x: rect.left + point.x,
                    y: rect.top + point.y
                  });
                }
              }}
            />
          );
        })}


        {/* Grid value labels */}
        {[2, 4, 6].map(value => {
          const point = getAxisPoint(0, value);
          return (
            <text
              key={value}
              x={point.x + 15}
              y={point.y}
              textAnchor="start"
              dominantBaseline="middle"
              fill="rgba(255, 255, 255, 0.6)"
              fontSize={Math.max(12, size * 0.024)}
            >
              {value}
            </text>
          );
        })}

        {/* Center label */}
        <text
          x={center}
          y={center + 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255, 255, 255, 0.6)"
          fontSize={Math.max(12, size * 0.024)}
        >
          0
        </text>

        {/* Max value label */}
        <text
          x={center}
          y={center - maxRadius - 20}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255, 255, 255, 0.6)"
          fontSize={Math.max(12, size * 0.024)}
        >
          7
        </text>
      </svg>

      {/* Interactive Tooltip */}
      {hoveredPoint && (
        <div
          className="fixed bg-black/95 text-white text-sm px-3 py-2 rounded shadow-lg pointer-events-none z-50 border border-white/20"
          style={{
            left: hoveredPoint.x + 15,
            top: hoveredPoint.y - 35,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-medium">{hoveredPoint.theme}</div>
          <div className="text-[#35c5f2]">{hoveredPoint.score.toFixed(1)} / 7.0</div>
        </div>
      )}

    </div>
  );
};

export default ThematicSpiderChart;