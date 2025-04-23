import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SK)

const port =  process.env.PORT || 2000

const app =  express()
app.use(express.json())
app.use(cors())

//http://localhost:5000
app.get('/' ,(req,res)=>{  res.json({message:"hello from nodejs server"})})

//http://localhost:5000/create-payment-intent
app.post('/create-payment-intent' , async(req,res)=>{
    const {total} = req.body
    console.log(req.body)
    try{
        const paymentintent = await stripe.paymentIntents.create({
                amount : Number(total) * 100, 
                currency:"usd",
                payment_method_types:['card']
    });
    res.status(200).json({clientSecret : paymentintent.client_secret})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

app.listen(port ,  ()=>console.log(`server started at http://localhost:${port}`))