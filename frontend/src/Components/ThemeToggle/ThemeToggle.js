import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

function ThemeToggle() {
    const { darkMode, toggleTheme } = useGlobalContext()

    return (
        <ThemeToggleStyled onClick={toggleTheme}>
            {darkMode ? '☀️' : '🌙'}
        </ThemeToggleStyled>
    )
}

const ThemeToggleStyled = styled.button`
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${props => props.theme.bgAlt};
    border: 2px solid ${props => props.theme.border};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 999;
    
    &:hover {
        transform: scale(1.1);
    }
`;

export default ThemeToggle 