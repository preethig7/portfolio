/**
 * Cybersecurity Interactive Node Network Visualizer
 * Renders an abstract, professional network topology with defensive telemetry,
 * data packet transmission, and interactive mouse interaction.
 */

(function () {
  const canvas = document.getElementById('cyber-hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let animationFrameId;

  // Nodes & Configuration
  const nodeCount = 38;
  const maxDistance = 140;
  const nodes = [];
  const packets = [];
  const mouse = { x: null, y: null, radius: 120 };

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2.2 + 1.8;
      this.baseColor = Math.random() > 0.3 ? '#00f0ff' : (Math.random() > 0.5 ? '#38bdf8' : '#818cf8');
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.03 + Math.random() * 0.02;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;

      // Bounce smoothly off boundaries
      if (this.x < 10) { this.x = 10; this.vx *= -1; }
      if (this.x > width - 10) { this.x = width - 10; this.vx *= -1; }
      if (this.y < 10) { this.y = 10; this.vy *= -1; }
      if (this.y > height - 10) { this.y = height - 10; this.vy *= -1; }

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2.5;
          this.y -= Math.sin(angle) * force * 2.5;
        }
      }
    }

    draw() {
      const glow = (Math.sin(this.pulse) + 1) * 0.5;
      
      // Outer ring for key nodes
      if (this.radius > 3) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 4 + glow * 3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, ' + (0.15 + glow * 0.2) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Core node
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  class Packet {
    constructor(startNode, endNode) {
      this.start = startNode;
      this.end = endNode;
      this.progress = 0;
      this.speed = 0.012 + Math.random() * 0.015;
    }

    update() {
      this.progress += this.speed;
      return this.progress < 1;
    }

    draw() {
      const px = this.start.x + (this.end.x - this.start.x) * this.progress;
      const py = this.start.y + (this.end.y - this.start.y) * this.progress;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function init() {
    resize();
    nodes.length = 0;
    packets.length = 0;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }
  }

  function spawnPackets() {
    if (packets.length < 6 && Math.random() < 0.08) {
      const n1 = nodes[Math.floor(Math.random() * nodes.length)];
      // find a neighbor within maxDistance
      const neighbors = nodes.filter(n2 => {
        if (n1 === n2) return false;
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        return Math.sqrt(dx * dx + dy * dy) < maxDistance;
      });
      if (neighbors.length > 0) {
        const n2 = neighbors[Math.floor(Math.random() * neighbors.length)];
        packets.push(new Packet(n1, n2));
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle background cyber grid lines
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 45;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Connect nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Update and draw packets
    spawnPackets();
    for (let i = packets.length - 1; i >= 0; i--) {
      if (packets[i].update()) {
        packets[i].draw();
      } else {
        packets.splice(i, 1);
      }
    }

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }

    // Draw mouse scanner reticle if mouse is over canvas
    if (mouse.x !== null && mouse.y !== null) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 24, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    resize();
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Touch support for mobile/tablet
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  init();
  animate();
})();
