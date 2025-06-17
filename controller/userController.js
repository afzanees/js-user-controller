const userScheme = require('../model/userModel')
const bcrypt = require('bcrypt');
const saltround = 10;

const registerUser = async (req,res) => {

    try {
        
        const {email,password} = req.body

        const user = await userScheme.findOne({email})

        

        if (user) {
            console.log('User exists, rendering register page with message');
            return res.render('user/register', { message: 'User already Exists' });
        }

        const hashedPassword = await bcrypt.hash(password,saltround);

        const newUser = new userScheme({
            email,
            password: hashedPassword
        })

        await newUser.save()

        res.render('user/login',{message:'User created Successfully'})

    } catch (error) {
        res.render('user/register', {message: 'Something went wrong'})
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.redirect('/user/login');
        }

        res.clearCookie('connect.sid'); // Important: clear session cookie
        res.redirect('/user/login');
    });
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userScheme.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.render('user/login', { message: 'User does not exist' });
        }

        console.log("Entered password:", password);
        console.log("Stored hashed password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password match result:", isMatch);

        if (!isMatch) {
            return res.render('user/login', { message: 'Incorrect Password' });
        }

        req.session.user = user;

        res.render('user/userHome', { message: 'Login successful' ,email: user.email});

    } catch (error) {
        console.error("Login error:", error);
        res.render('user/login', { message: 'Something went wrong' });
    }
};



const loadLogin = (req, res) => {
    if (req.session.user) {
        return res.redirect('/user/userHome'); // Redirect to home if already logged in
    }
    res.render('user/login');
}

const loadRegister = (req, res) => {
    if (req.session.user) {
        return res.redirect('/user/userHome'); // Prevent showing register form to logged-in users
    }
    res.render('user/register');
}


const loadHome = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.render('user/userHome', { user: req.session.user });
};

module.exports = {
    
    registerUser,

    loadRegister,

    loadLogin,
    
    login,

    loadHome,
    
    logout
}