import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layouts'
import { dateFormat } from '../../utils/dateFormat'
import Button from '../Button/Button'
import { trash } from '../../utils/Icons'

function Transactions() {
    const { incomes, expenses, categories, deleteIncome, deleteExpense } = useGlobalContext()
    
    const handleDelete = async (id, type) => {
        try {
            if (type === 'income') {
                await deleteIncome(id)
            } else {
                await deleteExpense(id)
            }
        } catch (error) {
            console.error('İşlem silinirken hata oluştu:', error)
        }
    }

    const monthlyTransactions = useMemo(() => {
        const combined = [...incomes, ...expenses].sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        
        const grouped = {}
        combined.forEach(transaction => {
            const date = new Date(transaction.date)
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            
            if (!grouped[monthYear]) {
                grouped[monthYear] = {
                    transactions: [],
                    totalIncome: 0,
                    totalExpense: 0
                }
            }
            
            const categoryData = categories.find(cat => cat.title === transaction.category)
            grouped[monthYear].transactions.push({
                ...transaction,
                categoryColor: categoryData?.color
            })
            
            if (transaction.type === 'income') {
                grouped[monthYear].totalIncome += transaction.amount
            } else {
                grouped[monthYear].totalExpense += transaction.amount
            }
        })
        
        return grouped
    }, [incomes, expenses, categories])

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>İşlemler</h1>
                <div className="transactions-content">
                    {Object.entries(monthlyTransactions).map(([monthYear, data]) => {
                        const [year, month] = monthYear.split('-')
                        const monthName = new Date(year, month - 1).toLocaleString('tr-TR', { month: 'long' })
                        
                        return (
                            <div key={monthYear} className="month-group">
                                <div className="month-header">
                                    <h2>{monthName} {year}</h2>
                                    <div className="month-summary">
                                        <div className="income">Gelir: +₺{data.totalIncome}</div>
                                        <div className="expense">Gider: -₺{data.totalExpense}</div>
                                        <div className="balance">Bakiye: ₺{data.totalIncome - data.totalExpense}</div>
                                    </div>
                                </div>
                                <div className="transactions-list">
                                    {data.transactions.map((item) => (
                                        <div key={item._id} className="transaction-item">
                                            <div className="indicator" style={{backgroundColor: item.categoryColor}} />
                                            <div className="content">
                                                <h4>{item.title}</h4>
                                                <div className="details">
                                                    <p>{item.category}</p>
                                                    <p>{dateFormat(item.date)}</p>
                                                    {item.description && <p>{item.description}</p>}
                                                </div>
                                            </div>
                                            <div className={`amount ${item.type}`}>
                                                {item.type === 'expense' ? '-' : '+'}₺{item.amount}
                                            </div>
                                            <div className="btn-con">
                                                <Button 
                                                    icon={trash}
                                                    bPad={'0.8rem'}
                                                    bRad={'50%'}
                                                    bg={'var(--primary-color'}
                                                    color={'#fff'}
                                                    iColor={'#fff'}
                                                    hColor={'var(--color-green)'}
                                                    onClick={() => handleDelete(item._id, item.type)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </InnerLayout>
        </TransactionsStyled>
    )
}

const TransactionsStyled = styled.div`
    .transactions-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .month-group {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 2rem;
    }

    .month-header {
        margin-bottom: 1.5rem;
        
        h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: capitalize;
        }

        .month-summary {
            display: flex;
            gap: 2rem;
            font-weight: 500;

            .income { color: var(--color-green); }
            .expense { color: red; }
            .balance { color: var(--primary-color); }
        }
    }

    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .transaction-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 1rem;

        .indicator {
            width: 0.5rem;
            height: 100%;
            min-height: 5rem;
            border-radius: 0.5rem;
        }

        .content {
            flex: 1;

            h4 {
                margin-bottom: 0.5rem;
            }

            .details {
                display: flex;
                gap: 1.5rem;
                font-size: 0.9rem;
                color: var(--primary-color3);
            }
        }

        .amount {
            font-weight: 600;
            font-size: 1.1rem;
            margin-right: 1rem;

            &.income { color: var(--color-green); }
            &.expense { color: red; }
        }

        .btn-con {
            display: flex;
            align-items: center;
        }
    }
`;

export default Transactions 