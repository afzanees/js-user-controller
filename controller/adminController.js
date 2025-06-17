const adminModel = require('../model/adminModel');
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');

const loadLogin = (req,res) => {
    res.render('admin/login')
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });

        if (!admin) {
            console.log("User not found");
            return res.render('admin/login', { message: 'Invalid credential' });
        }

        console.log("Entered password:", password);
        console.log("Stored hashed password:", admin.password);

        const isMatch = await bcrypt.compare(password, admin.password);

        console.log("Password match result:", isMatch);

        if (!isMatch) {
            return res.render('admin/login', { message: 'Invalid credentials' });
        }

        req.session.admin = true;

        res.redirect('/admin/dashboard');

    } catch (error) {
        console.error("Admin error:", error);
        res.render('admin/login', { message: 'Something went wrong' });
    }
};

const loadDashboard = async (req,res)=>{
    try {
        
        const admin = req.session.admin
        if(!admin) return res.redirect('/admin/login')

        const users = await userModel.find({})

        res.render('admin/dashboard',{users})
    } catch (error) {
        console.error("Dashboard load error:", error);
    res.render('admin/dashboard', { users: [], error: 'Failed to load users' });
    }
}

const loadAddUserPage = (req, res) => {
    res.render('admin/addUser'); // Make sure this view exists
  };
  
  const addUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.redirect('/admin/dashboard?error=User already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new userModel({
        email,
        password: hashedPassword,
        isBlocked: false
      });
  
      await newUser.save();
      res.redirect('/admin/dashboard?success=User added successfully');
    } catch (err) {
      console.error("Add user error:", err);
      res.redirect('/admin/dashboard?error=Failed to add user');
    }
  };

  const editUser = async (req, res) => {
    try {
      const { id, name, email } = req.body;
      await userModel.findByIdAndUpdate(id, { name, email });
      res.redirect('/admin/dashboard?success=User updated');
    } catch (error) {
      console.error('Edit error:', error);
      res.redirect('/admin/dashboard?error=Update failed');
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      await userModel.findByIdAndDelete(userId);
      res.redirect('/admin/dashboard?success=User deleted');
    } catch (error) {
      console.error("Delete user error:", error);
      res.redirect('/admin/dashboard?error=Failed to delete user');
    }
  };
  
  


module.exports = {
    loadLogin,
    login,
    loadDashboard,
    addUser,
    loadAddUserPage,
    addUser,
    editUser,
    deleteUser
}