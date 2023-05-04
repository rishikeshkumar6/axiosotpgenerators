import React,{useState} from 'react'
import './style.css'
import axios from 'axios'
export function GenerateOtp(){
    const [mobilenumber,setmobilenumber]=useState('')
    const [error,seterror]=useState('')
    const [success,setsuccess]=useState('')

    function handlechange(event){
        setmobilenumber(event.target.value) 
    }

    async function handleclick(){
        const isValidMobile = /^(\+91-|\+91|0)?\d{10}$/.test(mobilenumber);
        if (!isValidMobile) {
          seterror('Invalid mobile number. Please enter a valid Indian mobile number.');
          return;
        }
        try{
            const api="https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP"
        const senddata=await axios.post(api,{mobile:Number(mobilenumber)})
        console.log(senddata)
        if(senddata.status===200){
            setsuccess('your otp is successfully send in your moble number')
            setmobilenumber('')
        }
        }
        catch(error){
              seterror('Failed sending the otp , please try again later')
        }
    }
    
    return (
        <div className='parent'>
            <input type='text' onChange={handlechange}/>
            <button onClick={handleclick}>Get Otp</button>
            <p>{error}</p>
            <p>{success}</p>
        </div>
    )
}