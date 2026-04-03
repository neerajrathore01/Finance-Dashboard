// ============================================================
// CHARTS - Pure Canvas / SVG rendering, no library needed
// ============================================================

const Charts = {
  colors: [
    "#6366f1", "#f59e0b", "#10b981", "#ef4444",
    "#8b5cf6", "#06b6d4", "#f97316", "#84cc16",
    "#ec4899", "#14b8a6"
  ],

  fmt(n) {
    if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
    if (n >= 1000) return "₹" + (n / 1000).toFixed(1) + "K";
    return "₹" + n;
  },

  // ---- LINE / BAR combo chart for monthly trend ----
  renderMonthly(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const data = state.getMonthlyData();
    if (!data.length) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width, H = rect.height;
    const pad = { top: 24, right: 20, bottom: 52, left: 64 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;

    const dark = state.darkMode;
    const textColor = dark ? "#cbd5e1" : "#475569";
    const gridColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
    const bgColor = dark ? "#1e293b" : "#ffffff";

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    const allVals = data.flatMap(([, v]) => [v.income, v.expense]);
    const maxVal = Math.max(...allVals, 1);

    const labels = data.map(([m]) => {
      const [y, mo] = m.split("-");
      return new Date(+y, +mo - 1).toLocaleString("default", { month: "short" }) + " " + y.slice(2);
    });

    const barW = Math.min(cW / data.length * 0.35, 28);
    const gap = cW / data.length;

    // Grid lines
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + cH - (cH * i / 4);
      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cW, y);
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = `10px 'Outfit', sans-serif`;
      ctx.textAlign = "right";
      ctx.fillText(this.fmt(maxVal * i / 4), pad.left - 8, y + 4);
    }

    // Bars and line points
    const incomePoints = [], expensePoints = [];

    data.forEach(([, v], i) => {
      const cx = pad.left + gap * i + gap / 2;

      // Income bar
      const iH = (v.income / maxVal) * cH;
      ctx.fillStyle = "rgba(99, 102, 241, 0.8)";
      ctx.beginPath();
      ctx.roundRect(cx - barW - 2, pad.top + cH - iH, barW, iH, [4, 4, 0, 0]);
      ctx.fill();

      // Expense bar
      const eH = (v.expense / maxVal) * cH;
      ctx.fillStyle = "rgba(239, 68, 68, 0.75)";
      ctx.beginPath();
      ctx.roundRect(cx + 2, pad.top + cH - eH, barW, eH, [4, 4, 0, 0]);
      ctx.fill();

      incomePoints.push({ x: cx, y: pad.top + cH - iH });
      expensePoints.push({ x: cx, y: pad.top + cH - eH });

      // Label
      ctx.fillStyle = textColor;
      ctx.font = `10px 'Outfit', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(labels[i], cx, pad.top + cH + 18);
    });

    // Draw smooth line for balance
    const drawLine = (pts, color) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.stroke();

      pts.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = bgColor;
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    drawLine(incomePoints, "#6366f1");
    drawLine(expensePoints, "#ef4444");

    // Legend
    const legendItems = [
      { label: "Income", color: "#6366f1" },
      { label: "Expenses", color: "#ef4444" }
    ];
    let lx = pad.left;
    legendItems.forEach(item => {
      ctx.fillStyle = item.color;
      ctx.fillRect(lx, H - 18, 12, 12);
      ctx.fillStyle = textColor;
      ctx.font = `11px 'Outfit', sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText(item.label, lx + 16, H - 8);
      lx += 80;
    });
  },

  // ---- DONUT CHART for category breakdown ----
  renderDonut(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const data = state.getCategoryBreakdown();
    if (!data.length) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width, H = rect.height;

    const dark = state.darkMode;
    const bgColor = dark ? "#1e293b" : "#ffffff";
    const textColor = dark ? "#cbd5e1" : "#475569";

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    const total = data.reduce((s, [, v]) => s + v, 0);
    const cx = W * 0.38, cy = H / 2;
    const outerR = Math.min(cx, cy) - 16;
    const innerR = outerR * 0.6;

    let startAngle = -Math.PI / 2;

    data.slice(0, 8).forEach(([cat, val], i) => {
      const slice = (val / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, outerR, startAngle, startAngle + slice);
      ctx.closePath();
      ctx.fillStyle = this.colors[i % this.colors.length];
      ctx.fill();
      ctx.strokeStyle = bgColor;
      ctx.lineWidth = 2;
      ctx.stroke();
      startAngle += slice;
    });

    // Donut hole
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = bgColor;
    ctx.fill();

    // Center text
    ctx.textAlign = "center";
    ctx.fillStyle = dark ? "#e2e8f0" : "#1e293b";
    ctx.font = `bold 15px 'Outfit', sans-serif`;
    ctx.fillText("Expenses", cx, cy - 8);
    ctx.font = `bold 16px 'Outfit', sans-serif`;
    ctx.fillStyle = "#6366f1";
    ctx.fillText(this.fmt(total), cx, cy + 12);

    // Legend
    const lx = W * 0.65, lyStart = 20;
    data.slice(0, 8).forEach(([cat, val], i) => {
      const pct = ((val / total) * 100).toFixed(1);
      const ly = lyStart + i * 28;

      ctx.fillStyle = this.colors[i % this.colors.length];
      ctx.beginPath();
      ctx.roundRect(lx, ly, 12, 12, 3);
      ctx.fill();

      ctx.fillStyle = dark ? "#e2e8f0" : "#1e293b";
      ctx.font = `500 12px 'Outfit', sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText(cat, lx + 18, ly + 10);

      ctx.fillStyle = textColor;
      ctx.font = `11px 'Outfit', sans-serif`;
      ctx.textAlign = "right";
      ctx.fillText(`${pct}%`, W - 12, ly + 10);
    });
  },

  // Redraw all charts
  renderAll() {
    this.renderMonthly("monthlyChart");
    this.renderDonut("donutChart");
  }
};

// Re-render on resize
window.addEventListener("resize", () => Charts.renderAll());
