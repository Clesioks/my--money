import express from 'express'
const router = express.Router()
import { registerPayments, getPayments, getPaymentId, getCount, getSummary } from '../controllers/cycleController.js'


    // definir URL base para todas as rotas
    
    router.route('/').post(registerPayments)
    router.route('/payment').get(getPayments)
    router.route('/count').get(getCount)
    router.route('/summary').get(getSummary)
    router.route('/:id').get(getPaymentId)
    
    // rotas de ciclo de pagamento



//     const billing = require('../API/billingCycle/billimgCycleService')
//     billing.register(router, '/billingCycles')
// }

export default router