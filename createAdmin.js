const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/userModel'); // adjust path if needed

mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ MongoDB connected');
}).catch((err) => {
    console.log('❌ MongoDB connection error:', err);
});

async function createAdmin() {
    const email = 'admin@example.com';
    const password = 'admin123';

    // check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
        console.log('⚠️ Admin already exists');
        process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
        email: email,
        password: hashedPassword,
        role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin created successfully');
    process.exit();
}

createAdmin();
