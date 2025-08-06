import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../App.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = () => {
    if (title && amount) {
      setExpenses([...expenses, { title, amount: parseFloat(amount) }]);
      setTitle('');
      setAmount('');
    }
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add</button>
      </div>

      <div className="list-section">
        <h2>Expenses</h2>
        <ul>
          {expenses.map((item, idx) => (
            <li key={idx}>
              {item.title} - ₹{item.amount.toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total: ₹{total.toFixed(2)}</h3>
      </div>

      <div className="chart-section">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenses}
              dataKey="amount"
              nameKey="title"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {expenses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseTracker;
