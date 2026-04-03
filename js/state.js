// ============================================================
// STATE MANAGEMENT - Single source of truth
// ============================================================

const defaultTransactions = [
  { id: 1, date: "2025-01-05", description: "Salary", amount: 85000, category: "Income", type: "income" },
  { id: 2, date: "2025-01-07", description: "Amazon Shopping", amount: 3200, category: "Shopping", type: "expense" },
  { id: 3, date: "2025-01-10", description: "Electricity Bill", amount: 1800, category: "Utilities", type: "expense" },
  { id: 4, date: "2025-01-12", description: "Swiggy Food Order", amount: 850, category: "Food", type: "expense" },
  { id: 5, date: "2025-01-15", description: "Netflix Subscription", amount: 649, category: "Entertainment", type: "expense" },
  { id: 6, date: "2025-01-18", description: "Freelance Project", amount: 22000, category: "Income", type: "income" },
  { id: 7, date: "2025-01-20", description: "Petrol", amount: 2500, category: "Transport", type: "expense" },
  { id: 8, date: "2025-01-22", description: "Medicine", amount: 1200, category: "Health", type: "expense" },
  { id: 9, date: "2025-01-25", description: "Book Purchase", amount: 650, category: "Education", type: "expense" },
  { id: 10, date: "2025-01-28", description: "Gym Membership", amount: 1500, category: "Health", type: "expense" },

  { id: 11, date: "2025-02-05", description: "Salary", amount: 85000, category: "Income", type: "income" },
  { id: 12, date: "2025-02-08", description: "Zomato Order", amount: 1200, category: "Food", type: "expense" },
  { id: 13, date: "2025-02-10", description: "Internet Bill", amount: 999, category: "Utilities", type: "expense" },
  { id: 14, date: "2025-02-12", description: "Movie Tickets", amount: 600, category: "Entertainment", type: "expense" },
  { id: 15, date: "2025-02-14", description: "Valentine Gift", amount: 3500, category: "Shopping", type: "expense" },
  { id: 16, date: "2025-02-16", description: "Dividend Income", amount: 5000, category: "Income", type: "income" },
  { id: 17, date: "2025-02-20", description: "Uber Rides", amount: 1800, category: "Transport", type: "expense" },
  { id: 18, date: "2025-02-25", description: "Online Course", amount: 4999, category: "Education", type: "expense" },

  { id: 19, date: "2025-03-05", description: "Salary", amount: 85000, category: "Income", type: "income" },
  { id: 20, date: "2025-03-06", description: "Grocery", amount: 4200, category: "Food", type: "expense" },
  { id: 21, date: "2025-03-10", description: "Phone Bill", amount: 499, category: "Utilities", type: "expense" },
  { id: 22, date: "2025-03-14", description: "Clothing", amount: 5800, category: "Shopping", type: "expense" },
  { id: 23, date: "2025-03-18", description: "Consulting Fee", amount: 18000, category: "Income", type: "income" },
  { id: 24, date: "2025-03-20", description: "Doctor Visit", amount: 800, category: "Health", type: "expense" },
  { id: 25, date: "2025-03-24", description: "Spotify", amount: 119, category: "Entertainment", type: "expense" },
  { id: 26, date: "2025-03-28", description: "Petrol", amount: 2800, category: "Transport", type: "expense" },

  { id: 27, date: "2025-04-05", description: "Salary", amount: 90000, category: "Income", type: "income" },
  { id: 28, date: "2025-04-07", description: "Restaurant Dinner", amount: 2200, category: "Food", type: "expense" },
  { id: 29, date: "2025-04-10", description: "Water Bill", amount: 350, category: "Utilities", type: "expense" },
  { id: 30, date: "2025-04-15", description: "Shoes Purchase", amount: 3999, category: "Shopping", type: "expense" },
  { id: 31, date: "2025-04-18", description: "Bonus", amount: 15000, category: "Income", type: "income" },
  { id: 32, date: "2025-04-22", description: "Flight Ticket", amount: 8500, category: "Transport", type: "expense" },
  { id: 33, date: "2025-04-26", description: "Vitamins", amount: 950, category: "Health", type: "expense" },

  { id: 34, date: "2025-05-05", description: "Salary", amount: 90000, category: "Income", type: "income" },
  { id: 35, date: "2025-05-08", description: "Blinkit Grocery", amount: 3600, category: "Food", type: "expense" },
  { id: 36, date: "2025-05-12", description: "Amazon Prime", amount: 1499, category: "Entertainment", type: "expense" },
  { id: 37, date: "2025-05-15", description: "Freelance", amount: 25000, category: "Income", type: "income" },
  { id: 38, date: "2025-05-18", description: "Electricity Bill", amount: 2100, category: "Utilities", type: "expense" },
  { id: 39, date: "2025-05-22", description: "Metro Card", amount: 500, category: "Transport", type: "expense" },
  { id: 40, date: "2025-05-28", description: "Laptop Stand", amount: 2200, category: "Shopping", type: "expense" },

  { id: 41, date: "2025-06-05", description: "Salary", amount: 90000, category: "Income", type: "income" },
  { id: 42, date: "2025-06-07", description: "Cafe Coffee", amount: 680, category: "Food", type: "expense" },
  { id: 43, date: "2025-06-10", description: "Investment Return", amount: 12000, category: "Income", type: "income" },
  { id: 44, date: "2025-06-14", description: "Summer Clothes", amount: 6200, category: "Shopping", type: "expense" },
  { id: 45, date: "2025-06-18", description: "Gas Bill", amount: 750, category: "Utilities", type: "expense" },
  { id: 46, date: "2025-06-20", description: "Ola Cabs", amount: 1400, category: "Transport", type: "expense" },
  { id: 47, date: "2025-06-25", description: "Dentist", amount: 2500, category: "Health", type: "expense" },
  { id: 48, date: "2025-06-28", description: "Concert Tickets", amount: 3000, category: "Entertainment", type: "expense" },
];

// ============================================================
// AppState Class - Manages all application state
// ============================================================
class AppState {
  constructor() {
    this.transactions = [];
    this.role = "viewer"; // 'admin' or 'viewer'
    this.filters = { search: "", type: "all", category: "all", month: "all" };
    this.sortBy = { field: "date", dir: "desc" };
    this.darkMode = false;
    this.nextId = 49;
    this.subscribers = {};

    this._loadFromStorage();
  }

  // ---------- Pub/Sub ----------
  on(event, fn) {
    if (!this.subscribers[event]) this.subscribers[event] = [];
    this.subscribers[event].push(fn);
  }

  emit(event, data) {
    (this.subscribers[event] || []).forEach(fn => fn(data));
  }

  // ---------- Persistence ----------
  _loadFromStorage() {
    try {
      const saved = localStorage.getItem("financeApp");
      if (saved) {
        const d = JSON.parse(saved);
        this.transactions = d.transactions || defaultTransactions;
        this.role = d.role || "viewer";
        this.darkMode = d.darkMode || false;
        this.nextId = d.nextId || 49;
      } else {
        this.transactions = [...defaultTransactions];
      }
    } catch {
      this.transactions = [...defaultTransactions];
    }
  }

  _save() {
    try {
      localStorage.setItem("financeApp", JSON.stringify({
        transactions: this.transactions,
        role: this.role,
        darkMode: this.darkMode,
        nextId: this.nextId
      }));
    } catch {}
  }

  // ---------- Role ----------
  setRole(role) {
    this.role = role;
    this._save();
    this.emit("roleChange", role);
    this.emit("stateChange");
  }

  isAdmin() { return this.role === "admin"; }

  // ---------- Dark Mode ----------
  toggleDark() {
    this.darkMode = !this.darkMode;
    this._save();
    this.emit("darkModeChange", this.darkMode);
  }

  // ---------- Filters ----------
  setFilter(key, val) {
    this.filters[key] = val;
    this.emit("filterChange", this.filters);
    this.emit("stateChange");
  }

  setSort(field) {
    if (this.sortBy.field === field) {
      this.sortBy.dir = this.sortBy.dir === "asc" ? "desc" : "asc";
    } else {
      this.sortBy = { field, dir: "desc" };
    }
    this.emit("stateChange");
  }

  // ---------- Derived / Filtered Data ----------
  getFiltered() {
    let list = [...this.transactions];
    const f = this.filters;

    if (f.search) {
      const q = f.search.toLowerCase();
      list = list.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    if (f.type !== "all") list = list.filter(t => t.type === f.type);
    if (f.category !== "all") list = list.filter(t => t.category === f.category);
    if (f.month !== "all") list = list.filter(t => t.date.startsWith(f.month));

    const sf = this.sortBy;
    list.sort((a, b) => {
      let va = a[sf.field], vb = b[sf.field];
      if (sf.field === "amount") { va = +va; vb = +vb; }
      if (va < vb) return sf.dir === "asc" ? -1 : 1;
      if (va > vb) return sf.dir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }

  getStats() {
    const all = this.transactions;
    const income = all.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = all.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense, count: all.length };
  }

  getCategoryBreakdown() {
    const expenses = this.transactions.filter(t => t.type === "expense");
    const map = {};
    expenses.forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }

  getMonthlyData() {
    const map = {};
    this.transactions.forEach(t => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { income: 0, expense: 0 };
      map[m][t.type] += t.amount;
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }

  getInsights() {
    const catBreak = this.getCategoryBreakdown();
    const monthly = this.getMonthlyData();
    const topCat = catBreak[0] || ["N/A", 0];
    const lastTwo = monthly.slice(-2);
    const savingsRate = this.getStats().income
      ? ((this.getStats().balance / this.getStats().income) * 100).toFixed(1)
      : 0;
    let monthChange = null;
    if (lastTwo.length === 2) {
      const diff = lastTwo[1][1].expense - lastTwo[0][1].expense;
      monthChange = { diff, pct: ((diff / (lastTwo[0][1].expense || 1)) * 100).toFixed(1) };
    }
    return { topCat, monthChange, savingsRate, catBreak };
  }

  getCategories() {
    return [...new Set(this.transactions.map(t => t.category))].sort();
  }

  getMonths() {
    return [...new Set(this.transactions.map(t => t.date.slice(0, 7)))].sort().reverse();
  }

  // ---------- CRUD ----------
  addTransaction(data) {
    if (!this.isAdmin()) return false;
    const t = { ...data, id: this.nextId++ };
    this.transactions.unshift(t);
    this._save();
    this.emit("stateChange");
    return true;
  }

  editTransaction(id, data) {
    if (!this.isAdmin()) return false;
    const idx = this.transactions.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.transactions[idx] = { ...this.transactions[idx], ...data };
    this._save();
    this.emit("stateChange");
    return true;
  }

  deleteTransaction(id) {
    if (!this.isAdmin()) return false;
    this.transactions = this.transactions.filter(t => t.id !== id);
    this._save();
    this.emit("stateChange");
    return true;
  }

  exportJSON() {
    const blob = new Blob([JSON.stringify(this.transactions, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.json";
    a.click();
  }

  exportCSV() {
    const headers = ["ID", "Date", "Description", "Category", "Type", "Amount"];
    const rows = this.transactions.map(t =>
      [t.id, t.date, `"${t.description}"`, t.category, t.type, t.amount].join(",")
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.csv";
    a.click();
  }
}

const state = new AppState();
