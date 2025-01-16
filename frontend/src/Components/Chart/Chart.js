import React from 'react'
import {
    Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {incomes, expenses} = useGlobalContext()

    const allDates = [...new Set([
        ...incomes.map(inc => dateFormat(inc.date)),
        ...expenses.map(exp => dateFormat(exp.date))
    ])].sort((a, b) => new Date(a) - new Date(b))

    const data = {
        labels: allDates,
        datasets: [
            {
                label: 'Gelir',
                data: allDates.map(date => {
                    const dayIncomes = incomes.filter(inc => dateFormat(inc.date) === date)
                    return dayIncomes.reduce((total, inc) => total + inc.amount, 0)
                }),
                backgroundColor: 'green',
                borderColor: 'green',
                tension: .2,
                fill: false
            },
            {
                label: 'Gider',
                data: allDates.map(date => {
                    const dayExpenses = expenses.filter(exp => dateFormat(exp.date) === date)
                    return dayExpenses.reduce((total, exp) => total + exp.amount, 0)
                }),
                backgroundColor: 'red',
                borderColor: 'red',
                tension: .2,
                fill: false
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '₺' + value
                    }
                }
            }
        }
    }

    return (
        <ChartStyled >
            <Line data={data} options={options} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart