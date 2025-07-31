/// <reference types="vite/client" />

declare global {
  interface Window {
    THREE: any;
    VANTA: {
      BIRDS: (options: {
        el: string;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        backgroundColor?: number;
        color1?: number;
        color2?: number;
        colorMode?: string;
        birdSize?: number;
        speedLimit?: number;
        separation?: number;
        alignment?: number;
        cohesion?: number;
        quantity?: number;
      }) => any;
    };
  }
}
