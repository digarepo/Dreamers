# Backend Rules & Conventions

This document defines how to structure, validate, and manage backend logic in the Remix-based application. It complements `db-rules.md` and supports consistent, readable, and scalable development.

---

##  General Structure

- All backend logic is written using **Remix loader/action functions** inside `app/routes/`.
- All **database access** is abstracted into reusable modules inside `lib/models/`.
- All **input validation** is handled with Zod, defined in `lib/validations/`.
- Code must use **async/await** and include proper error handling with `try/catch`.
- **Raw SQL** is used for all database interaction, via a `query()` helper.
- Authentication is not implemented yet but will use **BetterAuth** with **RBAC** in the future.

---

##  Folder Structure

```txt
app/
├── routes/                ← Remix pages & APIs
│   └── shareholders.tsx   ← Loader + action logic
├── components/            ← UI components
├── lib/                   ← Core logic modules
│   ├── models/            ← DB access modules (SQL queries)
│   ├── validations/       ← Zod schemas
│   ├── services/          ← Business logic (optional)
│   ├── db/                ← db.server.ts, connection setup
│   ├── logger.server.ts   ← Central error logger
│   └── types/             ← Shared types (e.g., ApiResponse, enums)
├── styles/                ← Tailwind, globals
├── entry.client.tsx       ← Client-side entry
└── entry.server.tsx       ← Server-side entry
```

---

##  Models (`lib/models/`)

- One module per entity: `shareholder.server.ts`, `product.server.ts`, etc.
- Modules export functions like `getById`, `insert`, `update`, `delete`, etc.
- Queries are written in **raw SQL** and executed using `query()`.

Example:

```ts
export async function getProductById(id: number): Promise<Product | null> {
  const results = await query("SELECT * FROM products WHERE id = ?", [id]);
  return results[0] || null;
}
```

---

##  Validation rules (`lib/validations/`)

- Use Zod for validation
- Schema file names match the model name: `shareholder.ts, statement.ts` etc
- Always infer types using `z.infer<typeof schema>` to ensure type-sync.
    - Example
    ```ts
    export const shareholderSchema = z.object({
        name: z.string().min(1).max(100),
        phone: z.string().min(10).max(20),
        ...
    });

    export type Shareholder = z.infer<typeof shareholderSchema>;
    ```

---

## Api Response Format

- All loader/action functions must return a consistent JSON format
    - Example
    ```ts
    type ApiResponse<T> = {
        success: boolean;
        data?: T;
        error?: string;
        message?: string;
    }

    // Success example
    return json({success: true, data: shareholder});

    // Error example
    return json({success: false, error: "shareholder not found"}, {status: 404});
    ```

- Define shared types like `ApiResponse<T>` inside `lib/types/`

---

##  Error Logging & Handling

- Use a centralized logging utility in `lib/logger.server.ts`
- Catch and log all backend errors in actions/loaders.
- Use Remix CatchBoundary in UI to display route-level errors.

---

##  Security: CSRF & Auth

- Authentication will be added later with role-base access control (RBAC)
- Each action will enforce permission checks once roles are in place
- Forms (`<form method="post" />`) are CSRF-safe by default in Remix.
- For custom `fetch()` POST requests, CSRF tokens may be required in production.

---

##  Unit Testing

- Unit tests will be added for backend logic after MVP
- Test files will be located next to their source: `shareholder.server.test.ts`
- Use Vitest
- Test Coverage should include:
        - Model logic(raw sql modules)
        - Validation schemas
        - Business logic

---

##  Documentation Standards

- All reusable backend functions must include JSDoc comments.
    - Example:
    ```ts
      /**
        * Fetch a product by ID
        * @param id - Product ID
        * @returns The product or null if not found
        */
        export async function getProductById(id: number): Promise<Product | null> {
        ...
        }
    ```
- Tooling like Typedoc maybe added later for generating developer documentation

---

##  Naming Conventions

| Concept           | Convention                   |
| ----------------- | ---------------------------- |
| Backend files     | `*.server.ts`                |
| Zod validation    | `*.ts` in `lib/validations/` |
| Inferred types    | `z.infer<typeof schema>`     |
| Shared types      | Defined in `lib/types/`      |
| DB access modules | `lib/models/*.server.ts`     |

---

## Summary Table

| Area          | Convention                                                  |
| ------------- | ----------------------------------------------------------- |
| DB Access     | Raw SQL in reusable modules under `lib/models/`             |
| Validation    | Zod schemas in `lib/validations/`, types inferred           |
| API Responses | JSON format with `success`, `data`, `error`, `message`      |
| Error Logging | Central logger in `lib/logger.server.ts`                    |
| Security      | Built-in CSRF safe for forms, CSRF token for fetch          |
| Testing       | Unit tests after MVP using Vitest                           |
| Documentation | JSDoc for all reusable backend functions                    |
