---
description: Phase 5 - User Profile & Enhanced GitHub Integration
---

# Phase 5: Complete User Profile Ecosystem

## 1. Backend: Profile & User Enhancements
- [ ] **Enhance User Model**: Add `bio`, `skills` (string[]), `socialLinks` (JSON) to User model.
- [ ] **User Controller** (`server/src/controllers/user.controller.ts`):
    - `getUserProfile`: Get public profile by username (includes projects).
    - `updateProfile`: Update bio, skills, social links.
    - `syncGithubData`: Manually trigger GitHub sync (repos, languages like 'Top Languages').
- [ ] **Routes**: Setup `user.routes.ts`.

## 2. Frontend: Profile Pages
- [ ] **Public Profile** (`/profile/[username]`):
    - **Header**: Large Avatar, Name, "Start Collaboration" button (creates IDM/Message).
    - **Stats**: Total Projects, Total Stars (aggregate), "Karma/Reputation".
    - **Tabs**:
        - "Projects": Grid of their created projects.
        - "Contributions": Projects they joined/contributed to (from Interest system).
    - **Tech Stack Graph**: Visual chart of their top languages (from GitHub/Projects).
- [ ] **Edit Profile** (`/settings/profile`):
    - Form to edit Bio, Skills.
    - "Sync GitHub" button.
    - Social links management (Twitter, LinkedIn, Portfolio).

## 3. GitHub "Deep" Integration
- [ ] **Repo Fetching**: When creating a project, allow picking from their GitHub Repos (dropdown) instead of pasting URL.
- [ ] **Activity Heatmap**: Show a "BuildHive Activity" heatmap similar to GitHub's contribution graph (Days active on platform).

## 4. Execution Steps
1.  Update Prisma Schema (User model).
2.  Implement User Controller & Routes.
3.  Build Public Profile Page.
4.  Build Edit Profile/Settings Page.
