import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'

function Register() {
    const navigate = useNavigate()
    const { register, error: authError } = useAuth()
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const updatedFormData = {
                ...formData,
                fullName: formData.fullName
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')
            }
            
            await register(updatedFormData)
            navigate('/')
        } catch (err) {
            setError(err.message || authError)
        }
    }

    return (
        <RegisterStyled>
            <div className="register-content">
                <h2>Kayıt Ol</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            placeholder="Kullanıcı Adı"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="Şifre"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            placeholder="Ad Soyad"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="submit-btn">
                        <Button 
                            name="Kayıt Ol"
                            bPad={'.8rem 1.6rem'}
                            bRad={'30px'}
                            bg={'var(--color-accent)'}
                            color={'#fff'}
                        />
                    </div>
                </form>
                <div className="login-link">
                    Zaten hesabınız var mı? {' '}
                    <Link to="/login">Giriş Yap</Link>
                </div>
            </div>
        </RegisterStyled>
    )
}

const RegisterStyled = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(252, 246, 249, 0.78);
    
    .register-content {
        background: white;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 2rem;
        width: 360px;

        h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: var(--primary-color);
        }

        .input-control {
            input {
                width: 100%;
                padding: 0.7rem;
                margin: 0.6rem 0;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 1rem;
                
                &:focus {
                    outline: none;
                    border-color: var(--color-accent);
                }
            }
        }

        .submit-btn {
            margin: 1.5rem 0;
            button {
                width: 100%;
                background: var(--color-accent) !important;
            }
        }

        .error {
            color: red;
            text-align: center;
            margin-bottom: 1rem;
        }

        .login-link {
            text-align: center;
            
            a {
                color: var(--color-accent);
                text-decoration: none;
                font-weight: 600;
                
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

export default Register 