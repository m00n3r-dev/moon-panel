<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

update DESIGN.md to include the new design guidelines for the project. This document should outline the principles and standards for the visual and interactive elements of the application, including typography, color schemes, spacing, and component styles. Ensure that the guidelines are clear and comprehensive to help maintain a consistent and cohesive user interface throughout the development process.

always READ DESIGN.md before writing any code. It contains the design system and style guidelines for this project. Adhering to these guidelines is crucial for maintaining a consistent and cohesive user interface across the application. Familiarize yourself with the typography, color palette, spacing, and other design elements outlined in DESIGN.md to ensure your code aligns with the project's visual standards.

## Data Fetching & Server State

- **Use TanStack React Query** (`@tanstack/react-query`) for all server state management and API mutations.
- Every API mutation should be extracted into a custom hook under `hooks/` (e.g. `hooks/use-login.ts`).
- The `QueryClient` is configured in `lib/query-provider.tsx` and wraps the app in the root layout.
- Mutations handle side effects (localStorage writes, navigation) inside `onSuccess` callbacks.
- Error handling is driven by the mutation's `error` state rather than manual try/catch in components.