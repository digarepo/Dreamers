# Database Rules & Conventions

> This file mirrors our Database Rules & Conventions Google Doc:
> https://docs.google.com/document/d/1blDaXrhzql9k9wkR5MpmakV4pJsRXXAVZsRUNZUHl1s/edit?usp=sharing

---

## General Naming Conventions

| Item           | Rule / Pattern                                 |
|----------------|------------------------------------------------|
| Database name  | `project_name_db` (e.g., `dreamers_db`)        |
| Table name     | Always plural (e.g., `shareholders`, `statements`) |
| Column name    | Always singular (e.g., `name`, `phone`, `amount`) |
| Case style     | `snake_case` for all identifiers               |
| Abbreviations  | Only allow `ref` (for "reference"); no others  |
| Descriptors    | Use clear, meaningful suffixes (e.g., `error_share`, `share_price`) |

---

## File Structure

- SQL schemas go into: `lib/sql/`
- Zod validation schemas go into: `lib/validations/`

---

## Data Types

| Type          | Use Case                                                                 |
|---------------|--------------------------------------------------------------------------|
| `INT`         | For integers (IDs, version, counters)                                    |
| `TINYINT(1)`  | For boolean flags (`0 = false`, `1 = true`)                              |
| `DECIMAL(10,2)` | For monetary values (e.g., `share_price`, `share_will`)                |
| `VARCHAR(n)`  | For short text fields, with fixed lengths by category (see below)        |
| `TEXT`        | For long text (e.g., `comments`, `descriptions`, `notes`)                |
| `ENUM`        | For fixed options (`ENUM('option1','option2')`)                          |
| `DATE`        | For date only (without time)                                             |
| `TIMESTAMP`   | For created/updated timestamps, with `DEFAULT CURRENT_TIMESTAMP`         |

### Standard VARCHAR Lengths

| Field Category         | Length (`VARCHAR(n)`) |
|------------------------|-----------------------|
| Names, cities          | 100                   |
| Emails                 | 150                   |
| Phone numbers, IDs     | 20                    |
| Labels, statuses       | 50                    |

---

## IDs & Primary Keys

- Use `id` for auto-incrementing primary keys (`INT AUTO_INCREMENT PRIMARY KEY`)
- Use `{related_table}_id` for foreign keys (e.g., `shareholder_id`)
- Use fixed identifiers like `fn_id` only when necessary (e.g., externally provided IDs)
- Primary keys must always be unique and indexed

---

## Best Practices

- Every table must have a `PRIMARY KEY`
- Mark required fields as `NOT NULL`
- Use `DEFAULT` values for booleans and common fields (e.g., `DEFAULT 0`)
- Add a `version` field (`INT`, default `1`) for update tracking
- Add `updated_at` field with:

```sql
TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

## Validations

- Database schema is the single source of truth
- Zod schemas must match DB schema exactly
