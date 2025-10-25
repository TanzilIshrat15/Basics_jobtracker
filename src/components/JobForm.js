import React, { useState, useEffect } from 'react';

export default function JobForm({ initial = null, onSaved, onCancel }) {
  const empty = { company:'', role:'', dateApplied:'', status:'Applied', source:'', salary:'', notes:'' };
  const [form, setForm] = useState(initial || empty);
  useEffect(() => setForm(initial || empty), [initial]);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.company || !form.role || !form.dateApplied) {
      alert('Company, Role and Date are required');
      return;
    }
    const payload = { ...form, salary: form.salary ? parseFloat(form.salary) : null };
    await onSaved(payload);
    setForm(empty);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <strong>{initial ? 'Edit Job' : 'Add Job'}</strong>
        {onCancel && <button type="button" className="btn secondary" onClick={() => onCancel()}>Cancel</button>}
      </div>

      <div className="form-grid">
        <input className="input" name="company" placeholder="Company" value={form.company} onChange={change} required/>
        <input className="input" name="role" placeholder="Role" value={form.role} onChange={change} required/>
      </div>

      <div className="form-grid">
        <input className="input" name="dateApplied" type="date" value={form.dateApplied} onChange={change} required />
        <select className="input" name="status" value={form.status} onChange={change}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="form-grid">
        <input className="input" name="source" placeholder="Source (LinkedIn, Referral...)" value={form.source} onChange={change}/>
        <input className="input" name="salary" placeholder="Salary" value={form.salary} onChange={change}/>
      </div>

      <textarea className="input" name="notes" placeholder="Notes" value={form.notes} onChange={change} rows="3"/>

      <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
        <button className="btn" type="submit">{initial ? 'Save' : 'Add Job'}</button>
      </div>
    </form>
  );
}
