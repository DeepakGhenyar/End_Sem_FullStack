import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import { Sparkles, Loader2 } from 'lucide-react';

const AiRecommendations = () => {
    const location = useLocation();
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Check if we passed an employeeId via router state
    const employeeId = location.state?.employeeId;

    useEffect(() => {
        if (employeeId) {
            generateRecommendation(employeeId);
        } else {
            generateRecommendation(null); // Get ranking for all
        }
    }, [employeeId]);

    const generateRecommendation = async (id) => {
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/ai/recommend', { employeeId: id });
            setRecommendation(res.data.recommendation);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate AI recommendation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <Sparkles style={{ color: 'var(--primary)' }} size={28} />
                <h2>AI Performance Insights</h2>
            </div>

            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                    <Loader2 className="lucide-spin" size={48} style={{ animation: 'spin 2s linear infinite', marginBottom: '1rem' }} />
                    <p>Generating insights using AI...</p>
                    <style>{`
                        @keyframes spin { 100% { transform: rotate(360deg); } }
                    `}</style>
                </div>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {recommendation}
                </div>
            )}
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                {!employeeId && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Showing overall company ranking and recommendations.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AiRecommendations;
