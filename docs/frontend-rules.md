# Frontend Rules & Conventions

This document defines architecture, design patterns, and UI behavior for the Remix-based frontend of this ERP-style application. It ensures scalability, maintainability, and a clean, compact user experience.

---

##  Folder Structure

```txt
app/
├── routes/
│   ├── dashboard/
│   │   ├── index.tsx                   ← Dashboard landing
│   │   ├── shareholders/
│   │   │   ├── index.tsx              ← List + create form
│   │   │   └── $id.tsx                ← View + edit
│   │   ├── statements/
│   │   │   ├── index.tsx              ← List + create statements
│   │   │   └── $id.tsx                ← View/edit single statement
│   └── login.tsx                      ← Auth route (future)
│
├── components/
│   ├── layout/                         ← Sidebar, header, etc.
│   ├── ui/                             ← shadcn/ui components
│   ├── forms/
│   │   ├── ShareholderForm.tsx
│   │   └── StatementForm.tsx
│
├── lib/
│   ├── configs/
│   │   ├── shareholder-fields.ts       ← Form field configs
│   │   └── statement-fields.ts         ← Reusable input metadata
│   ├── validations/
│   │   ├── shareholder.ts              ← Zod schema
│   │   └── statement.ts
│   ├── types/
│   │   ├── index.ts                    ← Shared types (ApiResponse, enums, etc.)
│   └── helpers/
│       └── renderFormField.tsx         ← Reusable field renderer
│
├── styles/
│   └── tailwind.css
│
├── entry.client.tsx
└── entry.server.tsx
```
---

## UI & Design Principles

- Design mimics a compact desktop app, keyboard-friendly
- Typography: text-sm for most text
- Padding: tight vertical spacing, use gap-2 or less
- Use thin borders and rings
- Favor clarity and usability over visuals — no unnecessary animations or color
- For long forms (10+ fields), use:
- Sections, collapsible panels, or tabs
- Grid layout (grid-cols-2 or grid-cols-3) to fit inputs side-by-side
- Use buttons, icons, and table UI from shadcn/ui

---

## Form Strategy

- All forms use react-hook-form + zodResolver
- Field structure is driven by a config array like shareholder-fields.ts
- Avoid repeating JSX per input — use .map() to render fields dynamically
- Each form lives in components/forms/FeatureForm.tsx

    - Example
    ```ts
    export const shareholderFields = [
        { name: "name", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email" },
        { name: "birth_date", label: "Birth Date", type: "date" },
        ...
    ] as const;
    ```

## Tables & Detail Views

- Use a consistent data table layout with:
- Checkbox for selection (optional)
- Row click → open details (either navigate or expand)
- Context menu per row (Edit, Delete)
    - Example: clicking a shareholder row shows their info + linked statements

---

##  Naming & Conventions

| Item               | Convention                    |
| ------------------ | ----------------------------- |
| Form config files  | `lib/configs/*.ts`            |
| Validation schemas | `lib/validations/*.ts`        |
| Form components    | `components/forms/*.tsx`      |
| Page routes        | `routes/dashboard/[feature]/` |
| Type inference     | `z.infer<typeof schema>`      |

---

##  Reusability Rules

- Define each field once in the config and reuse for:
- Create + Edit forms
- Search filters
- Table headers (optional)
- Validation rules are always taken from Zod, no duplication

---

## General Guidelines

- Layout should be dashboard-first, scalable to support:
        - New features (e.g. reports, roles, statements, etc.)
        - Mobile/responsive behavior
- Folder organization should group by feature when scale grows:
        - `routes/dashboard/shareholders/`
        - `components/forms/ShareholderForm.tsx`
- Allow flexibility: UI components may evolve but base conventions must remain

---
