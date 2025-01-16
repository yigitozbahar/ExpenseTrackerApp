import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import { useGlobalContext } from '../../context/globalContext'
import CategoryForm from './CategoryForm'
import CategoryItem from './CategoryItem'

function Categories() {
    const { categories, getCategories } = useGlobalContext()
    const [activeTab, setActiveTab] = useState('income')

    useEffect(() => {
        getCategories(activeTab)
    }, [activeTab])

    const filteredCategories = categories.filter(category => category.type === activeTab)

    return (
        <CategoriesStyled>
            <InnerLayout>
                <h1>Kategoriler</h1>
                <div className="category-tabs">
                    <button 
                        className={`tab ${activeTab === 'income' ? 'active' : ''}`}
                        onClick={() => setActiveTab('income')}
                    >
                        Gelir Kategorileri
                    </button>
                    <button 
                        className={`tab ${activeTab === 'expense' ? 'active' : ''}`}
                        onClick={() => setActiveTab('expense')}
                    >
                        Gider Kategorileri
                    </button>
                </div>
                <div className="categories-content">
                    <div className="form-container">
                        <CategoryForm type={activeTab} />
                    </div>
                    <div className="categories-list">
                        {filteredCategories.map((category) => (
                            <CategoryItem
                                key={category._id}
                                id={category._id}
                                title={category.title}
                                type={category.type}
                                color={category.color}
                                isBase={category.isBase}
                                icon={category.icon}
                                createdAt={category.createdAt}
                            />
                        ))}
                    </div>
                </div>
            </InnerLayout>
        </CategoriesStyled>
    )
}

const CategoriesStyled = styled.div`
    .category-tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;

        .tab {
            padding: 1rem 2rem;
            border-radius: 30px;
            background: rgba(252, 246, 249, 0.78);
            border: 2px solid #FFFFFF;
            font-size: 1rem;
            cursor: pointer;
            transition: all .4s ease;

            &:hover {
                background: var(--color-green);
                color: #fff;
            }
        }

        .active {
            background: var(--color-green);
            color: #fff;
        }
    }

    .categories-content {
        display: flex;
        gap: 2rem;
        
        .form-container {
            flex: 1;
        }
        
        .categories-list {
            flex: 2;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }
    }
`;

export default Categories 