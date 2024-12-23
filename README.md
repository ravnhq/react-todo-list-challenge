# React Todo List Challenge

**Specifications**

1. **Project Setup**
   - Use **Vite** to initialize a vanilla React project for optimal performance and simplicity.
   - Configure the project to use TypeScript for static typing and improved developer experience.
2. **Form Management**
   - Utilize **React Hook Form** as the primary library for managing the form's state and interactions.
3. **Validation**
   - Leverage **Zod** as the schema validation and resolver library to handle field validations seamlessly.
4. **Field Requirements**

   Add validations and type-checking for the following form fields:

   - **Task Name**:
     - Required.
     - Minimum length: 5 characters.
     - Maximum length: 30 characters.
   - **Priority**:
     - Required.
     - One of: `Urgent`, `High`, `Normal`, or `Low`.
   - **Story Points**:
     - Required.
     - Must be a positive integer between 1 and 20.
   - **Assignee**:
     - Required.
     - Must be a valid user name (letters and spaces only).
   - **Due Date**:
     - Required.
     - Must be a valid date in the future.

5. **Data Persistence**
   - Persist the to-do list data in **local storage** so that tasks remain intact even after the page is reloaded.
6. **Design**
   - Free design, the design and styling is entirely up to you.
7. **Deployment**
   - Deploy the app using **Vercel** to make it publicly accessible.

**Additional Features (Optional)**

- **Task Completion**:
  - Add a checkbox to mark tasks as completed.
  - Optionally, separate completed tasks from active ones.
- **Search**:
  - Include a search bar to find tasks by name or assignee.
