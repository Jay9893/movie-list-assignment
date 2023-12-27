import mongoose from 'mongoose';

if (mongoose.models.User) {
  // Model already exists, no need to redefine
  module.exports = mongoose.models.User;
} else {
  const userSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String }
  },{
    timestamps:true
  });
  
  
  // Hash the password before saving to the database
  
  userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  module.exports= mongoose.model("User", userSchema);
}
