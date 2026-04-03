// ============================================================
// UI RENDERING
// ============================================================

const fmt = n => "₹" + Number(n).toLocaleString("en-IN");
const fmtDate = d => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const categoryIcons = {
  Income: "💰", Shopping: "🛍️", Food: "🍔", Utilities: "💡",
  Entertainment: "🎬", Transport: "🚗", Health: "🏥", Education: "📚",
  default: "📦"
};

// ---- SUMMARY CARDS ----
function renderSummaryCards() {
  const stats = state.getStats();
  const isAdmin = state.isAdmin();

  document.getElementById("totalBalance").textContent = fmt(stats.balance);
  document.getElementById("totalIncome").textContent = fmt(stats.income);
  document.getElementById("totalExpense").textContent = fmt(stats.expense);
  document.getElementById("txCount").textContent = stats.count;

  // Balance card color
  const balCard = document.getElementById("balanceCard");
  balCard.classList.toggle("negative", stats.balance < 0);
}

// ---- FILTERS ----
function renderFilters() {
  const cats = state.getCategories();
  const months = state.getMonths();

  const catSel = document.getElementById("filterCategory");
  const monSel = document.getElementById("filterMonth");

  catSel.innerHTML = `<option value="all">All Categories</option>`;
  cats.forEach(c => {
    const o = document.createElement("option");
    o.value = c; o.textContent = c;
    if (state.filters.category === c) o.selected = true;
    catSel.appendChild(o);
  });

  monSel.innerHTML = `<option value="all">All Months</option>`;
  months.forEach(m => {
    const [y, mo] = m.split("-");
    const label = new Date(+y, +mo - 1).toLocaleString("default", { month: "long" }) + " " + y;
    const o = document.createElement("option");
    o.value = m; o.textContent = label;
    if (state.filters.month === m) o.selected = true;
    monSel.appendChild(o);
  });
}

// ---- TRANSACTIONS TABLE ----
function renderTransactions() {
  const list = state.getFiltered();
  const tbody = document.getElementById("txTableBody");
  const empty = document.getElementById("emptyState");

  if (!list.length) {
    tbody.innerHTML = "";
    empty.style.display = "flex";
    return;
  }
  empty.style.display = "none";

  tbody.innerHTML = list.map(t => {
    const icon = categoryIcons[t.category] || categoryIcons.default;
    const isIncome = t.type === "income";
    const adminActions = state.isAdmin() ? `
      <div class="action-btns">
        <button class="btn-icon edit-btn" onclick="openEditModal(${t.id})" title="Edit">✏️</button>
        <button class="btn-icon del-btn" onclick="deleteTransaction(${t.id})" title="Delete">🗑️</button>
      </div>` : `<span class="viewer-badge">View Only</span>`;

    return `
    <tr class="tx-row" data-id="${t.id}">
      <td class="td-date">${fmtDate(t.date)}</td>
      <td class="td-desc">
        <span class="cat-icon">${icon}</span>
        <div>
          <div class="desc-text">${t.description}</div>
          <div class="cat-chip ${t.type}">${t.category}</div>
        </div>
      </td>
      <td class="td-type">
        <span class="type-badge ${t.type}">${isIncome ? "Income" : "Expense"}</span>
      </td>
      <td class="td-amount ${t.type}">
        ${isIncome ? "+" : "-"}${fmt(t.amount)}
      </td>
      <td class="td-actions">${adminActions}</td>
    </tr>`;
  }).join("");
}

// ---- INSIGHTS ----
function renderInsights() {
  const ins = state.getInsights();
  const container = document.getElementById("insightCards");

  const savingsClass = ins.savingsRate >= 20 ? "good" : ins.savingsRate >= 10 ? "warn" : "bad";
  const monthTrend = ins.monthChange
    ? (ins.monthChange.diff > 0
        ? `📈 Spending went up by ${fmt(Math.abs(ins.monthChange.diff))} (${Math.abs(ins.monthChange.pct)}%) vs last month`
        : `📉 Spending went down by ${fmt(Math.abs(ins.monthChange.diff))} (${Math.abs(ins.monthChange.pct)}%) vs last month`)
    : "Not enough data for comparison";

  const top3 = ins.catBreak.slice(0, 3);
  const total = ins.catBreak.reduce((s, [, v]) => s + v, 0);

  container.innerHTML = `
    <div class="insight-card">
      <div class="insight-icon">🏆</div>
      <div class="insight-body">
        <div class="insight-label">Highest Spending Category</div>
        <div class="insight-value">${ins.topCat[0]}</div>
        <div class="insight-sub">${fmt(ins.topCat[1])} total spent</div>
      </div>
    </div>

    <div class="insight-card ${savingsClass}">
      <div class="insight-icon">💎</div>
      <div class="insight-body">
        <div class="insight-label">Savings Rate</div>
        <div class="insight-value">${ins.savingsRate}%</div>
        <div class="insight-sub">${ins.savingsRate >= 20 ? "Excellent! Keep it up 🎉" : ins.savingsRate >= 10 ? "Good, aim for 20%+" : "Try to reduce expenses"}</div>
      </div>
    </div>

    <div class="insight-card">
      <div class="insight-icon">📊</div>
      <div class="insight-body">
        <div class="insight-label">Monthly Comparison</div>
        <div class="insight-value" style="font-size:14px">${monthTrend}</div>
      </div>
    </div>

    <div class="insight-card">
      <div class="insight-icon">🎯</div>
      <div class="insight-body">
        <div class="insight-label">Top 3 Expense Categories</div>
        ${top3.map(([cat, val]) => `
          <div class="mini-bar-row">
            <span>${cat}</span>
            <div class="mini-bar-wrap">
              <div class="mini-bar" style="width:${(val/total*100).toFixed(0)}%"></div>
            </div>
            <span class="mini-bar-val">${fmt(val)}</span>
          </div>`).join("")}
      </div>
    </div>
  `;
}

// ---- SORT INDICATORS ----
function updateSortIndicators() {
  document.querySelectorAll("th[data-sort]").forEach(th => {
    const field = th.dataset.sort;
    const indicator = th.querySelector(".sort-indicator");
    if (!indicator) return;
    if (state.sortBy.field === field) {
      indicator.textContent = state.sortBy.dir === "asc" ? " ▲" : " ▼";
      th.classList.add("active-sort");
    } else {
      indicator.textContent = " ⇅";
      th.classList.remove("active-sort");
    }
  });
}

// ---- ROLE UI ----
function updateRoleUI() {
  const isAdmin = state.isAdmin();
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = isAdmin ? "" : "none";
  });
  document.getElementById("roleTag").textContent = isAdmin ? "👑 Admin" : "👁 Viewer";
  document.getElementById("roleTag").className = "role-tag " + (isAdmin ? "admin" : "viewer");
  document.getElementById("roleSel").value = state.role;
}

// ---- MAIN RENDER ----
function renderAll() {
  renderSummaryCards();
  renderFilters();
  renderTransactions();
  renderInsights();
  updateSortIndicators();
  updateRoleUI();
  Charts.renderAll();
}

// ============================================================
// MODAL - Add / Edit Transaction
// ============================================================
let editingId = null;

function openAddModal() {
  if (!state.isAdmin()) return;
  editingId = null;
  document.getElementById("modalTitle").textContent = "Add Transaction";
  document.getElementById("txForm").reset();
  document.getElementById("txDate").value = new Date().toISOString().slice(0, 10);
  document.getElementById("txModal").classList.add("open");
}

function openEditModal(id) {
  if (!state.isAdmin()) return;
  const t = state.transactions.find(x => x.id === id);
  if (!t) return;
  editingId = id;
  document.getElementById("modalTitle").textContent = "Edit Transaction";
  document.getElementById("txDate").value = t.date;
  document.getElementById("txDesc").value = t.description;
  document.getElementById("txAmount").value = t.amount;
  document.getElementById("txCategory").value = t.category;
  document.getElementById("txType").value = t.type;
  document.getElementById("txModal").classList.add("open");
}

function closeModal() {
  document.getElementById("txModal").classList.remove("open");
  editingId = null;
}

function deleteTransaction(id) {
  if (!state.isAdmin()) return;
  if (!confirm("Delete this transaction?")) return;
  state.deleteTransaction(id);
}

// ============================================================
// EVENT WIRING
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Dark mode
  document.getElementById("darkToggle").addEventListener("click", () => {
    state.toggleDark();
    applyDarkMode();
    Charts.renderAll();
  });

  // Role selector
  document.getElementById("roleSel").addEventListener("change", e => {
    state.setRole(e.target.value);
  });

  // Filters
  document.getElementById("searchInput").addEventListener("input", e => {
    state.setFilter("search", e.target.value);
  });
  document.getElementById("filterType").addEventListener("change", e => {
    state.setFilter("type", e.target.value);
  });
  document.getElementById("filterCategory").addEventListener("change", e => {
    state.setFilter("category", e.target.value);
  });
  document.getElementById("filterMonth").addEventListener("change", e => {
    state.setFilter("month", e.target.value);
  });
  document.getElementById("clearFilters").addEventListener("click", () => {
    state.filters = { search: "", type: "all", category: "all", month: "all" };
    document.getElementById("searchInput").value = "";
    document.getElementById("filterType").value = "all";
    state.emit("stateChange");
  });

  // Sort headers
  document.querySelectorAll("th[data-sort]").forEach(th => {
    th.addEventListener("click", () => state.setSort(th.dataset.sort));
  });

  // Add transaction button
  document.getElementById("addTxBtn").addEventListener("click", openAddModal);

  // Modal form submit
  document.getElementById("txForm").addEventListener("submit", e => {
    e.preventDefault();
    const data = {
      date: document.getElementById("txDate").value,
      description: document.getElementById("txDesc").value.trim(),
      amount: +document.getElementById("txAmount").value,
      category: document.getElementById("txCategory").value,
      type: document.getElementById("txType").value
    };
    if (!data.description || !data.amount) return;

    if (editingId !== null) {
      state.editTransaction(editingId, data);
    } else {
      state.addTransaction(data);
    }
    closeModal();
  });

  // Modal close
  document.getElementById("modalOverlay").addEventListener("click", closeModal);
  document.getElementById("modalClose").addEventListener("click", closeModal);

  // Export
  document.getElementById("exportCSV").addEventListener("click", () => state.exportCSV());
  document.getElementById("exportJSON").addEventListener("click", () => state.exportJSON());

  // Nav tabs
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.dataset.section;
      document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      document.getElementById(target).classList.add("active");
      link.classList.add("active");
      if (target === "dashboard") setTimeout(() => Charts.renderAll(), 50);
    });
  });

  // State subscription
  state.on("stateChange", renderAll);
  state.on("roleChange", updateRoleUI);

  // Initial render
  applyDarkMode();
  renderAll();
  setTimeout(() => Charts.renderAll(), 100);
});

function applyDarkMode() {
  document.body.classList.toggle("dark", state.darkMode);
  document.getElementById("darkToggle").textContent = state.darkMode ? "☀️" : "🌙";
}


