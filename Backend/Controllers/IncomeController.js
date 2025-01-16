const IncomeModel = require("../Models/IncomeModel");

exports.addIncome = async (req,res) => {
   const {title, amount, category, description, date, user} = req.body;

   const income = IncomeModel({
      title,
      amount,
      category,
      description,
      date,
      user
   })

   try {
      if(!title || !amount || !category || !date || !user) {
         return res.status(400).json({message: "Tüm zorunlu alanları doldurun!"})
      }
      if(amount <= 0 || !amount === 'number') {
         return res.status(400).json({message: "Miktar pozitif bir sayı olmalıdır"})
      }
      if(title.length > 50) {
         return res.status(400).json({message: "Başlık 50 karakterden uzun olamaz"})
      }
      if(description && description.length > 200) {
         return res.status(400).json({message: "Açıklama 200 karakterden uzun olamaz"})
      }

      await income.save()
      res.status(200).json({message: "Gelir başarıyla eklendi!"})
   } catch (error) {
      res.status(500).json({message: error.message || "Gelir eklenirken hata oluştu!"})
   }
}

exports.getIncomes = async (req, res) => {
   try {
      const {userId} = req.params;
      const incomes = await IncomeModel.find({user: userId}).sort({createdAt: -1})
      res.status(200).json(incomes)
   } catch (error) {
      res.status(500).json({message: "Gelirler getirilirken hata oluştu!"})
   }
}

exports.deleteIncome = async (req, res) => {
   const {id} = req.params;
   try {
      await IncomeModel.findByIdAndDelete(id)
      res.status(200).json({message: "Gelir başarıyla silindi!"})
   } catch (error) {
      res.status(500).json({message: "Gelir silinirken hata oluştu!"})
   }
}