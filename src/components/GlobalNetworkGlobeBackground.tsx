import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Globe2, 
  EyeOff,
  Sparkles
} from 'lucide-react';

// Real-world tech & hiring hubs with city night-light intensity
interface HubLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
  lightIntensity: number; // 0 to 1 night radiance
  status: 'verified' | 'active' | 'screening';
}

const GLOBAL_HUBS: HubLocation[] = [
  { name: 'Silicon Valley', country: 'USA', lat: 37.38, lon: -122.08, lightIntensity: 1.0, status: 'verified' },
  { name: 'New York', country: 'USA', lat: 40.71, lon: -74.0, lightIntensity: 1.0, status: 'verified' },
  { name: 'London', country: 'UK', lat: 51.5, lon: -0.12, lightIntensity: 0.95, status: 'verified' },
  { name: 'Paris', country: 'France', lat: 48.85, lon: 2.35, lightIntensity: 0.9, status: 'active' },
  { name: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.4, lightIntensity: 0.85, status: 'active' },
  { name: 'Bengaluru', country: 'India', lat: 12.97, lon: 77.59, lightIntensity: 0.95, status: 'verified' },
  { name: 'Mumbai', country: 'India', lat: 19.07, lon: 72.87, lightIntensity: 0.9, status: 'active' },
  { name: 'Tokyo', country: 'Japan', lat: 35.67, lon: 139.65, lightIntensity: 1.0, status: 'verified' },
  { name: 'Seoul', country: 'South Korea', lat: 37.56, lon: 126.97, lightIntensity: 0.95, status: 'verified' },
  { name: 'Singapore', country: 'Singapore', lat: 1.35, lon: 103.81, lightIntensity: 0.95, status: 'verified' },
  { name: 'Sydney', country: 'Australia', lat: -33.86, lon: 151.2, lightIntensity: 0.85, status: 'active' },
  { name: 'Toronto', country: 'Canada', lat: 43.65, lon: -79.38, lightIntensity: 0.9, status: 'verified' },
  { name: 'Zurich', country: 'Switzerland', lat: 47.37, lon: 8.54, lightIntensity: 0.85, status: 'verified' },
  { name: 'Dubai', country: 'UAE', lat: 25.2, lon: 55.27, lightIntensity: 0.95, status: 'screening' },
  { name: 'São Paulo', country: 'Brazil', lat: -23.55, lon: -46.63, lightIntensity: 0.85, status: 'screening' },
  { name: 'Nairobi', country: 'Kenya', lat: -1.29, lon: 36.82, lightIntensity: 0.75, status: 'active' }
];

// Major global network flight / data trajectories
const NETWORK_CONNECTIONS: [number, number][] = [
  [0, 1],  // SV - NYC
  [0, 7],  // SV - Tokyo
  [0, 10], // SV - Sydney
  [1, 2],  // NYC - London
  [1, 11], // NYC - Toronto
  [1, 14], // NYC - São Paulo
  [2, 3],  // London - Paris
  [2, 4],  // London - Berlin
  [2, 12], // London - Zurich
  [2, 13], // London - Dubai
  [3, 4],  // Paris - Berlin
  [4, 5],  // Berlin - Bengaluru
  [5, 6],  // Bengaluru - Mumbai
  [5, 9],  // Bengaluru - Singapore
  [5, 13], // Bengaluru - Dubai
  [5, 15], // Bengaluru - Nairobi
  [7, 8],  // Tokyo - Seoul
  [7, 9],  // Tokyo - Singapore
  [9, 10], // Singapore - Sydney
  [11, 2], // Toronto - London
  [13, 15] // Dubai - Nairobi
];

interface Point3D {
  x: number;
  y: number;
  z: number;
}

// Convert Lat/Lon to 3D Cartesian coordinates
function latLonToVector3D(lat: number, lon: number, radius: number = 1): Point3D {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  };
}

// Dot product between two 3D vectors
function dotProduct(v1: Point3D, v2: Point3D): number {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

// Generate high-density realistic world landmass point clouds
function generateRealisticWorldLandmasses(radius: number): { pos: Point3D; isCoast: boolean }[] {
  const points: { pos: Point3D; isCoast: boolean }[] = [];
  
  // Real geographic landmass contours & regional clusters
  const regions = [
    // North America (US, Canada, Alaska, Mexico, Central America)
    { lat: 48, lon: -102, latR: 12, lonR: 28, count: 280 },
    { lat: 36, lon: -92, latR: 10, lonR: 20, count: 260 },
    { lat: 58, lon: -115, latR: 12, lonR: 24, count: 180 },
    { lat: 62, lon: -150, latR: 8, lonR: 18, count: 100 }, // Alaska
    { lat: 24, lon: -102, latR: 8, lonR: 10, count: 120 }, // Mexico
    { lat: 14, lon: -86, latR: 6, lonR: 8, count: 70 },   // Central America
    { lat: 68, lon: -40, latR: 10, lonR: 15, count: 80 },  // Greenland
    
    // South America (Amazon, Brazil, Andes, Argentina, Chile)
    { lat: -8, lon: -54, latR: 14, lonR: 16, count: 260 },
    { lat: -25, lon: -58, latR: 14, lonR: 10, count: 180 },
    { lat: 6, lon: -68, latR: 8, lonR: 10, count: 110 },
    { lat: -42, lon: -68, latR: 10, lonR: 6, count: 90 },
    
    // Europe (Western, Central, Mediterranean, Scandinavia, UK)
    { lat: 50, lon: 10, latR: 8, lonR: 16, count: 260 },
    { lat: 42, lon: 2, latR: 6, lonR: 12, count: 180 },
    { lat: 60, lon: 15, latR: 8, lonR: 14, count: 150 }, // Scandinavia
    { lat: 54, lon: -2, latR: 4, lonR: 5, count: 110 },   // UK & Ireland
    { lat: 38, lon: 24, latR: 5, lonR: 10, count: 90 },   // Greece / Balkans
    
    // Asia (Russia/Siberia, China, India, Japan, Korea, SE Asia, Middle East)
    { lat: 34, lon: 105, latR: 16, lonR: 24, count: 420 }, // China/East Asia
    { lat: 58, lon: 80, latR: 14, lonR: 42, count: 320 },  // Russia / Siberia
    { lat: 22, lon: 78, latR: 10, lonR: 14, count: 300 },  // India & South Asia
    { lat: 36, lon: 138, latR: 6, lonR: 5, count: 140 },   // Japan archipelago
    { lat: 37, lon: 127, latR: 4, lonR: 3, count: 90 },    // Korea
    { lat: 10, lon: 106, latR: 10, lonR: 16, count: 220 }, // SE Asia / Indonesia
    { lat: 26, lon: 46, latR: 10, lonR: 14, count: 160 },  // Middle East / Arabian Peninsula
    { lat: 34, lon: 54, latR: 8, lonR: 12, count: 110 },   // Iran / Central Asia
    
    // Africa (North Sahara, Central, Southern, East, Horn, Madagascar)
    { lat: 24, lon: 18, latR: 10, lonR: 22, count: 240 },
    { lat: 4, lon: 22, latR: 12, lonR: 18, count: 300 },
    { lat: -22, lon: 25, latR: 12, lonR: 14, count: 200 },
    { lat: 7, lon: 38, latR: 10, lonR: 10, count: 150 },
    { lat: -19, lon: 47, latR: 6, lonR: 4, count: 70 },   // Madagascar
    
    // Australia & Oceania
    { lat: -25, lon: 134, latR: 12, lonR: 16, count: 240 },
    { lat: -41, lon: 173, latR: 6, lonR: 5, count: 80 },  // New Zealand
    { lat: -4, lon: 140, latR: 4, lonR: 8, count: 70 },   // Papua New Guinea
  ];

  regions.forEach((reg) => {
    for (let i = 0; i < reg.count; i++) {
      const u = Math.random() + Math.random() - 1;
      const v = Math.random() + Math.random() - 1;
      const lat = reg.lat + u * reg.latR;
      const lon = reg.lon + v * reg.lonR;
      if (lat >= -86 && lat <= 86) {
        const isCoast = Math.abs(u) > 0.7 || Math.abs(v) > 0.7;
        points.push({
          pos: latLonToVector3D(lat, lon, radius),
          isCoast
        });
      }
    }
  });

  return points;
}

// Generate continuous 3D latitude & longitude wireframe coordinates
function generateGridRings(radius: number) {
  const latitudeRings: Point3D[][] = [];
  const longitudeRings: Point3D[][] = [];

  const lats = [-60, -40, -20, 0, 20, 40, 60];
  lats.forEach((lat) => {
    const ring: Point3D[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const lon = -180 + (360 / steps) * i;
      ring.push(latLonToVector3D(lat, lon, radius));
    }
    latitudeRings.push(ring);
  });

  for (let lon = -180; lon < 180; lon += 30) {
    const ring: Point3D[] = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const lat = -80 + (160 / steps) * i;
      ring.push(latLonToVector3D(lat, lon, radius));
    }
    longitudeRings.push(ring);
  }

  return { latitudeRings, longitudeRings };
}

export const GlobalNetworkGlobeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Rotation angles (Euler) with faster continuous rotation
  const rotationRef = useRef({ x: 0.22, y: 0.5 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.0075 }); // Fast, sleek rotation

  const isDark = theme === 'dark';

  // 3D Canvas Realistic Photorealistic Rendering Loop
  useEffect(() => {
    if (!animationsEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let globeRadius = 340;
    let globeCenterX = 0;
    let globeCenterY = 0;

    const worldPoints = generateRealisticWorldLandmasses(1);
    const { latitudeRings, longitudeRings } = generateGridRings(1);

    // Realistic Sun directional light vector (illuminates upper-left day side, shadows right night side)
    const sunLightVector: Point3D = {
      x: -0.65,
      y: 0.55,
      z: 0.52
    };
    const sunLen = Math.sqrt(sunLightVector.x ** 2 + sunLightVector.y ** 2 + sunLightVector.z ** 2);
    sunLightVector.x /= sunLen;
    sunLightVector.y /= sunLen;
    sunLightVector.z /= sunLen;

    // Fast traveling data packets with comet trails
    interface DataComet {
      connIndex: number;
      progress: number;
      speed: number;
      tailLength: number;
      color: string;
      trail: { x: number; y: number; alpha: number }[];
    }

    const comets: DataComet[] = NETWORK_CONNECTIONS.map((_, idx) => ({
      connIndex: idx,
      progress: Math.random(),
      speed: 0.007 + Math.random() * 0.007,
      tailLength: 6,
      color: idx % 3 === 0 ? '#38bdf8' : idx % 3 === 1 ? '#34d399' : '#818cf8',
      trail: []
    }));

    // Realistic deep space twinkling stars
    const starCount = 75;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.2 + 0.6,
      alpha: Math.random() * 0.6 + 0.3,
      pulseSpeed: Math.random() * 0.04 + 0.015,
      phase: Math.random() * Math.PI * 2,
    }));

    // Orbiting satellite ring particles
    const satellites = Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      speed: 0.005 + (i % 3) * 0.002,
      orbitRadius: 1.28 + (i % 2) * 0.08,
      inclination: 0.35 + (i % 4) * 0.15,
    }));

    const updateDimensions = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // CENTER OF SCREEN
      globeCenterX = width * 0.5;
      globeCenterY = height * 0.5;
      
      const isMobile = width < 768;
      globeRadius = isMobile 
        ? Math.min(width * 0.44, height * 0.38, 230) 
        : Math.min(width * 0.32, height * 0.42, 350);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // 3D Point Rotation
    const rotatePoint = (p: Point3D, rotX: number, rotY: number): Point3D => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const y1 = p.y;
      const z1 = -p.x * sinY + p.z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      return { x: x2, y: y2, z: z2 };
    };

    // 3D Perspective Projection
    const project = (p3d: Point3D, centerRadius: number) => {
      const fov = 1000;
      const scale = fov / (fov - p3d.z * centerRadius);
      return {
        x: globeCenterX + p3d.x * centerRadius * scale,
        y: globeCenterY - p3d.y * centerRadius * scale,
        z: p3d.z,
        scale,
      };
    };

    let tick = 0;

    const render = () => {
      tick += 0.02;

      // Physics rotation (brisk & fluid)
      if (!isDraggingRef.current) {
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += velocityRef.current.x;
        
        velocityRef.current.x *= 0.96;
        velocityRef.current.y = velocityRef.current.y * 0.96 + 0.0072 * 0.04;
      }

      ctx.clearRect(0, 0, width, height);

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      // 1. Render Deep Space Background Starfield with Atmospheric Twinkle
      stars.forEach((star) => {
        star.phase += star.pulseSpeed;
        const currentAlpha = (Math.sin(star.phase) + 1) * 0.35 + star.alpha * 0.35;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(199, 210, 254, ${currentAlpha * 0.7})`
          : `rgba(99, 102, 241, ${currentAlpha * 0.4})`;
        ctx.fill();
      });

      // 2. Photorealistic Volumetric Atmosphere Halo & Rayleigh Scattering Bloom
      const outerAtmosphere = ctx.createRadialGradient(
        globeCenterX,
        globeCenterY,
        globeRadius * 0.85,
        globeCenterX,
        globeCenterY,
        globeRadius * 1.6
      );

      if (isDark) {
        outerAtmosphere.addColorStop(0, 'rgba(56, 189, 248, 0.45)');  // vibrant electric cyan Rayleigh glow
        outerAtmosphere.addColorStop(0.3, 'rgba(99, 102, 241, 0.28)'); // deep indigo stratospheric halo
        outerAtmosphere.addColorStop(0.65, 'rgba(14, 165, 233, 0.1)'); // outer exosphere
        outerAtmosphere.addColorStop(1, 'rgba(56, 189, 248, 0)');
      } else {
        outerAtmosphere.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
        outerAtmosphere.addColorStop(0.3, 'rgba(14, 165, 233, 0.2)');
        outerAtmosphere.addColorStop(0.65, 'rgba(99, 102, 241, 0.08)');
        outerAtmosphere.addColorStop(1, 'rgba(99, 102, 241, 0)');
      }

      ctx.beginPath();
      ctx.arc(globeCenterX, globeCenterY, globeRadius * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = outerAtmosphere;
      ctx.fill();

      // 3. Photorealistic Earth Sphere Body with Day/Night Sunlight Terminator & Ocean Specular Sheen
      const sunCenterOffsetX = sunLightVector.x * globeRadius * 0.45;
      const sunCenterOffsetY = -sunLightVector.y * globeRadius * 0.45;

      const oceanShader = ctx.createRadialGradient(
        globeCenterX + sunCenterOffsetX,
        globeCenterY + sunCenterOffsetY,
        globeRadius * 0.05,
        globeCenterX,
        globeCenterY,
        globeRadius
      );

      if (isDark) {
        oceanShader.addColorStop(0, 'rgba(30, 58, 138, 0.98)');   // illuminated deep cobalt day ocean
        oceanShader.addColorStop(0.45, 'rgba(15, 23, 42, 0.96)'); // twilight terminator transition
        oceanShader.addColorStop(0.85, 'rgba(3, 7, 18, 0.95)');   // midnight shadowed deep night ocean
        oceanShader.addColorStop(1, 'rgba(30, 27, 75, 0.9)');     // illuminated edge limb
      } else {
        oceanShader.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
        oceanShader.addColorStop(0.45, 'rgba(224, 242, 254, 0.95)');
        oceanShader.addColorStop(0.85, 'rgba(199, 210, 254, 0.92)');
        oceanShader.addColorStop(1, 'rgba(165, 180, 252, 0.85)');
      }

      ctx.beginPath();
      ctx.arc(globeCenterX, globeCenterY, globeRadius, 0, Math.PI * 2);
      ctx.fillStyle = oceanShader;
      ctx.fill();

      // Realistic Luminous Atmospheric Fresnel Limb Ring (grazing angle blue glow)
      ctx.beginPath();
      ctx.arc(globeCenterX, globeCenterY, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.85)' : 'rgba(79, 70, 229, 0.75)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 4. Draw 3D Latitude / Longitude Subtle Coordinate Mesh
      latitudeRings.forEach((ring) => {
        ctx.beginPath();
        let first = true;
        for (let i = 0; i < ring.length; i++) {
          const rotP = rotatePoint(ring[i], rotX, rotY);
          if (rotP.z > -0.1) {
            const proj = project(rotP, globeRadius);
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(99, 102, 241, 0.12)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      longitudeRings.forEach((ring) => {
        ctx.beginPath();
        let first = true;
        for (let i = 0; i < ring.length; i++) {
          const rotP = rotatePoint(ring[i], rotX, rotY);
          if (rotP.z > -0.1) {
            const proj = project(rotP, globeRadius);
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.14)' : 'rgba(14, 165, 233, 0.1)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      // 5. Render Photorealistic Continental Landmasses with Dynamic Lighting Shader
      worldPoints.forEach(({ pos, isCoast }) => {
        const rotated = rotatePoint(pos, rotX, rotY);

        if (rotated.z > -0.05) { // Visible front hemisphere
          const proj = project(rotated, globeRadius);
          
          // Calculate solar lighting angle (Lambertian diffuse)
          const sunDot = dotProduct(rotated, sunLightVector);
          const isSunlit = sunDot > -0.1;
          const lightAmount = Math.max(0, Math.min(1, (sunDot + 0.2) / 1.0)); // 0 (night) to 1 (day)
          const depthAlpha = Math.max(0.2, (rotated.z + 0.1) / 1.1);

          ctx.beginPath();
          const pointRadius = isCoast ? 1.6 : 1.35;
          ctx.arc(proj.x, proj.y, pointRadius, 0, Math.PI * 2);

          if (isDark) {
            if (isSunlit) {
              // Day side: lush vibrant emerald-cyan continents
              const r = Math.round(16 + lightAmount * 40);
              const g = Math.round(185 + lightAmount * 40);
              const b = Math.round(129 + lightAmount * 110);
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${depthAlpha * (0.5 + lightAmount * 0.45)})`;
            } else {
              // Night side: subtle deep twilight land with glowing golden city micro-clusters
              const isCityCluster = isCoast && Math.random() < 0.15;
              if (isCityCluster) {
                ctx.fillStyle = `rgba(251, 191, 36, ${depthAlpha * 0.9})`; // Golden incandescent city light
              } else {
                ctx.fillStyle = `rgba(56, 189, 248, ${depthAlpha * 0.35})`;
              }
            }
          } else {
            // Light mode: High contrast royal indigo and emerald
            const r = Math.round(67 - lightAmount * 20);
            const g = Math.round(56 + lightAmount * 30);
            const b = Math.round(202 - lightAmount * 20);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${depthAlpha * (0.6 + lightAmount * 0.35)})`;
          }
          ctx.fill();
        }
      });

      // 6. Draw 3D Elevated Ballistic Trajectory Arcs with Traveling Glowing Comet Photons
      NETWORK_CONNECTIONS.forEach(([idxA, idxB], connIdx) => {
        const hubA = GLOBAL_HUBS[idxA];
        const hubB = GLOBAL_HUBS[idxB];

        const vecA = latLonToVector3D(hubA.lat, hubA.lon, 1);
        const vecB = latLonToVector3D(hubB.lat, hubB.lon, 1);

        const rotA = rotatePoint(vecA, rotX, rotY);
        const rotB = rotatePoint(vecB, rotX, rotY);

        if (rotA.z > -0.2 || rotB.z > -0.2) {
          const arcSteps = 24;
          const arcPoints: { x: number; y: number; z: number }[] = [];

          // Quadratic Bezier elevated arch
          const midX = (vecA.x + vecB.x) * 0.5;
          const midY = (vecA.y + vecB.y) * 0.5;
          const midZ = (vecA.z + vecB.z) * 0.5;
          const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ) || 1;
          const arcElevation = 1.26;

          const elevatedMid: Point3D = {
            x: (midX / midLen) * arcElevation,
            y: (midY / midLen) * arcElevation,
            z: (midZ / midLen) * arcElevation,
          };

          for (let step = 0; step <= arcSteps; step++) {
            const t = step / arcSteps;
            const bx = (1 - t) * (1 - t) * vecA.x + 2 * (1 - t) * t * elevatedMid.x + t * t * vecB.x;
            const by = (1 - t) * (1 - t) * vecA.y + 2 * (1 - t) * t * elevatedMid.y + t * t * vecB.y;
            const bz = (1 - t) * (1 - t) * vecA.z + 2 * (1 - t) * t * elevatedMid.z + t * t * vecB.z;

            const rotArcPoint = rotatePoint({ x: bx, y: by, z: bz }, rotX, rotY);
            const projArc = project(rotArcPoint, globeRadius);
            arcPoints.push({ x: projArc.x, y: projArc.y, z: rotArcPoint.z });
          }

          // Render glowing arc curve
          ctx.beginPath();
          ctx.moveTo(arcPoints[0].x, arcPoints[0].y);
          for (let i = 1; i < arcPoints.length; i++) {
            ctx.lineTo(arcPoints[i].x, arcPoints[i].y);
          }

          const avgZ = (rotA.z + rotB.z) * 0.5;
          const arcAlpha = Math.max(0.2, (avgZ + 0.4) * 0.7);

          ctx.strokeStyle = isDark
            ? connIdx % 2 === 0
              ? `rgba(56, 189, 248, ${arcAlpha})`
              : `rgba(52, 211, 153, ${arcAlpha})`
            : connIdx % 2 === 0
            ? `rgba(79, 70, 229, ${arcAlpha})`
            : `rgba(5, 150, 105, ${arcAlpha})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Render Fast Data Comet with dynamic glowing tail
          const comet = comets[connIdx];
          if (comet) {
            comet.progress = (comet.progress + comet.speed) % 1;
            const t = comet.progress;

            const px = (1 - t) * (1 - t) * vecA.x + 2 * (1 - t) * t * elevatedMid.x + t * t * vecB.x;
            const py = (1 - t) * (1 - t) * vecA.y + 2 * (1 - t) * t * elevatedMid.y + t * t * vecB.y;
            const pz = (1 - t) * (1 - t) * vecA.z + 2 * (1 - t) * t * elevatedMid.z + t * t * vecB.z;

            const rotComet = rotatePoint({ x: px, y: py, z: pz }, rotX, rotY);
            if (rotComet.z > -0.1) {
              const projP = project(rotComet, globeRadius);

              // 1. Broad outer atmospheric light burst
              ctx.beginPath();
              ctx.arc(projP.x, projP.y, 8.5, 0, Math.PI * 2);
              ctx.fillStyle = isDark
                ? 'rgba(56, 189, 248, 0.35)'
                : 'rgba(99, 102, 241, 0.28)';
              ctx.fill();

              // 2. High-intensity glowing photon head
              ctx.beginPath();
              ctx.arc(projP.x, projP.y, 3.6, 0, Math.PI * 2);
              ctx.fillStyle = comet.color;
              ctx.fill();

              // 3. Superheated white core center
              ctx.beginPath();
              ctx.arc(projP.x, projP.y, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.fill();
            }
          }
        }
      });

      // 7. Render Realistic Global Mega-City Night Lights & Verified Hub Beacons
      GLOBAL_HUBS.forEach((hub, i) => {
        const vec = latLonToVector3D(hub.lat, hub.lon, 1);
        const rotated = rotatePoint(vec, rotX, rotY);

        if (rotated.z > 0) { // Strictly front-facing visible hemisphere
          const proj = project(rotated, globeRadius);
          const sunDot = dotProduct(rotated, sunLightVector);
          const isNightSide = sunDot < 0.2;

          const pulse = (Math.sin(tick * 3.8 + i) + 1) / 2;
          const nodeRadius = 4.5 + pulse * 1.5;

          // Expanding radar ping ripple
          const ringRadius = 8 + pulse * 18;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle =
            hub.status === 'verified'
              ? `rgba(16, 185, 129, ${(1 - pulse) * 0.9})`
              : `rgba(56, 189, 248, ${(1 - pulse) * 0.9})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Megacity Glow Aura on Night Side
          if (isNightSide && isDark) {
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, 14, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(251, 191, 36, 0.25)'; // Golden city light bloom
            ctx.fill();
          }

          // Hub Node Core
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle =
            hub.status === 'verified'
              ? '#10b981'
              : '#38bdf8';
          ctx.fill();

          // Hotspot core
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, nodeRadius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // High-contrast City Label Badge (on prominent front nodes)
          if (rotated.z > 0.35) {
            ctx.save();
            ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            const text = hub.name;
            const textWidth = ctx.measureText(text).width;

            const px = proj.x + 10;
            const py = proj.y - 13;
            const padX = 7;
            const h = 20;
            const w = textWidth + padX * 2;

            // Glassmorphic label pill
            ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.92)';
            ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.5)' : 'rgba(99, 102, 241, 0.4)';
            ctx.lineWidth = 1.2;

            ctx.beginPath();
            ctx.roundRect(px, py, w, h, 6);
            ctx.fill();
            ctx.stroke();

            // City name
            ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
            ctx.fillText(text, px + padX, py + 14);
            ctx.restore();
          }
        }
      });

      // 8. Render Orbiting Starlink / Satellite Constellation
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const satPos: Point3D = {
          x: Math.cos(sat.angle) * sat.orbitRadius,
          y: Math.sin(sat.angle) * sat.orbitRadius * Math.sin(sat.inclination),
          z: Math.sin(sat.angle) * sat.orbitRadius * Math.cos(sat.inclination),
        };

        const rotSat = rotatePoint(satPos, rotX, rotY);
        if (rotSat.z > -0.1) {
          const projSat = project(rotSat, globeRadius);

          ctx.beginPath();
          ctx.arc(projSat.x, projSat.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#38bdf8' : '#6366f1';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(projSat.x, projSat.y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(99, 102, 241, 0.2)';
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationsEnabled, isDark]);

  // Interactive Drag-to-Rotate
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;

    rotationRef.current.y += dx * 0.005;
    rotationRef.current.x -= dy * 0.005;
    rotationRef.current.x = Math.max(-1.1, Math.min(1.1, rotationRef.current.x));

    velocityRef.current = {
      x: -dy * 0.0008,
      y: dx * 0.0008,
    };

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 3D Photorealistic Interactive Center Globe Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          animationsEnabled ? 'opacity-100' : 'opacity-25'
        }`}
        title="Click and drag to spin the Photorealistic 3D Globe"
      />

      {/* Atmospheric Center Deep Nebula Bloom */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
          isDark
            ? 'bg-indigo-950/40 mix-blend-screen opacity-80 animate-pulse'
            : 'bg-indigo-200/50 opacity-70'
        }`}
        style={{ animationDuration: '8s' }}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full blur-[110px] pointer-events-none transition-all duration-1000 ${
          isDark
            ? 'bg-sky-950/30 mix-blend-screen opacity-70'
            : 'bg-sky-200/40 opacity-50'
        }`}
      />

      {/* Floating Bottom Control Button */}
      <div className="fixed bottom-4 right-4 pointer-events-auto z-30 flex items-center space-x-2">
        <button
          type="button"
          id="btn-toggle-bg-animation"
          onClick={() => setAnimationsEnabled((prev) => !prev)}
          title={animationsEnabled ? 'Pause 3D Globe Network motion' : 'Resume 3D Globe Network motion'}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 dark:hover:border-sky-700 shadow-md transition-all cursor-pointer"
        >
          {animationsEnabled ? (
            <>
              <Globe2 className="w-3.5 h-3.5 text-sky-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>3D Globe: Active</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-slate-400" />
              <span>3D Globe: Paused</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
