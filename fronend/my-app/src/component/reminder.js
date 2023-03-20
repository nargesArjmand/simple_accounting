import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useCurrent } from '../hook/current';
import { useMaster } from '../hook/incomes';
import { useReminder } from '../hook/reminder';

 


const Reminder = () => {
  const [incomes, setIncomes] = useState([]);
  const [ordering, setOrdering] = useState('-date');
  const access = localStorage.getItem('access')
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [timeChioce, setTimeChoice] = useState();

  const [accountType, setAccountType] = useState();
  const [reminderType, setReminderType] = useState();
  const [reminderTime, setReminderTime] = useState();

  
  const {data}= useReminder()
  const {data:current}= useCurrent()

  console.log(data, "sssasdasdsssas");
    useEffect(() => {
        fetch(`/api/incomes/?ordering=${ordering}`).then(res => res.json()).then(res => { setIncomes(res)});
    }, [ordering]);


    const handleSubmit = (e) => {
      e.preventDefault();
      axios 
        .post(
           "http://127.0.0.1:8000/api/dashboard/account/reminder/",
          {
            user_id: current.id,
  title: title,
  description: description,
  amount: amount,
  account_type:  !!accountType ?accountType :"input",
  reminder_type:!!reminderType ?reminderType :"check",
  time_choice:!!timeChioce ? timeChioce :"one day before" ,
  reminding_time:reminderTime,
          },
          {

            headers: {
              "Content-Type": "application/json",
              "accept": "application/json",
              Authorization: `Bearer ${access}`,
          "X-CSRFToken":
            "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
            },
          }
        )
        .then((result) => {
         console.log("asdasdd")
        })
        .catch((error) => {
          alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
        });
      localStorage.setItem("flag", "true");
    };

    const handleDelete = (e) => {
      axios 
        .delete(
           `http://127.0.0.1:8000/api/dashboard/account/reminder/${e}/`,
         
          {

            headers: {
              "Content-Type": "application/json",
              "accept": "application/json",
              Authorization: `Bearer ${access}`,
       
            },
          }
        )
        .then((result) => {
        
        })
        .catch((error) => {
          alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
        });
      localStorage.setItem("flag", "true");
    };

  
  return (
    <div className='p-4'>
      <h1>Reminder</h1>
      <div className='row'>
          <div className='col-12 my-4'>
            <div className="card">
                <div className="card-header">
                    New Reminder
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="amount">title</label>
                            <input
                             onChange={(e) => setTitle(e.target.value)}
                        
                        
                            name="amount" className="form-control" id="amount" placeholder="Enter amount" />
                            <label htmlFor="amount">Amount</label>
                            <input 
                             onChange={(e) => setAmount(e.target.value)} type="number" name="amount" className="form-control" id="amount" placeholder="Enter amount" />
                        <label htmlFor="amount">description</label>
                            <input 
                             onChange={(e) => setDescription(e.target.value)}  name="amount" className="form-control" id="amount" placeholder="Enter amount" />
                       
                        </div>
                        <label htmlFor="amount">account type</label>
                        <select value={accountType} onChange={(e) => setAccountType(e.target.value)} className="form-select form-select-lg" aria-label=".form-select-lg example">
                            <option value="input">input</option>
                            <option value="output">output</option>
                           
                        </select>
                        <label htmlFor="amount">reminder type</label>
                        <select value={reminderType} onChange={(e) => setReminderType(e.target.value)} className="form-select form-select-lg" aria-label=".form-select-lg example">
                            <option value="check">check</option>
                            <option value="debt">debt</option>
                           
                        </select>
                        <label htmlFor="amount">time choice</label>
                        <select defaultValue={"one day before"} value={timeChioce} onChange={(e) => setTimeChoice(e.target.value)} className="form-select form-select-lg" aria-label=".form-select-lg example">
                            <option value="one day before">one day before</option>
                            <option value="two day before">two day before</option>
                            <option value="three day before">three day before</option>
                            <option value="week before">week before</option>
                            <option value="month before">month before</option>

                        </select>
                        <label htmlFor="amount">reminding time</label>
                            <input 
                             onChange={(e) => setReminderTime(e.target.value)} type="date" name="amount" className="form-control" id="amount" placeholder="Enter amount" />
                      
                        <button type="submit" className='m-2 btn btn-outline-primary'>submit</button>
                    </form>
                </div>
            </div>
          </div>
          <div className='col-12'>
              <div className='card'>
                    <div className='card-header d-flex'>
                        Reminder
                        
                        <div className="input-group mb-3 w-25 ms-auto">
                     
                        
                        </div>
                    </div>
                    <div className='card-body'>
                  <ul className="list-group">
                        {data.map(income => 
                            <li key={income.id} className="list-group-item">
                                <div className=" d-flex">
                                <button onClick={()=> handleDelete(income.id)} className=' me-4 btn btn-danger btn-sm'>Delete<i className="bi bi-trash"></i></button>
                                <span className="fw-bold me-auto text-success">{ income.amount.toLocaleString() }$</span>
                                <span className="fw-bold me-auto text-success">{ income.description } </span>
                                <span className="fw-bold me-auto text-success">{ income.title } </span>

                                

                                <span >{new Date(income.date).toLocaleDateString("en-US")}</span>
                                </div>
                            </li>
                )}
                        
                    </ul>
                    </div>
              </div>
            
          </div>

      </div>
    </div>
  )
}

export default Reminder