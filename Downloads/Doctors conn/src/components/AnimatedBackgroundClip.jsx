import React, { useEffect, useRef } from 'react';
import { Heart, Activity, ShieldAlert, Droplet, Plus, Wind } from 'lucide-react';

export default function AnimatedBackgroundClip({ variant = 'splash' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle nodes for fluid wave connection
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.5 + 0.2
    }));

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      step += 0.015;

      // Draw fluid animated sine waves (background video effect)
      ctx.lineWidth = 1.5;

      // Wave 1
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = Math.sin(x * 0.008 + step) * 25 + Math.cos(x * 0.004 + step * 0.5) * 15 + canvas.height * 0.45;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = variant === 'splash' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(11, 93, 113, 0.12)';
      ctx.stroke();

      // Wave 2
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = Math.cos(x * 0.01 - step * 0.8) * 30 + Math.sin(x * 0.005 + step) * 20 + canvas.height * 0.55;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = variant === 'splash' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.14)';
      ctx.stroke();

      // Animated ECG heartbeat wave trace in middle
      if (variant === 'splash' || variant === 'onboarding') {
        ctx.beginPath();
        const ecgY = canvas.height * 0.68;
        for (let x = 0; x < canvas.width; x += 3) {
          let offset = 0;
          const pos = (x + step * 120) % canvas.width;
          if (pos > 100 && pos < 120) offset = -18;
          else if (pos >= 120 && pos < 135) offset = 28;
          else if (pos >= 135 && pos < 150) offset = -35;
          else if (pos >= 150 && pos < 165) offset = 15;
          
          const y = ecgY + offset;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = variant === 'splash' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(11, 93, 113, 0.18)';
        ctx.stroke();
      }

      // Draw floating glowing particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = variant === 'splash' ? `rgba(255, 255, 255, ${p.alpha})` : `rgba(11, 93, 113, ${p.alpha * 0.6})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <div className="animated-clip-wrapper">
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Floating Animated Icons Stream */}
      <div className="floating-icons-container">
        <div className="float-icon float-1">
          <Heart size={20} color={variant === 'splash' ? '#38bdf8' : '#0b5d71'} />
        </div>
        <div className="float-icon float-2">
          <Activity size={22} color={variant === 'splash' ? '#ffffff' : '#0284c7'} />
        </div>
        <div className="float-icon float-3">
          <Droplet size={18} color={variant === 'splash' ? '#38bdf8' : '#0d9488'} />
        </div>
        <div className="float-icon float-4">
          <Plus size={24} color={variant === 'splash' ? '#ffffff' : '#10b981'} />
        </div>
        <div className="float-icon float-5">
          <Wind size={20} color={variant === 'splash' ? '#38bdf8' : '#e11d48'} />
        </div>
      </div>

      <style>{`
        .animated-clip-wrapper {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .background-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        .floating-icons-container {
          position: absolute;
          inset: 0;
        }

        .float-icon {
          position: absolute;
          opacity: 0.45;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }

        .float-1 {
          top: 15%;
          left: 10%;
          animation: floatMotion1 8s ease-in-out infinite alternate;
        }

        .float-2 {
          top: 25%;
          right: 12%;
          animation: floatMotion2 10s ease-in-out infinite alternate;
        }

        .float-3 {
          bottom: 30%;
          left: 14%;
          animation: floatMotion3 9s ease-in-out infinite alternate;
        }

        .float-4 {
          bottom: 18%;
          right: 15%;
          animation: floatMotion1 11s ease-in-out infinite alternate;
        }

        .float-5 {
          top: 50%;
          left: 48%;
          animation: floatMotion2 12s ease-in-out infinite alternate;
        }

        @keyframes floatMotion1 {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-18px) rotate(12deg) scale(1.1); }
          100% { transform: translateY(10px) rotate(-8deg) scale(0.95); }
        }

        @keyframes floatMotion2 {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(22px) rotate(-15deg) scale(1.12); }
          100% { transform: translateY(-12px) rotate(10deg) scale(0.9); }
        }

        @keyframes floatMotion3 {
          0% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          50% { transform: translateX(15px) translateY(-14px) rotate(20deg); }
          100% { transform: translateX(-10px) translateY(8px) rotate(-10deg); }
        }
      `}</style>
    </div>
  );
}
