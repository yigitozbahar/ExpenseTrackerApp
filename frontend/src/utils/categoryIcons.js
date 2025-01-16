import { book, calender, card, circle, clothing, food, freelance, medical, money, piggy, stocks, takeaway, tv, users, bitcoin, comment, dollar, yt } from './Icons'

export const CATEGORY_ICONS = {
    money: { icon: money, label: 'Para' },
    freelance: { icon: freelance, label: 'Serbest Çalışma' },
    stocks: { icon: stocks, label: 'Yatırım' },
    piggy: { icon: piggy, label: 'Birikim' },
    bitcoin: { icon: bitcoin, label: 'Kripto' },
    dollar: { icon: dollar, label: 'Döviz' },
    
    food: { icon: food, label: 'Yemek' },
    takeaway: { icon: takeaway, label: 'Market' },
    clothing: { icon: clothing, label: 'Giyim' },
    medical: { icon: medical, label: 'Sağlık' },
    book: { icon: book, label: 'Eğitim' },
    tv: { icon: tv, label: 'Eğlence' },
    card: { icon: card, label: 'Fatura' },
    calender: { icon: calender, label: 'Etkinlik' },
    users: { icon: users, label: 'Sosyal' },
    comment: { icon: comment, label: 'İletişim' },
    yt: { icon: yt, label: 'Medya' },
    circle: { icon: circle, label: 'Genel' }
}

export const getCategoryIcon = (title) => {
    const titleLower = title.toLowerCase()
    
    // Gelir kategorileri için simgeler
    if (titleLower.includes('maaş')) return money
    if (titleLower.includes('freelance')) return freelance
    if (titleLower.includes('yatırım')) return stocks
    if (titleLower.includes('birikim')) return piggy
    
    // Gider kategorileri için simgeler
    if (titleLower.includes('yemek')) return food
    if (titleLower.includes('market')) return takeaway
    if (titleLower.includes('giyim')) return clothing
    if (titleLower.includes('sağlık')) return medical
    if (titleLower.includes('eğitim')) return book
    if (titleLower.includes('eğlence')) return tv
    if (titleLower.includes('fatura')) return card
    if (titleLower.includes('etkinlik')) return calender
    if (titleLower.includes('sosyal')) return users
    
    // Varsayılan simge
    return circle
} 