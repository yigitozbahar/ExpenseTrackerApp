import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'
import { useAuth } from './authContext'

const BASE_URL = "http://localhost:5000/api/v1/"

axios.defaults.withCredentials = true 

export const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const { user } = useAuth()
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [categories, setCategories] = useState([])
    const [darkMode, setDarkMode] = useState(false)

    const getIncomes = async () => {
        try {
            if (!user?._id) {
                throw new Error('Kullanıcı bilgisi bulunamadı');
            }

            const response = await axios.get(`${BASE_URL}transactions/get-incomes/${user._id}`)
            setIncomes(response.data)
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        }
    }

    const getExpenses = async () => {
        try {
            if (!user?._id) {
                throw new Error('Kullanıcı bilgisi bulunamadı');
            }

            const response = await axios.get(`${BASE_URL}transactions/get-expenses/${user._id}`)
            setExpenses(response.data)
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        }
    }

    const addIncome = async (income) => {
        try {
            if (!user?._id) {
                throw new Error('Kullanıcı bilgisi bulunamadı');
            }

            const response = await axios.post(`${BASE_URL}transactions/add-income`, {
                ...income,
                user: user._id
            })
            
            getIncomes()
            setError('')
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        }
    }

    const addExpense = async (expense) => {
        try {
            if (!user?._id) {
                throw new Error('Kullanıcı bilgisi bulunamadı');
            }

            const response = await axios.post(`${BASE_URL}transactions/add-expense`, {
                ...expense,
                user: user._id
            })
            
            getExpenses()
            setError('')
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        }
    }

    const deleteIncome = async (id) => {
        if (!user) return;
        try {
            const response = await axios.delete(`${BASE_URL}transactions/delete-income/${id}`)
            await getIncomes()
            setError('')
            return response.data
        } catch (err) {
            setError(err.response?.data?.message || 'Gelir silinirken bir hata oluştu')
            throw err
        }
    }

    const deleteExpense = async (id) => {
        if (!user) return;
        try {
            const response = await axios.delete(`${BASE_URL}transactions/delete-expense/${id}`)
            await getExpenses()
            setError('')
            return response.data
        } catch (err) {
            setError(err.response?.data?.message || 'Gider silinirken bir hata oluştu')
            throw err
        }
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })
        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        return history.slice(0, 3)
    }

    const addCategory = async (category) => {
        try {
            const response = await axios.post(`${BASE_URL}categories/add-category`, category)
            getCategories(category.type)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const getCategories = async (type = '') => {
        try {
            const response = await axios.get(`${BASE_URL}categories/get-categories`)
            setCategories(response.data)
        } catch (error) {
            setError(error.response?.data?.message)
        }
    }

    const deleteCategory = async (id) => {
        try {
            if (!user?._id) {
                throw new Error('Kullanıcı bilgisi bulunamadı');
            }

            const response = await axios.delete(`${BASE_URL}categories/delete-category/${id}`, {
                withCredentials: true
            });

            if (response.status === 200) {
                setCategories(prev => prev.filter(category => category._id !== id));
                setError('');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Kategori silinirken bir hata oluştu');
            throw error;
        }
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode)
    }

    useEffect(() => {
        if (user?._id) {
            getIncomes()
            getExpenses()
            getCategories()
        }
    }, [user])

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            categories,
            addCategory,
            getCategories,
            deleteCategory,
            darkMode,
            toggleTheme
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
