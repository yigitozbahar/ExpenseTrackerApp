import React from 'react'
import styled from 'styled-components'
import { trash } from '../../utils/Icons'
import Button from '../Button/Button'
import { useGlobalContext } from '../../context/globalContext'
import { CATEGORY_ICONS } from '../../utils/categoryIcons'

function CategoryItem({
    id,
    title,
    type,
    color,
    isBase,
    icon = 'circle',
    createdAt,
}) {
    const { deleteCategory } = useGlobalContext()

    const handleDelete = async () => {
        try {
            await deleteCategory(id);
        } catch (error) {
            console.error('Kategori silme hatası:', error);
        }
    };

    const categoryIcon = CATEGORY_ICONS[icon]?.icon || CATEGORY_ICONS.circle.icon;

    return (
        <CategoryItemStyled color={color}>
            <div className="category-content">
                <div className="left-content">
                    <div className="icon-container">
                        <i className="category-icon">{categoryIcon}</i>
                    </div>
                    <div className="title">
                        <h5>{title}</h5>
                        <span className="type">{isBase ? 'Varsayılan Kategori' : 'Özel Kategori'}</span>
                    </div>
                </div>
                <div className="right-content">
                    {isBase ? (
                        null
                    ) : (
                        <div className="delete-btn">
                            <Button 
                                icon={trash}
                                bPad={'0.6rem'}
                                bRad={'50%'}
                                bg={'rgba(34, 34, 96, 0.1)'}
                                color={'var(--primary-color)'}
                                iColor={'#fff'}
                                hColor={'var(--color-green)'}
                                onClick={handleDelete}
                            />
                        </div>
                    )}
                </div>
            </div>
        </CategoryItemStyled>
    )
}

const CategoryItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1.5rem;
    min-width: 300px;
    
    .category-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        
        .left-content {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            flex: 1;
            
            .icon-container {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                background: ${props => props.color};
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

                .category-icon {
                    font-size: 1.5rem;
                    color: #fff;
                }
            }

            .title {
                flex: 1;
                h5 {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: var(--primary-color);
                    margin-bottom: 0.3rem;
                }
                
                .type {
                    font-size: 0.9rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }

        .right-content {
            display: flex;
            align-items: center;
            
            .badge {
                background: rgba(34, 34, 96, 0.1);
                padding: 0.5rem 1rem;
                border-radius: 30px;
                font-size: 0.8rem;
                color: var(--primary-color);
                white-space: nowrap;
            }

            .delete-btn {
                display: flex;
                align-items: center;
                
                button {
                    padding: 0.4rem;
                    min-width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    &:hover {
                        background: rgba(255, 0, 0, 0.1) !important;
                        color: red !important;
                    }
                }
            }
        }
    }
`;

export default CategoryItem 