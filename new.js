// --- 1. DOM Element Selectors ---
const modalBackdrop = document.getElementById("modal-backdrop");
const modal = document.getElementById("modal");
const addTransactionBtn = document.getElementById("add-transaction-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

const transactionForm = document.getElementById("transaction-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const addExpenseBtn = document.getElementById("add-expense-btn");
const addIncomeBtn = document.getElementById("add-income-btn");

const transactionList = document.getElementById("transaction-list");

const totalBalanceEl = document.getElementById("total-balance");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const clearAllBtn = document.getElementById("clear-all-btn");

// --- 2. State ---
// We'll store transactions in an array of objects.
// Load from localStorage if available
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// --- 3. Functions ---

/**
 * Generates a unique ID using timestamp and random number
 */
function generateID() {
  return Date.now() + Math.floor(Math.random() * 1000000);
}

/**
 * Adds a new transaction to the state and updates the DOM
 */
function addTransaction(type) {
  const text = textInput.value;
  const amount = +amountInput.value; // Convert string to number

  // Simple validation
  if (text.trim() === "") {
    alert("Please enter a description for the transaction.");
    textInput.focus();
    return;
  }
  if (amount <= 0 || isNaN(amount)) {
    alert("Please enter a valid positive amount.");
    amountInput.focus();
    return;
  }

  const transaction = {
    id: generateID(),
    text: text,
    amount: amount,
    type: type, // 'credit' or 'debit'
  };

  // Add to our state
  transactions.push(transaction);

  // Save to localStorage
  saveTransactions();

  // Update the DOM
  updateDOM();

  // Clear form and close modal
  textInput.value = "";
  amountInput.value = "";
  closeModal();
}

/**
 * Deletes a transaction by its ID
 */
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveTransactions();
  updateDOM();
}

/**
 * Clears all transactions
 */
function clearAllTransactions() {
  if (transactions.length === 0) return;
  
  if (confirm("Are you sure you want to delete all transactions? This action cannot be undone.")) {
    transactions = [];
    saveTransactions();
    updateDOM();
  }
}

/**
 * Saves transactions to localStorage
 */
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

/**
 * Updates the summary cards (Balance, Income, Expense)
 */
function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "credit") {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
    }
  });

  const totalBalance = totalIncome - totalExpense;

  // Format as Indian Rupees
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  totalBalanceEl.textContent = formatter.format(totalBalance);
  totalIncomeEl.textContent = formatter.format(totalIncome);
  totalExpenseEl.textContent = formatter.format(totalExpense);
}

/**
 * Renders the transaction list to the DOM
 */
function renderTransactionList() {
  // Clear the list first
  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML =
      '<li class="placeholder">No transactions yet.<br><small>Add your first transaction to get started!</small></li>';
    clearAllBtn.style.display = 'none';
    return;
  }

  // Show clear all button if there are transactions
  clearAllBtn.style.display = 'block';

  // Sort transactions by ID (newest first) - you could also add timestamps
  const sortedTransactions = [...transactions].reverse();

  sortedTransactions.forEach((t) => {
    const item = document.createElement("li");
    item.classList.add("transaction-item");

    const isCredit = t.type === "credit";
    const sign = isCredit ? "+" : "-";
    const amountClass = isCredit ? "text-green" : "text-red";

    item.innerHTML = `
      <span>${escapeHtml(t.text)}</span>
      <div class="transaction-details">
        <span class="${amountClass}">
          ${sign}${new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(t.amount)}
        </span>
        <button class="delete-btn" onclick="deleteTransaction(${t.id})" aria-label="Delete transaction">
          &times;
        </button>
      </div>
    `;
    transactionList.appendChild(item);
  });
}

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Main function to update the entire UI
 */
function updateDOM() {
  updateSummary();
  renderTransactionList();
}

/**
 * Modal visibility functions
 */
function openModal() {
  modalBackdrop.classList.remove("hidden");
}

function closeModal() {
  modalBackdrop.classList.add("hidden");
}

// --- 4. Event Listeners ---

// Modal listeners
addTransactionBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  // Close modal if user clicks on the dark backdrop
  if (e.target === modalBackdrop) {
    closeModal();
  }
});

// --- AI popup (floating AI logo) ---
const aiBtn = document.getElementById('ai-btn');
const aiPopup = document.getElementById('ai-popup');
const closeAiBtn = document.getElementById('close-ai-btn');

if (aiBtn && aiPopup) {
  aiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    aiPopup.classList.toggle('show');
    // update ARIA
    const isOpen = aiPopup.classList.contains('show');
    aiPopup.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  // clicking outside should close the popup
  document.addEventListener('click', (ev) => {
    if (!aiPopup.contains(ev.target) && ev.target !== aiBtn) {
      aiPopup.classList.remove('show');
      aiPopup.setAttribute('aria-hidden', 'true');
    }
  });

  if (closeAiBtn) {
    closeAiBtn.addEventListener('click', () => {
      aiPopup.classList.remove('show');
      aiPopup.setAttribute('aria-hidden', 'true');
    });
  }
}

// Form listeners (using button clicks to determine type)
addIncomeBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from submitting normally
  addTransaction("credit");
});

addExpenseBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from submitting normally
  addTransaction("debit");
});

// Clear all button listener
clearAllBtn.addEventListener("click", clearAllTransactions);

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalBackdrop.classList.contains("hidden")) {
    closeModal();
  }
});

// --- 5. Initial Load ---
updateDOM();