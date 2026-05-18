import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Users, PlusCircle, Brain } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Brain /> AI HR Analytics
                </Link>
            </div>
            <div>
                {user ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={18}/> Employees</Link>
                        <Link to="/add-employee" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}><PlusCircle size={18}/> Add Employee</Link>
                        <Link to="/ai-recommendations" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}><Brain size={18}/> AI Insights</Link>
                        <button onClick={handleLogout} className="btn" style={{ background: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}><LogOut size={18}/> Logout</button>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
