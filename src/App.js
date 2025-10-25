import React from 'react';
import JobList from './components/JobList';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Job Tracker</h1>
        <p>Track your job applications — add, edit, delete and filter.</p>
      </header>
      <main>
        <JobList />
      </main>
    </div>
  );
}

export default App;
