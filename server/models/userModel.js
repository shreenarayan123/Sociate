import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
   profilePicture: String,
    coverPicture: String,
    about: {
      type:String,
      default:"Write about youself"
    },
    livesIn: {
      type:String,
      default:"Earth"
    },
    worksAt: {
      type:String,
      default:"Home"
    }
    ,
    country: String,

    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
