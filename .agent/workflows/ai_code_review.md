---
description: AI Code Review - Complete Implementation Roadmap (Gemini Edition)
---

# AI Code Review Feature - Complete Implementation Roadmap (Gemini)

**Target: Ship in 3 days and launch v1.0 with this killer feature!**

---

## DAY 1: BACKEND SETUP (6-8 hours)

### Setup Gemini API
- [ ] Get API Key from [Google AI Studio](https://aistudio.google.com/)
- [ ] Add to `server/.env`: 
  ```
  GEMINI_API_KEY=your-key-here
  ```

### Install Dependencies
- [ ] In `server/` folder, run:
  ```bash
  npm install @google/generative-ai
  ```

### Create Database Schema for Code Reviews
- [ ] Add to `server/prisma/schema.prisma`:
  ```prisma
  model CodeReview {
    id          String   @id @default(cuid())
    userId      String?
    code        String   @db.Text
    language    String
    score       Int?
    issues      Json?    // Array of issues found
    suggestions Json?    // Array of suggestions
    resources   Json?    // Array of learning resources
    createdAt   DateTime @default(now())
    
    user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
    
    @@index([userId])
    @@index([createdAt])
  }
  ```
- [ ] Add to User model: `codeReviews CodeReview[]`
- [ ] Run migration: `npx prisma migrate dev --name add_code_reviews`

### Create Gemini Service
- [ ] Create `server/src/services/ai.service.ts`:
  - Implement `reviewCode` using `@google/generative-ai`.
  - Configure model `gemini-1.5-flash` for speed and cost.
  - Set up structured JSON prompting.

### Create Code Review Controller
- [ ] Create `server/src/controllers/code-review.controller.ts`:
  - `createCodeReview`: Handle code submission, rate limiting, and AI call.
  - `getMyReviews`: Pagination support.
  - `getReview`: Public/Private access logic.
  - `getReviewStats`: Aggregate stats.

### Create Code Review Routes
- [ ] Create `server/src/routes/code-review.routes.ts`:
  - POST `/` (Rate limited)
  - GET `/my-reviews` (Protected)
  - GET `/:id`
  - GET `/stats` (Protected)

### Mount Routes
- [ ] Update `server/src/server.ts` to use new routes.

---

## DAY 2: FRONTEND UI (8-10 hours)

### Dependencies
- [ ] `npm install @monaco-editor/react react-syntax-highlighter` in client.

### API Integration
- [ ] Add `reviewCodeAPI`, `getReviewHistoryAPI` to `client/src/lib/api.ts`.
- [ ] Types for `CodeReviewResult`.

### Components
- [ ] `LanguageSelector`: Shadcn Select component.
- [ ] `CodeEditor`: Monaco Editor wrapper.
- [ ] `ReviewResult`: Display Score, Issues, Suggestions, Resources.

### Pages
- [ ] `app/code-review/page.tsx`: Main reviewer interface.
- [ ] `app/code-review/history/page.tsx`: History list.

---

## DAY 3: POLISH (6-8 hours)

- [ ] Rate limiting (simple memory based or database based).
- [ ] Dashboard integration.
- [ ] Landing page update.
- [ ] Loading states & Error boundaries.
