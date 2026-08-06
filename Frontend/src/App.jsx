import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app.routes'; 
import { AuthProvider } from './features/auth/auth.context.jsx';
import { InterviewProvider } from './features/interview/interview.context.jsx'; // Fixed import casing (Capital I)

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} /> {/* Fixed tag casing (Capital P) */}
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;