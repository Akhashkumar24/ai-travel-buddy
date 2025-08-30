// src/components/tools/BudgetTracker.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, MinusIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const BudgetTracker = ({ trip }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: 'food',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    { id: 'food', name: 'Food & Dining', color: 'bg-green-100 text-green-800' },
    { id: 'transport', name: 'Transportation', color: 'bg-blue-100 text-blue-800' },
    { id: 'accommodation', name: 'Accommodation', color: 'bg-purple-100 text-purple-800' },
    { id: 'activities', name: 'Activities', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'shopping', name: 'Shopping', color: 'bg-pink-100 text-pink-800' },
    { id: 'other', name: 'Other', color: 'bg-gray-100 text-gray-800' }
  ];

  const addExpense = () => {
    if (newExpense.amount && newExpense.description) {
      setExpenses([...expenses, {
        ...newExpense,
        id: Date.now(),
        amount: parseFloat(newExpense.amount)
      }]);
      setNewExpense({
        category: 'food',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = (trip?.budget?.total || 0) - totalSpent;

  const expensesByCategory = categories.map(category => ({
    ...category,
    amount: expenses
      .filter(exp => exp.category === category.id)
      .reduce((sum, exp) => sum + exp.amount, 0)
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <CurrencyDollarIcon className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Budget Tracker</h3>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {trip?.budget?.currency || '$'}{(trip?.budget?.total || 0).toLocaleString()}
          </div>
          <div className="text-sm text-blue-800">Total Budget</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {trip?.budget?.currency || '$'}{totalSpent.toLocaleString()}
          </div>
          <div className="text-sm text-red-800">Spent</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {trip?.budget?.currency || '$'}{remainingBudget.toLocaleString()}
          </div>
          <div className="text-sm text-green-800">Remaining</div>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Add Expense</h4>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            placeholder="Amount"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            placeholder="Description"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={addExpense}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Expense
        </button>
      </div>

      {/* Expenses List */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Recent Expenses</h4>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No expenses recorded yet</p>
        ) : (
          expenses.slice(-5).reverse().map(expense => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    categories.find(c => c.id === expense.category)?.color
                  }`}>
                    {categories.find(c => c.id === expense.category)?.name}
                  </span>
                  <span className="font-medium text-gray-900">
                    {trip?.budget?.currency || '$'}{expense.amount}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{expense.description}</p>
                <p className="text-xs text-gray-500">{expense.date}</p>
              </div>
              <button
                onClick={() => removeExpense(expense.id)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Category Breakdown */}
      {expenses.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Spending by Category</h4>
          <div className="space-y-2">
            {expensesByCategory.filter(cat => cat.amount > 0).map(category => (
              <div key={category.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{category.name}</span>
                <span className="font-medium text-gray-900">
                  {trip?.budget?.currency || '$'}{category.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetTracker;