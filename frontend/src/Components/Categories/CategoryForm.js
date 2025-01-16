import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../utils/Icons'
import { CATEGORY_ICONS } from '../../utils/categoryIcons'

function CategoryForm({ type }) {
    const { addCategory, error, setError } = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        type: type,
        color: '#000000',
        icon: 'circle'
    })

    useEffect(() => {
        setInputState(prev => ({
            ...prev,
            type: type
        }))
    }, [type])

    const { title, color, icon } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(!title) {
            setError('Lütfen kategori adını giriniz!')
            return
        }
        addCategory(inputState)
        setInputState({
            ...inputState,
            title: '',
            color: '#000000',
            icon: 'circle'
        })
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder={`Yeni ${type === 'income' ? 'Gelir' : 'Gider'} Ekle`}
                    onChange={handleInput('title')}
                />
            </div>
            <div className="color-input">
                <label>Renk:</label>
                <input 
                    type="color" 
                    value={color}
                    onChange={handleInput('color')}
                />
            </div>
            <div className="selects input-control">
                <label>İkon: </label>
                <select value={icon} onChange={handleInput('icon')}>
                    {Object.entries(CATEGORY_ICONS).map(([key, {icon, label}]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Kategori Ekle'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 1rem;
    background: rgba(252, 246, 249, 0.78);
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;

    .form-title {
        h3 {
            color: var(--color-green);
            margin-bottom: 0.5rem;
        }
    }

    .input-control {
        input {
            width: 100%;
            padding: .8rem 1rem;
            border: 2px solid #fff;
            border-radius: 5px;
            background: transparent;
            resize: none;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            color: rgba(34, 34, 96, 0.9);
            &::placeholder {
                color: rgba(34, 34, 96, 0.4);
            }
        }
    }

    .color-input {
        display: flex;
        align-items: center;
        gap: 1rem;

        label {
            font-size: 1rem;
            color: rgba(34, 34, 96, 0.9);
        }

        input[type="color"] {
            width: 70px;
            height: 40px;
            padding: 2px;
        }
    }

    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }

    .error {
        color: red;
        font-size: 0.9rem;
        margin-top: -0.5rem;
    }
`;

export default CategoryForm 