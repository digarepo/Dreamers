# Sprint Plan A: July 7–19, 2025

**Sprint Type**: 2-week sprint (A2 format)
**Team**: 4 Interns
**Structure**: Backend (Week 1) → Frontend (Week 2)

---

## Sprint Timeline & Activities

### Week 1 (July 7–12) — Backend & DB Focus

- Finalize MariaDB schema for shareholders and statements
- Implement Zod validation schemas (shared across backend/frontend)
- Complete backend CRUD APIs for both features
- Write and run automated tests for backend logic (e.g., database + validation)
- Push to `feature/shareholders` and `feature/statements` branches
- Create and tag: `v0.1.0-backend`

### Week 2 (July 14–19) — Frontend UI & Integration

- Implement form UIs using Tailwind + shadcn/ui
- Use react-hook-form with shared Zod schemas
- Integrate APIs, handle success/error states
- Write and run frontend logic tests for form + API behavior
- Finalize responsive layout (desktop & mobile)
- Push to respective feature branches
- Tag final deliverables: `v0.1.0-frontend`

---

## Weekly Push & Review Guide

### Saturdays (July 12 & 19)

| Time     | Activity                               |
|----------|----------------------------------------|
| Morning  | Wrap up implementation & finalize code |
| Afternoon| Sprint Review & Sync Meeting           |

Each intern/team must:

- Push final code to their respective branch
- Open PR if merge-ready
- Tag the commit

---

## Tag Format

| Tag Name            | Description                      |
|---------------------|----------------------------------|
| `v0.1.0-backend`    | Backend DB + APIs (Week 1)       |
| `v0.1.0-frontend`   | UI Integration (Week 2)          |
| `v1.0.0-mvp`        | Final MVP Delivery               |

---

## Branch Structure

| Branch Name              | Purpose                          |
|--------------------------|----------------------------------|
| `feature/shareholders`   | DB + Backend + Frontend (SH)     |
| `feature/statements`     | DB + Backend + Frontend (ST)     |
| `feature/ui-layout`      | Header, Sidebar, General Layout  |

---

## Testing Convention

- **Backend:**
  - Write and run tests for CRUD APIs
  - Validate schema parsing, DB logic, error paths

- **Frontend:**
  - Use `zodResolver` for all inputs
  - Test dynamic field rendering, form interaction
  - Validate success and error responses from backend
  - Ensure layout responsiveness and UX behavior

- Only push code that has passed automated testing

---

## Responsibilities by Intern

| Intern | Role                                 |
|--------|--------------------------------------|
| A      | Lead backend & frontend on SH        |
| B      | Support A on SH                      |
| C      | Lead backend & frontend on ST        |
| D      | Support C on ST                      |
| All    | Collaborate on UI Layout (Final Days)|

---

## Completion Criteria

- [ ] All database schemas defined
- [ ] Zod validation created and reused
- [ ] CRUD APIs implemented and tested
- [ ] Frontend forms with proper validation
- [ ] Layout responsive and compact
- [ ] Code pushed and tagged
- [ ] Daily commits throughout the week
