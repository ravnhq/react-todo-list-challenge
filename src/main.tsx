import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { FormChallengeApp } from './FormChallengeApp.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import './FormChallengeApp.css';
import { TaskProvider } from './contexts/TaskContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TaskProvider>
        <FormChallengeApp />
      </TaskProvider>
    </ThemeProvider>
  </StrictMode>
);
