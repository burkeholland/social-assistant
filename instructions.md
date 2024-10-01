# AI Assistant Instructions

## General Guidelines

1. Maintain the existing code style and formatting. The project uses JavaScript for both frontend and backend, with Vue.js for the frontend framework. The codebase follows standard JavaScript conventions and Vue.js best practices.

2. The project uses the Bulma CSS framework for styles. When adding new styles, use Bulma classes where possible. Custom styles should be added to the [`src/assets/main.css`](src/assets/main.css) file.

3. The project uses ESLint for linting and Prettier for code formatting. Ensure that any new code adheres to the rules specified in the [`.eslintrc.cjs`](.eslintrc.cjs) and [`.prettierrc.json`](.prettierrc.json) files.

4. The project uses Azure Functions for the backend API. When adding new API endpoints, follow the structure and conventions found in the [`api`](api) directory.

5. The project uses Pinia for state management. When modifying or adding to the application state, use the existing Pinia store structure.

## Specific Instructions

1. When working with the frontend Vue.js code, follow the structure and conventions found in the [`src`](src) directory. Use the existing Vue components as a guide when creating new components.

2. When working with the backend API, follow the structure and conventions found in the [`api`](api) directory. Use the existing Azure Functions as a guide when creating new functions.

3. When working with the application state, use the existing Pinia stores as a guide. The state is defined in the [`app.js`](src/stores/app.js) file.

4. When adding new styles, use Bulma classes where possible. Custom styles should be added to the [`src/assets/main.css`](src/assets/main.css) file.

5. When adding new API endpoints, follow the structure and conventions found in the [`api`](api) directory. Use the existing Azure Functions as a guide when creating new functions.

6. When modifying or adding to the application state, use the existing Pinia store structure. The state is defined in the [`app.js`](src/stores/app.js) file.

7. When adding new prompts or updating existing ones, use the [`savePrompt`](src/services/promptService.js) function in the [`src/services/promptService.js`](src/services/promptService.js) file as a guide.

8. When working with AI completions, use the [`getCompletion`](src/services/completionService.js) function in the [`src/services/completionService.js`](src/services/completionService.js) file as a guide.

9. When adding new tests, follow the structure and conventions found in the `tests` directory. Use the existing tests as a guide when creating new tests.

10. When adding new documentation, follow the structure and conventions found in the [`README.md`](README.md) and [`instructions.md`](instructions.md) files. Use these files as a guide when creating new documentation.