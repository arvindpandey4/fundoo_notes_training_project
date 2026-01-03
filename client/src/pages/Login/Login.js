import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.scss';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <span style={{ fontSize: '48px', marginRight: '16px' }}>📝</span>
                    <h1 className="auth-title">Fundoo Notes</h1>
                </div>

                <div className="auth-card">
                    <h2 className="auth-card-title">Sign in</h2>
                    <p className="auth-card-subtitle">to continue to Keep</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-footer">
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot password?
                            </Link>
                        </div>

                        <div className="form-actions">
                            <Link to="/register" className="btn btn-secondary">
                                Create account
                            </Link>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="auth-footer">
                    <p>
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
