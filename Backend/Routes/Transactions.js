const router = require('express').Router()
const { addIncome, getIncomes, deleteIncome } = require('../controllers/IncomeController')
const { addExpense, getExpenses, deleteExpense } = require('../controllers/ExpenseController')

router.post('/add-income', addIncome)
router.get('/get-incomes/:userId', getIncomes)
router.delete('/delete-income/:id', deleteIncome)

router.post('/add-expense', addExpense)
router.get('/get-expenses/:userId', getExpenses)
router.delete('/delete-expense/:id', deleteExpense)

module.exports = router