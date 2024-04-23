import mongoose from "mongoose";

const creditSchema = mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true}
})

const catPagamento = {
    values: ['PAGO', 'PENDENTE', 'AGENDADO'],
    // message: 'enum falhou para o caminho `{PATH}` with value `{VALUE}`'
}

const debtSchema = mongoose.Schema({
    name: { type: String, required: true  },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito'] },
    status: { type: String, required: false, uppercase: true , enum:catPagamento }     
})

const billingCycleSchema = mongoose.Schema({
    type: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    month: { type: Number, min: 1, max: 12, required: true},
    year: { type: Number, min: 1970, max: 2100, required: true },
    credits: [creditSchema],
    debts: [debtSchema]
})


const Billing = mongoose.model('Billing', billingCycleSchema)

export default Billing