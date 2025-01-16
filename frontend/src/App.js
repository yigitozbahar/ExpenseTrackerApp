import React, {useMemo, useState} from 'react'
import styled from "styled-components";
import { Routes, Route, Navigate } from 'react-router-dom';
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { useAuth } from './context/authContext';
import Categories from './Components/Categories/Categories'
import Transactions from './Components/Transactions/Transactions'

function App() {
    const [active, setActive] = useState(1)
    const { user } = useAuth()
    
    const orbMemo = useMemo(() => {
        return <Orb />
    }, [])

    const publicRoutes = (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={
                <RegisterWrapper>
                    <Register />
                </RegisterWrapper>
            } />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    )

    const privateRoutes = (
        <Routes>
            <Route path="/" element={
                <MainLayout>
                    <Navigation active={active} setActive={setActive} />
                    <main><Dashboard /></main>
                </MainLayout>
            } />
            <Route path="/dashboard" element={
                <MainLayout>
                    <Navigation active={active} setActive={setActive} />
                    <main><Dashboard /></main>
                </MainLayout>
            } />
            <Route path="/categories" element={
                <MainLayout>
                    <Navigation active={active} setActive={setActive} />
                    <main><Categories /></main>
                </MainLayout>
            } />
            <Route path="/incomes" element={
                <MainLayout>
                    <Navigation active={active} setActive={setActive} />
                    <main><Income /></main>
                </MainLayout>
            } />
            <Route path="/expenses" element={
                <MainLayout>
                    <Navigation active={active} setActive={setActive} />
                    <main><Expenses /></main>
                </MainLayout>
            } />
            <Route path="/transactions" element={
                <MainLayout>
                    <Navigation active={active} setActive={setActive} />
                    <main><Transactions /></main>
                </MainLayout>
            } />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )

    return (
        <AppStyled bg={bg} className="App">
            <OrbStyled>
                {orbMemo}
            </OrbStyled>
            {!user ? publicRoutes : privateRoutes}
        </AppStyled>
    )
}

const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative;
    main{
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar{
            width: 0;
        }
    }
`;


const RegisterWrapper = styled.div`
    position: relative;
    z-index: 1;  // Register sayfası için z-index ayarı
`;

const OrbStyled = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;  // Orb için z-index ayarı
`;

export default App;
