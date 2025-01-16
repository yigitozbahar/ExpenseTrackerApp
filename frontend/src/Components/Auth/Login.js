import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import Button from '../Button/Button'

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [inputState, setInputState] = useState({
        email: '',
        password: ''
    })

    const { email, password } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(!email || !password) {
            setError('Lütfen tüm alanları doldurun')
            return
        }

        try {
            setError('')
            setLoading(true)
            await login(email, password)
            navigate('/')
        } catch (err) {
            setError('Giriş yapılamadı. Email veya şifre hatalı.')
        }
        setLoading(false)
    }

    return (
        <LoginStyled>
            <div className="login-content">
                <h2>Giriş Yap</h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input 
                            type="email" 
                            value={email}
                            name={'email'} 
                            placeholder="Email"
                            onChange={handleInput('email')}
                        />
                    </div>
                    <div className="input-control">
                        <input 
                            type="password"
                            value={password}
                            name={'password'} 
                            placeholder="Şifre"
                            onChange={handleInput('password')}
                        />
                    </div>
                    <div className="submit-btn">
                        <Button 
                            name={loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                            bPad={'.8rem 1.6rem'}
                            bRad={'30px'}
                            bg={'var(--color-accent)'}
                            color={'#fff'}
                            disabled={loading}
                        />
                    </div>
                </form>
                <div className="register-link">
                    Hesabınız yok mu? {' '}
                    <Link to="/register">Kayıt Ol</Link>
                </div>
            </div>
        </LoginStyled>
    )
}

const LoginStyled = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(252, 246, 249, 0.78);
    backdrop-filter: blur(4.5px);
    position: relative;
    z-index: 1;
    
    .login-content{
        background: #fff;
        border-radius: 20px;
        padding: 2rem;
        width: 360px;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

        h2{
            text-align: center;
            margin-bottom: 2rem;
            color: rgba(34, 34, 96, 1);
        }

        .input-control{
            input{
                width: 100%;
                margin-bottom: 1rem;
            }
        }

        .submit-btn{
            button{
                width: 100%;
                &:hover{
                    background: var(--color-green) !important;
                }
            }
        }

        .error{
            color: red;
            text-align: center;
            margin-bottom: 1rem;
        }

        .register-link{
            text-align: center;
            margin-top: 1rem;
            
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

export default Login 