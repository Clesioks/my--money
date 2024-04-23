import asyncHandler from '../middleware/asyncHandler.js'
import Billing from '../API/billingCycle/billingCycle.js'

const getPayments = asyncHandler (async (req, res) => {

    // res.send('Busca usuários')
    const registros = await Billing.find({})
    res.status(200).json(registros)
})

const registerPayments = asyncHandler (async (req, res) => {
    const { name, month, year, credits, debts  } = req.body

    const payment = await Billing.create({
        name,
        month,
        year,
        credits,
        debts   
    })

    if (payment) {
        res.status(201).json({
            _id: payment._id,
            name: payment.name,
            month: payment.month,
            year: payment.year,
            credits: payment.credits,
            debts: payment.debts,
        })
    } else {
        res.status(400)
        throw new Error('Dados de pagamento inválido')
    }
})


const getPaymentId = asyncHandler (async (req, res) => {
    res.send('buscando pagamento por ID')
})


const getCount = asyncHandler (async (req, res, next) => {
    const quantidade = await Billing.countDocuments()
    if (quantidade) {
        res.status(200).json({quantidade})
    } else {
        throw new Errir('Quantidade não encontrada')
    }

})


const getSummary = asyncHandler (async (req, res, next) => {  
      
        const result =  await Billing.aggregate()
        .project({credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}})
        .group({_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}})
        .project({_id: 0, credit: 1, debt: 1})
      if (result) {
        res.json(result[0] || {credit: 0, debt: 0})
    }      else {
        res.status(500).json({error: [error]})
    }
})
    



    

    
    
    
    
    export { getPayments, registerPayments, getPaymentId, getCount, getSummary }