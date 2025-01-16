const CategoryModel = require("../Models/CategoryModel")
const baseCategories = require("../utils/baseCategories")

const initializeBaseCategories = async () => {
    for(let category of baseCategories) {
        const exists = await CategoryModel.findOne({ 
            title: category.title, 
            isBase: true 
        })
        if(!exists) {
            await CategoryModel.create(category)
        }
    }
}

initializeBaseCategories()

exports.getCategories = async (req, res) => {
    const userId = req.user._id
    const {type} = req.query

    try {
        const query = {
            $or: [
                { isBase: true },
                { user: userId }
            ]
        }
        if(type) {
            query.type = type
        }

        console.log('Query:', query)
        console.log('User ID:', userId)
        console.log('Type:', type)

        const categories = await CategoryModel.find(query).sort({createdAt: -1})
        console.log('Found Categories:', categories)
        
        res.status(200).json(categories)
    } catch (error) {
        console.error('Get Categories Error:', error)
        res.status(500).json({message: 'Kategoriler getirilirken bir hata oluştu!'})
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    
    try {
        const category = await CategoryModel.findById(id);
        
        if (!category) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }

        await CategoryModel.findByIdAndDelete(id);
        
        res.status(200).json({ message: 'Kategori başarıyla silindi' });
    } catch (error) {
        console.error('Kategori silme hatası:', error);
        res.status(500).json({ message: 'Kategori silinirken bir hata oluştu' });
    }
};

exports.addCategory = async (req, res) => {
    const {title, type, color, icon} = req.body
    const userId = req.user._id

    try {
        const existingCategory = await CategoryModel.findOne({
            title, 
            type,
            user: userId
        })

        if(existingCategory) {
            return res.status(400).json({message: 'Bu kategori zaten mevcut!'})
        }

        const category = await CategoryModel.create({
            title,
            type,
            color,
            icon,
            user: userId
        })

        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({message: 'Kategori oluşturulurken bir hata oluştu!'})
    }
}

exports.updateCategory = async (req, res) => {
    const {id} = req.params
    const {title, color, icon} = req.body
    const userId = req.user._id

    try {
        const category = await CategoryModel.findOne({_id: id})

        if(!category) {
            return res.status(404).json({message: 'Kategori bulunamadı!'})
        }

        if(category.isBase) {
            return res.status(403).json({message: 'Base kategoriler güncellenemez!'})
        }

        if(category.user.toString() !== userId.toString()) {
            return res.status(403).json({message: 'Bu kategoriyi güncelleme yetkiniz yok!'})
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            {title, color, icon},
            {new: true, runValidators: true}
        )

        res.status(200).json(updatedCategory)
    } catch (error) {
        res.status(500).json({message: 'Kategori güncellenirken bir hata oluştu!'})
    }
} 