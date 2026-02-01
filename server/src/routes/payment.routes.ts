
import { Router, RequestHandler } from 'express';
import { createSubscriptionOrder, verifyPayment } from '../controllers/payment.controller.js';
import { handleRazorpayWebhook } from '../controllers/payment.webhook.controller.js';
import { getSubscriptionStatus } from '../controllers/subscription.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create-order', authenticate as RequestHandler, createSubscriptionOrder as RequestHandler);
router.post('/verify', authenticate as RequestHandler, verifyPayment as RequestHandler);
router.post('/webhook', handleRazorpayWebhook as RequestHandler);
router.get('/status', authenticate as RequestHandler, getSubscriptionStatus as RequestHandler);

export default router;
