import React, { useEffect, useState } from 'react';
import './ExpensesTable.css';


interface Expense {
    id: number;
    merchant: string;
    amount: number;
    description: string;
    date: string;
    category: string;
    status: string;
  }

  const fallbackData: Expense[] = [
    { id: 1, merchant: "AWS", amount: 1260, description: "Hosting for hobby project", date: "2022-05-24T12:00:00.000Z", category: "training", status: "draft" },
    { id: 2, merchant: "Waterstones", amount: 999, description: "Programming book", date: "2022-05-22T12:00:00.000Z", category: "training", status: "draft" },
    { id: 3, merchant: "BA", amount: 43422, description: "Flight", date: "2022-05-04T12:00:00.000Z", category: "travel", status: "draft" },
    { id: 4, merchant: "Wasabi", amount: 725, description: "Meal at engineering conference", date: "2022-05-04T12:00:00.000Z", category: "meals", status: "draft" },
  ];

  const ExpensesTable = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
  
    useEffect(() => {
      fetch("https://expenses-backend-mu.vercel.app/expenses", {
        headers: {
          "Content-Type": "application/json",
          Username: "Nancy.Shokeen", 
        },
      })
        .then((response) => response.json())
        .then((data) => setExpenses(data))
        .catch(() => setExpenses(fallbackData)); // Use fallback data in case of error
    }, []);

    return (
        <div>
          <h1>Expenses</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Merchant</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.merchant}</td>
                  <td>£{(expense.amount / 100).toFixed(2)}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>{expense.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default ExpensesTable;