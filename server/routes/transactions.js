const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Validation for creating/updating transactions
const transactionValidation = [
  body('type')
    .isIn(['income', 'expense', 'investment', 'transfer'])
    .withMessage('Invalid transaction type'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be greater than 0'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format')
];

// GET routes
router.get('/', transactionController.getTransactions);
router.get('/stats', transactionController.getTransactionStats);
router.get('/:id', transactionController.getTransaction);

// POST routes
router.post('/', transactionValidation, transactionController.createTransaction);
router.post('/bulk', transactionController.bulkCreateTransactions);

// PUT routes
router.put('/:id', transactionValidation, transactionController.updateTransaction);

// DELETE routes
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
