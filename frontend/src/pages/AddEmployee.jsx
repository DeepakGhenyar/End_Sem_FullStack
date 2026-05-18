import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        skills: '',
        performanceScore: '',
        experience: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Process skills from comma separated to array
            const skillsArray = formData.skills.split(',').map(s => s.trim());
            
            const payload = {
                ...formData,
                skills: skillsArray,
                performanceScore: Number(formData.performanceScore),
                experience: Number(formData.experience)
            };

            await api.post('/employees', payload);
            setSuccess('Employee stored successfully');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add employee');
        }
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Add New Employee</h2>
            {error && <p className="error" style={{ marginBottom: '1rem' }}>{error}</p>}
            {success && <p style={{ color: '#059669', marginBottom: '1rem' }}>{success}</p>}
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Department</label>
                    <select name="department" value={formData.department} onChange={handleChange} required>
                        <option value="">Select Department</option>
                        <option value="Development">Development</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Skills (comma separated)</label>
                    <input type="text" name="skills" placeholder="e.g. React, Node.js, MongoDB" value={formData.skills} onChange={handleChange} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="input-group">
                        <label>Performance Score (0-100)</label>
                        <input type="number" name="performanceScore" min="0" max="100" value={formData.performanceScore} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Years of Experience</label>
                        <input type="number" name="experience" min="0" value={formData.experience} onChange={handleChange} required />
                    </div>
                </div>
                <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Save Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
