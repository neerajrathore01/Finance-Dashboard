# 💸 FinTrack – Personal Finance Dashboard

A clean, feature-rich finance dashboard built with **Vanilla JavaScript** (no frameworks, no build tools required).

---

## 🚀 How to Run

### Option 1 – Simply open in browser (Easiest)
```bash
# Just double-click index.html in your file explorer
# OR right-click → "Open with" → Chrome/Firefox/Edge
```

### Option 2 – Live Server (Recommended for development)
```bash
# If you have VS Code installed:
# 1. Open the project folder in VS Code
# 2. Install "Live Server" extension (by Ritwick Dey)
# 3. Right-click index.html → "Open with Live Server"
# Opens at http://localhost:5500
```

### Option 3 – Python HTTP Server
```bash
cd finance-dashboard
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

### Option 4 – Node.js (npx serve)
```bash
cd finance-dashboard
npx serve .
# Opens at http://localhost:3000
```

---

## 📁 Project Structure

```
finance-dashboard/
│
├── index.html          # Main HTML — all UI structure
├── css/
│   └── style.css       # All styles, responsive design, dark mode
├── js/
│   ├── state.js        # AppState class — all data & state management
│   ├── charts.js       # Pure Canvas chart rendering (no library!)
│   └── app.js          # UI rendering, event wiring, DOM updates
└── README.md           # This file
```

---

## ✨ Features

### 1. Dashboard Overview
- **4 Summary Cards**: Total Balance, Income, Expenses, Transaction Count
- **Monthly Bar + Line Chart**: Income vs Expenses per month (Jan–Jun 2025)
- **Donut Chart**: Expense category breakdown with percentages

### 2. Transactions Section
- Full transactions table with Date, Description, Category, Type, Amount
- **Search**: Live text search across description and category
- **Filters**: By type (income/expense), category, and month
- **Sorting**: Click any column header to sort (asc/desc toggle)
- **Empty state**: Graceful UI when no results match filters

### 3. Role-Based UI (RBAC Simulation)
| Feature | Viewer | Admin |
|---------|--------|-------|
| View dashboard & charts | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| Add transactions | ❌ | ✅ |
| Edit transactions | ❌ | ✅ |
| Delete transactions | ❌ | ✅ |
| Export data | ✅ | ✅ |

Switch roles via the **sidebar dropdown** (bottom-left).

### 4. Insights Section
- 🏆 Highest spending category
- 💎 Savings rate with health indicator (green/amber/red)
- 📊 Month-over-month spending comparison
- 🎯 Top 3 categories with visual progress bars

### 5. State Management
- **AppState class** in `state.js` is the single source of truth
- **Pub/Sub pattern** (`state.on()`, `state.emit()`) for reactive updates
- **LocalStorage persistence** — data survives page refresh
- Filters, role, dark mode all persisted automatically

### 6. UI/UX
- Dark/Light mode toggle (☀️/🌙)
- Fully responsive (desktop, tablet, mobile)
- Smooth animations and transitions
- Hover states and micro-interactions

### 7. Optional Enhancements Included
- ✅ Dark mode
- ✅ Data persistence (LocalStorage)
- ✅ Export to CSV and JSON
- ✅ Advanced filtering (search + type + category + month)
- ✅ Custom chart rendering (no Chart.js needed!)

---

## 🛠️ Technical Approach

### No Build Step
Zero configuration. No npm install, no webpack, no babel. Open in browser and it works.

### State Management Pattern
```javascript
// Pub/Sub for reactive UI
state.on("stateChange", renderAll);
state.on("roleChange", updateRoleUI);

// State mutations trigger re-renders
state.addTransaction(data); // → emits stateChange → renderAll()
```

### Chart Rendering
Charts are drawn on `<canvas>` elements using the native Canvas 2D API. No Chart.js, Recharts, or any library. This keeps bundle size at zero.

### CSS Architecture
- CSS Custom Properties (variables) for theming
- Single stylesheet, no preprocessor needed
- Mobile-first responsive design with media queries

---

## 📊 Sample Data

48 pre-loaded transactions spanning Jan–Jun 2025 across:
- **Income sources**: Salary, Freelance, Bonus, Investments, Dividends
- **Expense categories**: Food, Shopping, Utilities, Entertainment, Transport, Health, Education

---

## 🎨 Design Decisions

- **Font**: Outfit (display) + JetBrains Mono (numbers) — distinctive, readable
- **Color**: Indigo primary (#6366f1) with semantic green/red for income/expense
- **Layout**: Fixed sidebar + scrollable content area
- **Animation**: CSS transitions for all interactive states

---

Made with ❤️ using Vanilla JS, HTML5 Canvas, and CSS Variables.
# Finance-Dashboard
# Finance-Dashboard
# Finance-Dashboard
# Finance-Dashboard
