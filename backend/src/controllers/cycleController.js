import asyncHandler from '../middleware/asyncHandler.js'
import Billing from '../API/billingCycle/billingCycle.js'

const getPayments = asyncHandler (async (req, res) => {

    // res.send('Busca usuários')
   try {
    
       let query = {}
       let page = req.query.page
       let limit = 10
       let skip = limit * (page - 1)
       const registros = await Billing.find(query).skip(skip).limit(limit)
        res.status(200).send(registros);

   } catch (error) {
        console.log(error);

   }
    // try {
    //     // Adding Pagination
    //     const limitValue = req.query.limit || 1;
    //     const skipValue = req.query.skip || 0;
    //     const posts = await Billing.find()
    //     .limit(limitValue).skip(skipValue);
    //     res.status(200).send(posts);
    // } catch (e) {
    //     console.log(e);
    // }
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