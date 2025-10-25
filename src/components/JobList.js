import React, { useEffect, useState } from 'react';
import JobForm from './JobForm';
import JobItem from './JobItem';
import * as api from '../services/api';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('All');

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.fetchJobs();
      setJobs(res.data || []);
    } catch (err) {
      console.error(err);
      setJobs([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (payload) => {
    try {
      await api.createJob(payload);
      await load();
    } catch (err) { console.error(err); alert('Failed to create job'); }
  };

  const handleUpdate = async (payload) => {
    try {
      await api.updateJob(editing.id, payload);
      setEditing(null);
      await load();
    } catch (err) { console.error(err); alert('Failed to update job'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try { await api.deleteJob(id); await load(); } catch (err) { console.error(err); }
  };

  const filtered = jobs.filter(j => filter === 'All' ? true : j.status === filter);

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <div>
          <strong>Jobs</strong>
          <div className="small">Total: {jobs.length}</div>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="input" style={{width:160}}>
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <div className="small">Filter</div>
        </div>
      </div>

      {!editing && <JobForm onSaved={handleCreate} />}

      {editing && <JobForm initial={editing} onSaved={handleUpdate} onCancel={() => setEditing(null)} />}

      <div className="job-list">
        {loading ? <div className="small">Loading...</div> : (
          filtered.length === 0 ? <div className="small">No jobs found</div> :
          filtered.map(job => (
            <JobItem key={job.id} job={job} onEdit={(j)=>setEditing({...j, dateApplied: j.dateApplied})} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}