import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShaderMaterial, Vector2, Vector3, Vector4 } from 'three';
import { Button } from '@/components/ui/button';

const waterVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const waterFragmentShader = `
  uniform vec3 iResolution;
  uniform float iTime;
  uniform vec4 iMouse;
  varying vec2 vUv;

  // Hash function for noise
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  // Noise function
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractional Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
      value += amplitude * noise(frequency * p);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 6.0;
    
    // Animate the noise
    float t = iTime * 0.3;
    p.x += t;
    
    // Create flowing water effect
    float wave1 = fbm(p + vec2(t, 0.0));
    float wave2 = fbm(p * 2.0 + vec2(-t * 0.5, t * 0.3));
    float wave3 = fbm(p * 4.0 + vec2(t * 0.8, -t * 0.6));
    
    float waves = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;
    
    // Create depth and flow
    float depth = smoothstep(0.0, 1.0, waves);
    
    // Pacific blue color palette
    vec3 shallowColor = vec3(0.4, 0.8, 1.0);  // Light blue
    vec3 deepColor = vec3(0.1, 0.3, 0.8);     // Deep blue
    vec3 foamColor = vec3(0.9, 0.95, 1.0);    // White foam
    
    // Mix colors based on depth
    vec3 waterColor = mix(shallowColor, deepColor, depth);
    
    // Add foam on wave peaks
    float foam = smoothstep(0.7, 1.0, waves);
    waterColor = mix(waterColor, foamColor, foam * 0.6);
    
    // Add subtle gradient from top to bottom
    float gradient = 1.0 - uv.y * 0.3;
    waterColor *= gradient;
    
    // Add some shimmer
    float shimmer = sin(p.x * 10.0 + t * 5.0) * sin(p.y * 8.0 - t * 3.0);
    shimmer = smoothstep(-0.5, 0.5, shimmer) * 0.1;
    waterColor += shimmer;
    
    gl_FragColor = vec4(waterColor, 1.0);
  }
`;

function WaterShader() {
  const meshRef = useRef<any>();
  const materialRef = useRef<ShaderMaterial>();
  const [mousePos, setMousePos] = useState(new Vector4(0, 0, 0, 0));

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.iMouse.value = mousePos;
    }
  });

  const handlePointerMove = (event: any) => {
    const x = (event.point.x + 1) * 0.5; // Convert from -1,1 to 0,1
    const y = (event.point.y + 1) * 0.5;
    setMousePos(new Vector4(x, y, 0, 0));
  };

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={{
          iResolution: { value: new Vector3(window.innerWidth, window.innerHeight, 1) },
          iTime: { value: 0 },
          iMouse: { value: new Vector4(0, 0, 0, 0) }
        }}
      />
    </mesh>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* WebGL Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <WaterShader />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between p-8">
        {/* Top Content */}
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Choose Your Pacific Future
          </h1>
          <p className="text-xl text-white/90 max-w-2xl drop-shadow-lg">
            A sound-driven data journey exploring climate choices and their consequences by 2050
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-white/80 text-sm uppercase tracking-wide">
            Scroll to continue or click to start
          </p>
          <Button
            onClick={handleStart}
            size="hero"
            variant="ocean"
            className="text-lg px-8 py-4 backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}