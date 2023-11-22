"use client"

import React, { useState, useEffect } from 'react';
import { addFinancialData } from './firebaseService';
import LoadingHealthBar from './loadingHealthBar';

const Form = () => {

   // Main Financial health calculation variables //
    
    const [month, setMonth] = useState("January");
    const [expenses, setExpenses] = useState(null);
    const [debt, setDebt] = useState(null);
    const [assets, setAssets] = useState(null);
    const [income, setIncome] = useState(null);
    const [financialHealth, setFinancialHealth] = useState(null);

    useEffect(() =>{
      if(financialHealth !=null){
      addData();
      }
    }, [financialHealth] );

    
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
      const healthScore =
        (normalizedAssets - normalizedDebt) * netWorthWeight +
        (normalizedIncome - normalizedExpenses) * monthlySavingsWeight +
        (1 - debtToIncomeRatio) * debtToIncomeRatioWeight +
        (1 - expenseToIncomeRatio) * expenseToIncomeRatioWeight;
      
        const normalizedScore = Math.min(Math.max(healthScore, 0), 1);  
     
      setFinancialHealth(normalizedScore);      
      
    };
    
     // Visualization variables //

     const [isLoading, setIsLoading] = useState(false);
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      calculateFinancialHealth();
      
    
    };

      // Backend operations //

    const addData = async () => {
      
      const formData = {
        assets: assets,
        expenses: expenses,
        debt: debt,
        income: income,
        health: financialHealth,
        month: month
      }
     
     try {
        const documentId = await addFinancialData(formData, month);
        console.log('Financial data added for '+month);
   
      } catch (error) {
        console.error('Error adding financial data: ', error);
        
      } 
    }
    
  
    
    return (
        <div className='grid grid-cols-2 ml-28 '>
        
        <div className='grid'>  
        <div className='heading'>
        <h1 className='align-middle max-w-full '>Financial Health Indicator</h1>
  
        </div>
  
        <form className="form ">
        <div className='grid grid-cols-2'>
          
          <div className='grid '>
          <label>
            Month:
          </label>
          </div>
  
          <div className='grid'>
            <select className='input' onChange={(e) => {setMonth(e.target.value); console.log(month)}} name="month">
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <div className='grid '>
          <label>
            Expenses:
          </label>
          </div>
  
          <div className='grid '>
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
        </div>

        {financialHealth !== null && (
          <div className='grid mt-28 ml-[16rem] max-content'>
            <LoadingHealthBar isLoading={isLoading} healthScore={financialHealth} />
            <h2 className='mt-12'>Financial Health Score: {(financialHealth*100).toFixed(2)}%</h2>
            
          </div>
        )
        }
      </div>
    );
  };
  
  export default Form;
  