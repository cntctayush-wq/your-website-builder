import { useEffect, useRef } from "react";

export function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let hexagons: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      phase: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initHexagons();
    };

    const initHexagons = () => {
      hexagons = [];
      const size = 40;
      const cols = Math.ceil(canvas.width / (size * 1.5)) + 2;
      const rows = Math.ceil(canvas.height / (size * Math.sqrt(3))) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          hexagons.push({
            x: i * size * 1.5,
            y: j * size * Math.sqrt(3) + (i % 2 ? size * Math.sqrt(3) / 2 : 0),
            size: size,
            opacity: Math.random() * 0.15 + 0.05,
            speed: Math.random() * 0.5 + 0.2,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    };

    const drawHex = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      
      const isDark = document.documentElement.classList.contains("dark");
      // Verdant green colors
      ctx.strokeStyle = isDark 
        ? `rgba(74, 222, 128, ${opacity})` 
        : `rgba(22, 163, 74, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      hexagons.forEach((hex) => {
        const pulse = Math.sin(time * hex.speed + hex.phase) * 0.5 + 0.5;
        const opacity = hex.opacity * (0.5 + pulse * 0.5);
        const offsetY = Math.sin(time * hex.speed * 0.5 + hex.phase) * 5;
        drawHex(hex.x, hex.y + offsetY, hex.size, opacity);
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
