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
  #define T iTime
  uniform vec3 iResolution;
  uniform float iTime;
  uniform vec4 iMouse;
  varying vec2 vUv;

  // Rotation matrix
  #define r(v,t) { float a = (t)*T; float c=cos(a); float s=sin(a); v*=mat2(c,s,-s,c); }

  // Hash function  
  float hash(float n) {
    return fract(sin(n)*43758.5453);
  }

  // 3D Noise
  float noise(in vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    float res = mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                        mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
                    mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                        mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
    return res;
  }

  // Transformation matrix
  const mat3 m = mat3( 0.00,  0.80,  0.60,
                      -0.80,  0.36, -0.48,
                      -0.60, -0.48,  0.64 );

  // Fractional Brownian Motion
  float fbm(vec3 p) {
    float f = 0.0;
    f  = 0.5000*noise( p ); p = m*p*2.02;
    f += 0.2500*noise( p ); p = m*p*2.03;
    f += 0.1250*noise( p ); p = m*p*2.01;
    f += 0.0625*noise( p );
    return f;
  }

  // Signed FBM
  float sfbm(vec3 p) {
    return 2.0*fbm(p) - 1.0;
  }

  // Distance function for the protoplasm
  float map(vec3 p) {
    // Animate the blob
    vec3 q = p;
    r(q.xz, 0.3);
    r(q.xy, 0.2);
    
    // Create the main blob shape
    float d = length(q) - 1.5;
    
    // Add organic distortion
    d += 0.3 * sfbm(p * 2.0);
    d += 0.15 * sfbm(p * 4.0);
    d += 0.075 * sfbm(p * 8.0);
    
    return d;
  }

  // Raymarching
  vec3 raymarch(vec3 ro, vec3 rd) {
    vec3 col = vec3(0.0);
    vec3 pos = ro;
    
    for(int i = 0; i < 64; i++) {
      float d = map(pos);
      
      if(d < 0.01) {
        // We're inside - create glow effect
        float intensity = 1.0 - float(i) / 64.0;
        col += vec3(0.1, 0.8, 0.6) * intensity * 0.1;
      }
      
      if(d > 5.0) break;
      
      pos += rd * max(d * 0.5, 0.02);
    }
    
    return col;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= iResolution.x / iResolution.y;
    
    // Camera setup
    vec3 ro = vec3(0.0, 0.0, 3.0);
    vec3 rd = normalize(vec3(uv, -1.0));
    
    // Animate camera
    r(ro.xz, 0.1);
    r(rd.xz, 0.1);
    
    // Raymarch the scene
    vec3 col = raymarch(ro, rd);
    
    // Add background gradient
    vec3 bg = mix(vec3(0.05, 0.1, 0.2), vec3(0.0, 0.0, 0.1), length(uv));
    col += bg;
    
    // Add some glow around the center
    float glow = 1.0 / (1.0 + length(uv) * 2.0);
    col += vec3(0.05, 0.3, 0.2) * glow * 0.3;
    
    gl_FragColor = vec4(col, 1.0);
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