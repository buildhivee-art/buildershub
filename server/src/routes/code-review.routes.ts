
import { Router, RequestHandler } from 'express';
import {
  createCodeReview,
  getMyReviews,
  getReview,
  getReviewStats,
} from '../controllers/code-review.controller.js';
import { authenticate, optionalAuthenticate } from '../middlewares/auth.middleware.js'; // Ensure optionalAuth exists or handle manually
import { codeReviewLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

// Public endpoint with rate limiting (Auth optional)
router.post('/', codeReviewLimiter as unknown as RequestHandler, optionalAuthenticate as RequestHandler, createCodeReview as RequestHandler);

// Protected endpoints
router.get('/my-reviews', authenticate as RequestHandler, getMyReviews as RequestHandler);
router.get('/stats', authenticate as RequestHandler, getReviewStats as RequestHandler);
router.get('/:id', optionalAuthenticate as RequestHandler, getReview as RequestHandler); // Auth needed to check ownership

export default router;
