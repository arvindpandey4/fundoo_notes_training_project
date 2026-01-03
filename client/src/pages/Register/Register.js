import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.scss';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
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
                    <h2 className="auth-card-title">Create your account</h2>
                    <p className="auth-card-subtitle">to continue to Fundoo Notes</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>

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

                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-actions">
                            <Link to="/login" className="btn btn-secondary">
                                Sign in instead
                            </Link>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="auth-footer">
                    <p>
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
