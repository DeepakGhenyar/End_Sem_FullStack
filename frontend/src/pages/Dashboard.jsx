import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Trash2, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async (query = '') => {
        try {
            const url = query ? `/employees/search?department=${query}` : '/employees';
            const res = await api.get(url);
            setEmployees(res.data);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        fetchEmployees(e.target.value);
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                fetchEmployees(); // refresh
            } catch (error) {
                console.error("Failed to delete", error);
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Employee List</h2>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--text-muted)' }} size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by Department..." 
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                    />
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Score</th>
                            <th>Experience</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp._id}>
                                <td>
                                    <div style={{ fontWeight: 500 }}>{emp.name}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{emp.email}</div>
                                </td>
                                <td>{emp.department}</td>
                                <td>
                                    <span style={{ 
                                        padding: '4px 8px', 
                                        borderRadius: '12px', 
                                        fontSize: '0.875rem',
                                        backgroundColor: emp.performanceScore >= 80 ? '#D1FAE5' : emp.performanceScore < 60 ? '#FEE2E2' : '#FEF3C7',
                                        color: emp.performanceScore >= 80 ? '#065F46' : emp.performanceScore < 60 ? '#991B1B' : '#92400E'
                                    }}>
                                        {emp.performanceScore}
                                    </span>
                                </td>
                                <td>{emp.experience} yrs</td>
                                <td>
                                    <button onClick={() => navigate('/ai-recommendations', { state: { employeeId: emp._id } })} className="btn" style={{ background: 'var(--primary)', marginRight: '0.5rem', padding: '4px 8px' }}>
                                        <BrainCircuit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(emp._id)} className="btn" style={{ background: '#DC2626', padding: '4px 8px' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No employees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
