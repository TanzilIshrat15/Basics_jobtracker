import React from 'react';

export default function JobItem({ job, onEdit, onDelete }) {
  return (
    <div className="job-row">
      <div>
        <div><strong>{job.company}</strong> — {job.role}</div>
        <div className="job-meta small">{job.dateApplied} • {job.status} • {job.source || '—'}</div>
      </div>
      <div className="controls">
        <button className="btn secondary" onClick={() => onEdit(job)}>Edit</button>
        <button className="btn" onClick={() => onDelete(job.id)}>Delete</button>
      </div>
    </div>
  );
}