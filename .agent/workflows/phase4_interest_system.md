---
description: Phase 4 - Interest System & Advanced Collaboration Features
---

# Phase 4: Next-Level Interest System

## 1. Backend: Robust Interest Logic
- [ ] **Enhance Interest Model**: Ensure `Interest` model supports messages and status (Done in Schema).
- [ ] **Interest Controller** (`server/src/controllers/interest.controller.ts`):
    - `expressInterest`: Post interest with a custom pitch message.
    - `checkInterestStatus`: Check if current user has already applied.
    - `getProjectInterests`: Get all applicants for a project (Owner only).
    - `updateInterestStatus`: Accept or Reject an applicant.
    - `getMyInterests`: See projects I've applied to.
- [ ] **Routes**: Setup `interest.routes.ts`.

## 2. Frontend: "Make Your Pitch"
- [ ] **Smart Interest Button**:
    - Replaces the generic button on Project Details.
    - Hidden for owner.
    - Shows "Applied" status if already interested.
- [ ] **Application Modal**:
    - Form to send a message/pitch ("Why I'm a good fit").
    - Character limit and validation.

## 3. Advanced Dashboard (The "Next Level")
- [ ] **Dashboard Page** (`/dashboard`):
    - **Overview Tab**: Stats (Total views, Total applications).
    - **"My Project" Management**:
        - List of my projects.
        - **Applicant Review**: See list of applicants with their Avatar, Name, and Pitch.
        - **Action Buttons**: "Accept" (Green), "Decline" (Red).
    - **"My Applications" Tab**:
        - List of projects I applied to.
        - Status badges (Pending, Accepted, Rejected).

## 4. Notifications & Email System
- [ ] **Resend Integration**:
    - Set up `RESEND_API_KEY`.
    - Create Email Templates (`server/src/emails/`).
- [ ] **Automated Emails**:
    - **New Applicant**: Notify owner when someone applies.
    - **Application Accepted**: Notify applicant and **Exchange Emails** (The "Intro"). Connections made!
- [ ] **In-App Notifications** (Bonus):
    - Simple notification dropdown in Navbar for "Your application was accepted!".

## 5. Execution Steps
1.  Implement Backend Controllers & Routes.
2.  Implement Frontend Interest Modal.
3.  Build the Dashboard UI.
4.  Integrate Email Notifications.
