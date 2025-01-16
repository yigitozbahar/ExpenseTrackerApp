const ExpenseModel = require("../Models/ExpenseModel");

exports.addExpense = async (req,res) => {
   const {title, amount, category, description, date, user} = req.body;

   const expense = ExpenseModel({
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

      await expense.save()
      res.status(200).json({message: "Gider başarıyla eklendi!"})
   } catch (error) {
      res.status(500).json({message: error.message || "Gider eklenirken hata oluştu!"})
   }
}

exports.getExpenses = async (req, res) => {
   try {
      const {userId} = req.params;
      const expenses = await ExpenseModel.find({user: userId}).sort({createdAt: -1})
      res.status(200).json(expenses)
   } catch (error) {
      res.status(500).json({message: "Giderler getirilirken hata oluştu!"})
   }
}

exports.deleteExpense = async (req, res) => {
   const {id} = req.params;
   try {
      await ExpenseModel.findByIdAndDelete(id)
      res.status(200).json({message: "Gider başarıyla silindi!"})
   } catch (error) {
      res.status(500).json({message: "Gider silinirken hata oluştu!"})
   }
}