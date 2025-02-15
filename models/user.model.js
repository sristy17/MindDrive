import mongoose from 'mongoose';

const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        // Removed required constraint
    },
    gender: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: false,
    },
}, { timestamps: true });

// Pre-save hook to calculate age
userSchema.pre('save', function(next) {
    if (this.dob) {
        this.age = calculateAge(this.dob);
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;