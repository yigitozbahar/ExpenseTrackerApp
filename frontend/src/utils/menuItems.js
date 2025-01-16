import {dashboard, expenses, transactions, trend, categories} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: "Dashboard",
        icon: dashboard,
        link: "/dashboard"
    },
    {
        id: 2,
        title: "İşlemler",
        icon: transactions,
        link: "/transactions",
    },
    {
        id: 3,
        title: "Gelirler",
        icon: trend,
        link: "/incomes",
    },
    {
        id: 4,
        title: "Giderler",
        icon: expenses,
        link: "/expenses",
    },
    {
        id: 5,
        title: "Kategoriler",
        icon: categories,
        link: "/categories",
    },
]