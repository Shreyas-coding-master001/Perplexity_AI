import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      default: "https://ik.imagekit.io/fczc2w1de/default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        // next();
    }catch(err){
        throw new Error(err);
    }  
})

userSchema.methods.comparePassword = async function(password){
    try{
      console.log(this.password);
      console.log(password);
      return await bcrypt.compare(password, this.password);
    }catch(error){
        throw new Error(error);
    }
}

export default mongoose.model("User", userSchema);