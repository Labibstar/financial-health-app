"use client"

import React, { useState, useEffect } from 'react';
import { addFinancialData } from './firebaseService';
import LoadingHealthBar from './loadingHealthBar';

const Form = () => {

   // Main Financial health calculation variables //

    const [expenses, setExpenses] = useState(null);
    const [debt, setDebt] = useState(null);
    const [assets, setAssets] = useState(null);
    const [income, setIncome] = useState(null);
    const [financialHealth, setFinancialHealth] = useState(null);

   
    const minExpenses = 0
    const minAssets = 0
    const minIncome = 0
    const minDebt = 0
  
    const maxExpenses = 100000000000 // 100 Billion set as upper limit
    const maxAssets  = 100000000000
    const maxIncome  = 100000000000
    const maxDebt  = 100000000000
  
    const calculateFinancialHealth = () => {
      // Normalize input values to a range between 0 and 1
      const normalizedIncome = (income - minIncome) / (maxIncome - minIncome);
      const normalizedExpenses = (expenses - minExpenses) / (maxExpenses - minExpenses);
      const normalizedDebt = (debt - minDebt) / (maxDebt - minDebt);
      const normalizedAssets = (assets - minAssets) / (maxAssets - minAssets);
    
      // Weighted factors - 
      const netWorthWeight = 40000;
      const monthlySavingsWeight = 0.5;
      const debtToIncomeRatioWeight = 0.0002;
      const expenseToIncomeRatioWeight = 0.45;
  
    
      // Calculate normalized ratios
      const debtToIncomeRatio = normalizedDebt / normalizedIncome;
      const expenseToIncomeRatio = normalizedExpenses / normalizedIncome;
    
      // Calculate the raw financial health score
      const rawScore =
        (normalizedAssets - normalizedDebt) * netWorthWeight +
        (normalizedIncome - normalizedExpenses) * monthlySavingsWeight +
        (1 - debtToIncomeRatio) * debtToIncomeRatioWeight +
        (1 - expenseToIncomeRatio) * expenseToIncomeRatioWeight;
    
      // Normalize the raw score to a range between 0 and 100
      const minPossibleScore = 0;
      const maxPossibleScore = 100;
      const normalizedScore = ((rawScore - minPossibleScore) / (maxPossibleScore - minPossibleScore)) * 100;
      

      setFinancialHealth(normalizedScore);
    };
    
     // Visualization variables //

     const [isLoading, setIsLoading] = useState(true);
     
   
     useEffect(() => {
      // Simulating data fetching/loading
      
        setIsLoading(false);
        // Replace with your actual health score data
      
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      calculateFinancialHealth();

      // Backend operations //

      const formData = {
        assets: assets,
        expenses: expenses,
        debt: debt,
        income: income,
        health: financialHealth
      }
  
      try {
        
        const documentId = await addFinancialData(formData);
        console.log('Financial data added with ID: ');
  
        
      } catch (error) {
        console.error('Error adding financial data: ', error);
        
      }
    };
    
  
    
    return (
      <div className='grid place-content-center place-items-center h-screen'>
        <div className='heading'>
        <h1 className='align-middle '>Financial Health Indicator</h1>
  
        </div>
  
        <form className="form">
        <div className='grid grid-cols-2'>
          
          <div className='grid '>
          <label>
            Expenses:
          </label>
          </div>
  
          <div className='grid'>
           <input className="input" type="number"  onChange={(e) => setExpenses(Number(e.target.value))} />
          </div>
         
          
          <div className='grid'>
  
          <label>
            Debt:
          </label>
          </div>
          <div className='grid'>
            <input className="input" type="number"  onChange={(e) => setDebt(Number(e.target.value))} />
          </div>
          
         
          
          <div className='grid'>
  
          <label>
            Assets:
          </label>
          </div>
          <div className='grid'>
            <input className="input" type="number"  onChange={(e) => setAssets(Number(e.target.value))} />
          </div>
         
          <div className='grid'>
  
          <label>
            Income:
          </label>
          </div>
  
          <div className='grid'>
            <input className="input" type="number"  onChange={(e) => setIncome(Number(e.target.value))} />
          </div>
         
  
        </div>
  
        <div className='grid place-content-center self-align-center submitbutton'>
          <button type="button" onClick={handleSubmit}>
            Calculate Financial Health
          </button>
        </div>
        </form>
  
        {financialHealth !== null && (
          <div className='mt-2'>
            <h2>Financial Health Score: {(financialHealth*100).toFixed(2)}%</h2>
            <LoadingHealthBar isLoading={isLoading} healthScore={financialHealth} />
            
          </div>
        )}
      </div>
    );
  };
  
  export default Form;
  