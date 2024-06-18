const transactionForm = document.getElementById('transaction-form');
const expenseList = document.getElementById('expense-list');
const incomeList = document.getElementById('income-list');
const totalExpensesElement = document.getElementById('totalExpenses');
const remainingMoneyElement = document.getElementById('remainingMoney');
const updateButton = document.getElementById('update-button');

let selectedTransactionId = null;


async function fetchTransactions() {
  try {
    const res = await fetch('http://localhost:3000/transactions');
    const transactions = await res.json();

    let totalExpenses = 0;
    let totalIncome = 0;

    expenseList.innerHTML = '';
    incomeList.innerHTML = '';

    transactions.forEach(transaction => {
      const listItem = document.createElement('li');
      listItem.textContent = `${transaction.description} - Rs. ${transaction.amount} - ${transaction.category}`;
      listItem.setAttribute('data-t-id', transaction._id);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async (e) => {
        e.stopPropagation();
        await deleteTransaction(transaction._id);
      });
      listItem.appendChild(deleteButton);

      listItem.addEventListener('click', () => {
        selectedTransactionId = transaction._id;
        document.getElementById('description').value = transaction.description;
        document.getElementById('amount').value = transaction.amount;
        document.getElementById('category').value = transaction.category;
        document.getElementById('type').value = transaction.type;
      });

      if (transaction.type === 'expense') {
        expenseList.appendChild(listItem);
        totalExpenses += transaction.amount;
      } else if (transaction.type === 'income') {
        incomeList.appendChild(listItem);
        totalIncome += transaction.amount;
      }
    });

    totalExpensesElement.textContent = `Rs. ${totalExpenses.toFixed(2)}`;
    remainingMoneyElement.textContent = `Rs. ${(totalIncome - totalExpenses).toFixed(2)}`;

  } catch (error) {
    console.error('Error fetching transactions:', error.message);
  }
}

transactionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const type = document.getElementById('type').value;

  const transactionData = {
    description,
    amount,
    category,
    type
  };

  try {
    const res = await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (res.ok) {
      transactionForm.reset();
      selectedTransactionId = null;
      fetchTransactions();
    } else {
      const { message } = await res.json();
      alert(`Failed to add transaction: ${message}`);
    }
  } catch (error) {
    console.error('Error adding transaction:', error.message);
  }
});

updateButton.addEventListener('click', async () => {
  if (!selectedTransactionId) {
    alert('Please select a transaction to update');
    return;
  }

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const type = document.getElementById('type').value;

  const transactionData = {
    description,
    amount,
    category,
    type
  };

  try {
    const res = await fetch(`http://localhost:3000/transactions/${selectedTransactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (res.ok) {
      transactionForm.reset();
      selectedTransactionId = null;
      fetchTransactions();
    } else {
      const { message } = await res.json();
      alert(`Failed to update transaction: ${message}`);
    }
  } catch (error) {
    console.error('Error updating transaction:', error.message);
  }
});

async function deleteTransaction(transactionId) {
  try {
    const res = await fetch(`http://localhost:3000/transactions/${transactionId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      transactionForm.reset();
      selectedTransactionId = null;
      fetchTransactions();
    } else {
      const { message } = await res.json();
      alert(`Failed to delete transaction: ${message}`);
    }
  } catch (error) {
    console.error('Error deleting transaction:', error.message);
  }
}

fetchTransactions();
