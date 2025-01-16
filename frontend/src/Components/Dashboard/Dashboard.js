import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import History from '../../History/History'
import { InnerLayout } from '../../styles/Layouts'
import { dollar } from '../../utils/Icons'
import Chart from '../Chart/Chart'

function Dashboard() {
    const {totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses, incomes, expenses} = useGlobalContext()

    const minIncome = () => {
        if(incomes.length === 0) return 0
        return Math.min(...incomes.map(item => item.amount))
    }

    const maxIncome = () => {
        if(incomes.length === 0) return 0
        return Math.max(...incomes.map(item => item.amount))
    }

    const minExpense = () => {
        if(expenses.length === 0) return 0
        return Math.min(...expenses.map(item => item.amount))
    }

    const maxExpense = () => {
        if(expenses.length === 0) return 0
        return Math.max(...expenses.map(item => item.amount))
    }

    return (
        <DashboardStyled>
            <InnerLayout>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Toplam Gelir</h2>
                                <p>
                                    ₺{totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Toplam Gider</h2>
                                <p>
                                    ₺{totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Toplam Bakiye</h2>
                                <p>
                                    ₺{totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">
                            Min <span>Gelir</span>Max
                        </h2>
                        <div className="salary-item">
                            <p>
                                ₺{minIncome()}
                            </p>
                            <p>
                                ₺{maxIncome()}
                            </p>
                        </div>
                        <h2 className="salary-title">
                            Min <span>Gider</span>Max
                        </h2>
                        <div className="salary-item">
                            <p>
                                ₺{minExpense()}
                            </p>
                            <p>
                                ₺{maxExpense()}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    text-align: center;
                    p{
                        font-size: 2.5rem;
                        font-weight: 700;
                    }
                }
                .balance{
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2.5rem;
                    }
                }
                .expense{
                    p{
                        color: var(--color-delete);
                        opacity: 0.6;
                        font-size: 2.5rem;
                    }
                }
                .income{
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }

    @media (max-width: 1200px) {
        .stats-con{
            grid-template-columns: repeat(2, 1fr);
            .chart-con{
                grid-column: 1 / -1;
            }
            .history-con{
                grid-column: 1 / -1;
            }
        }
    }
`;

export default Dashboard