# Plannerly API Reference

This reference describes the REST API implemented by the Express server. For installation, environment variables, and running the client and server, see the [project README](../README.md).

## Base URL

Local development uses:

```text
http://localhost:3000/api/v1
```

Routes below are relative to this base URL. The API accepts JSON request bodies unless an endpoint says otherwise. The server applies a 10 KB request-body limit.

## Authentication

Signup and login set a JWT in an HTTP-only cookie named `jwt`. Send the cookie on subsequent requests. Browser requests must use `credentials: "include"`; server-side requests must forward the incoming `Cookie` header.

For non-browser clients, protected routes also accept `Authorization: Bearer <token>`. Logout clears the cookie. Cookies use `SameSite=Lax` in development and `SameSite=None; Secure` in production.

The API does not currently require email verification to create the signup session, but login rejects unverified accounts with `403` and sends a fresh verification link.

Authentication confirms that a session is valid; it does not always confirm that a requested record belongs to that user. In particular, plan and task routes that accept record IDs do not currently enforce ownership checks. Do not treat record IDs as authorization.

## Response conventions

Most successful responses include `status: "success"` and a `data` property. Collection endpoints also return a `results` count. The generic create, update, and single-record handlers nest the resource under `data.data`; endpoint examples below show the resulting shape where useful.

Error responses include `status` and `message`. In development they also include error details and a stack trace. In production, expected errors include their message; unexpected errors return a generic `500` response.

## Authentication and account routes

| Method   | Path                          | Auth | Description                                                                           |
| -------- | ----------------------------- | ---- | ------------------------------------------------------------------------------------- |
| `POST`   | `/users/signUp`               | No   | Create an account, send a verification email when possible, and set a session cookie. |
| `POST`   | `/users/login`                | No   | Log in a verified account and set a session cookie.                                   |
| `GET`    | `/users/logout`               | Yes  | Clear the session cookie.                                                             |
| `GET`    | `/users/me`                   | Yes  | Return the current user's record.                                                     |
| `POST`   | `/users/forgotPassword`       | No   | Send a password-reset link.                                                           |
| `PATCH`  | `/users/resetPassword/:token` | No   | Set a new password using the emailed token; also sets a session cookie.               |
| `GET`    | `/users/verify-email/:token`  | No   | Verify the email and redirect to the client login page.                               |
| `PATCH`  | `/users/updateMyPassword`     | Yes  | Change the current user's password and refresh the session cookie.                    |
| `PATCH`  | `/users/updateMe`             | Yes  | Update the current user's name and/or profile photo.                                  |
| `DELETE` | `/users/deleteMe`             | Yes  | Deactivate the current user's account.                                                |

### Signup

Request body:

```json
{
	"fullName": "Ada Lovelace",
	"email": "ada@example.com",
	"password": "example-password",
	"confirmPassword": "example-password"
}
```

The server requires a name, valid unique email, and matching passwords of at least 8 characters. Passwords are hashed before storage. A verification email is attempted; if email delivery fails, the account is still created. The response is `201` and includes the user data plus the session cookie. Treat the example password as illustrative only.

### Login

```json
{
	"email": "ada@example.com",
	"password": "example-password"
}
```

An unverified account receives `403`; incorrect credentials receive `401`.

### Password reset and change

`POST /users/forgotPassword` accepts `{ "email": "ada@example.com" }`.

`PATCH /users/resetPassword/:token` accepts:

```json
{
	"password": "new-example-password",
	"confirmPassword": "new-example-password"
}
```

`PATCH /users/updateMyPassword` accepts the same new-password fields plus `currentPassword`.

### Update profile

Send `fullName` as JSON to update the name. For a photo, send `multipart/form-data` with an image file in the `photo` field. The server resizes uploaded images to 500 by 500 pixels and stores them through Cloudinary. This endpoint does not support password or email changes.

### Additional user-management routes

| Method   | Path         | Auth  | Description                                              |
| -------- | ------------ | ----- | -------------------------------------------------------- |
| `GET`    | `/users`     | Yes   | List users; supports the collection query options below. |
| `POST`   | `/users`     | Admin | Create a user.                                           |
| `GET`    | `/users/:id` | Yes   | Get a user by ID.                                        |
| `DELETE` | `/users/:id` | Admin | Permanently delete a user by ID.                         |

## Plans

All plan routes require authentication. Plan listing is scoped to the authenticated user.

| Method   | Path         | Description                         |
| -------- | ------------ | ----------------------------------- |
| `GET`    | `/plans`     | List the current user's plans.      |
| `POST`   | `/plans`     | Create a plan for the current user. |
| `GET`    | `/plans/:id` | Get a plan by ID.                   |
| `PATCH`  | `/plans/:id` | Update a plan.                      |
| `DELETE` | `/plans/:id` | Delete a plan.                      |

Create a plan with `{ "plan": "Prepare presentation" }`. The plan name is required, limited to 50 characters, and currently unique across the entire plans collection. Plan updates use the same `plan` field.

## Tasks

Task routes require authentication. Use the nested route to list and create tasks for a plan:

| Method   | Path                   | Description               |
| -------- | ---------------------- | ------------------------- |
| `GET`    | `/plans/:planId/tasks` | List tasks for a plan.    |
| `POST`   | `/plans/:planId/tasks` | Create a task for a plan. |
| `PATCH`  | `/tasks/:id`           | Update a task.            |
| `DELETE` | `/tasks/:id`           | Delete a task.            |

Example task body:

```json
{
	"task": "Draft the outline",
	"dueDate": "2026-10-10T17:00:00.000Z",
	"completed": false
}
```

`dueDate` is required. `task` is limited to 100 characters. The nested create route supplies the plan ID from the URL.

The server also mounts `GET /tasks`, but task listing is implemented using a plan ID from the URL. Prefer `GET /plans/:planId/tasks` to list tasks.

## Notifications

| Method | Path             | Auth | Description                                       |
| ------ | ---------------- | ---- | ------------------------------------------------- |
| `GET`  | `/notifications` | Yes  | List notifications belonging to the current user. |

The response is `{ "status": "success", "data": [...] }`. Notification records include `title`, `message`, `type`, `isRead`, and optional `link` fields.

## Statistics

All statistics routes require authentication. The current routes do not apply an admin-role check.

| Method | Path                         | Description                                                |
| ------ | ---------------------------- | ---------------------------------------------------------- |
| `GET`  | `/stats/users/total`         | Total user records, including deactivated accounts.        |
| `GET`  | `/stats/users/verified`      | Total email-verified users.                                |
| `GET`  | `/stats/users/:userId/plans` | Number of plans for the given user ID.                     |
| `GET`  | `/stats/plans/total`         | Total plans.                                               |
| `GET`  | `/stats/plans/completed`     | Plans with at least one task where every task is complete. |
| `GET`  | `/stats/tasks/overview`      | Current user's plan and task overview.                     |

Count endpoints return `{ "status": "success", "data": { "total": 0 } }` (with the calculated total). The task overview includes plan count, task totals, completion rate, seven days of task creation counts, and up to 20 tasks due today.

## AI planner

| Method | Path       | Auth | Description                                               |
| ------ | ---------- | ---- | --------------------------------------------------------- |
| `POST` | `/ai/chat` | No   | Send chat history and receive a planning-assistant reply. |

Request body:

```json
{
	"messages": [{ "role": "user", "content": "Help me plan my afternoon." }]
}
```

Messages may use the `user` or `assistant` role. The server keeps the latest 20 valid messages and limits each message to 2,000 characters. The endpoint requires `GROQ_API_KEY` to be configured on the server. A successful response contains `{ "status": "success", "data": { "reply": "..." } }`.

## Collection query options

Generic collection endpoints such as `GET /plans` and `GET /users` support:

| Parameter | Behavior                                                                   | Example                 |
| --------- | -------------------------------------------------------------------------- | ----------------------- |
| `page`    | Page number; defaults to `1`.                                              | `page=2`                |
| `limit`   | Records per page; defaults to `100`.                                       | `limit=25`              |
| `sort`    | Comma-separated sort fields; prefix a field with `-` for descending order. | `sort=-createdAt,plan`  |
| `fields`  | Comma-separated fields to return.                                          | `fields=plan,createdAt` |

Other query parameters are applied as filters by the generic collection handler.

## Implementation references

- Route registration and middleware: `server/app.js`
- Route definitions: `server/routes/`
- Request handling: `server/controllers/`
- Schemas and field validation: `server/models/`
- Collection filtering, sorting, and pagination: `server/utils/apiFeatures.js`
