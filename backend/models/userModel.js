import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
  cartData: Object,
});

const Users = mongoose.model('User', UserSchema);

export default Users;
