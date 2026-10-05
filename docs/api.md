# Signup API Flow

This document describes the current signup implementation, beginning when a visitor submits the signup form.

## Flow

1. **The visitor submits the form.** The signup page uses a React Router `<Form method="post">`. The browser requires full name, email, password, and password confirmation; the email input is also declared as `type="email"`. While the action is submitting, the button is disabled and displays "Creating account...".

2. **The client route action reads the form.** The action in `client/src/routes/signup.tsx` builds a user object with `fullName`, `email`, `password`, and `confirmPassword`, then calls `signUp` from `client/src/features/authentication/lib/auth.ts`.

3. **The client validates and sends the request.** Before making a request, `signUp` checks for a full name and email, checks that the email contains `@` and `.com`, requires both password fields to have at least 8 characters, and checks that the passwords match. It then sends JSON with `Content-Type: application/json` and `credentials: "include"`.

   The configured URL is `${VITE_BACKEND_API_URL}users/signUp`. The Express route is mounted at `/api/v1/users`, so the full endpoint is `/api/v1/users/signUp` when the configured base URL ends with `/api/v1/`.

   Example request body:

   ```json
   {
   	"fullName": "Ada Lovelace",
   	"email": "ada@example.com",
   	"password": "example-password",
   	"confirmPassword": "example-password"
   }
   ```

   The password above is illustrative only; use a real password only through the signup form.

4. **The server creates the user.** `server/routes/userRoutes.js` maps `POST /signUp` to `authController.signUp`. The controller passes the four submitted fields to `User.create`. The Mongoose schema validates required fields, email format and uniqueness, an 8-character minimum for each password field, and that the two passwords match. A pre-save hook hashes the password with bcrypt (12 rounds) and removes `confirmPassword` before persistence.

5. **The server sends a welcome email.** After the database create succeeds, the controller calls `sendWelcome()` using the email utility. The URL passed to the email is currently hard-coded as `http://localhost:5173/settings/user`.

6. **The server creates the session and responds.** If welcome-email delivery succeeds, the controller signs a JWT and sets it in an HTTP-only `jwt` cookie. The cookie uses `sameSite: "lax"` in development and `sameSite: "none"` plus `secure: true` in production; its expiration is based on `JWT_COOKIE_EXPIRES_IN`. The response status is `201` with JSON in this shape:

   ```json
   {
   	"status": "success",
   	"data": {
   		"_id": "...",
   		"fullName": "Ada Lovelace",
   		"email": "ada@example.com"
   	}
   }
   ```

   The password is not included in the response. The actual user object may contain other schema fields; the example shows only the main identity fields.

7. **The client forwards the session and redirects.** The client reads the response JSON and `Set-Cookie` header. If the status is `success` and a cookie is available, the route action forwards it as a `Set-Cookie` header and redirects the browser to `/plan`. Otherwise, it returns an error message for the signup page to display.

## Failure behavior

- Client-side validation errors are shown on the signup page without sending the API request.
- Server-side validation errors, duplicate email errors, and other request failures are handled by the global Express error handler. Error response details vary between development and production.
- Signup currently creates the database record **before** sending the welcome email, and sends the JWT cookie only after the email succeeds. If email delivery fails, the request can fail after the account has already been created, and the client may not receive a session cookie. A retry may then hit the unique-email constraint.
- The user schema defaults `verified` to `false`; the signup controller still creates the JWT session without checking that field.

## Implementation references

- Client form and route action: `client/src/routes/signup.tsx`
- Client validation and API request: `client/src/features/authentication/lib/auth.ts`
- User route registration: `server/routes/userRoutes.js`
- Signup controller and JWT cookie: `server/controllers/authController.js`
- User schema and password hashing: `server/models/userModel.js`
- API route mount and error middleware: `server/app.js`
- Welcome email transport: `server/utils/email.js`
