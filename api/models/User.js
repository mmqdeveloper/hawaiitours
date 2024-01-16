import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactInfo: {
      website:{
        type: String,
      },
      facebookProfileURL: {
        type: String,
      },
      instagramProfileURL: {
        type: String,
      },
      linkedInProfileURL: {
        type: String,
      },
      mySpaceProfileURL: {
        type: String,
      },
      pinterestProfileURL:{
        type: String,
      },
      soundCloundProfileURL:{
        type: String,
      },
      tumblrProfileURL:{
        type: String,
      },
      twitterUsername:{
        type: String,
      },
      youtubeProfileURL:{
        type: String,
      },
      wikipedia:{
        type: String,
      },
      mastodonProfileURL:{
        type: String,
      },
    },
    aboutYourself: {
      biographicalInfo: {
        type: String,
      },
    },
    basicInformation: {
      honorificPrefix: {
        type: String,
      },
      honorificSuffix: {
        type: String,
      },
      birthDate: {
        type: Date,
      },
      gender: {
        type: String,
      },
    },
    customerBillingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      company: {
        type: String,
      },
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
      },
      postcode: {
        type: String,
      },
      country: {
        type: String,
      },
      stateCounty: {
        type: String,
      },
      phone: {
        type: String,
      },
      emailAddress: {
        type: String,
      },
    },
    customerShippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      company: {
        type: String,
      },
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
      },
      postcode: {
        type: String,
      },
      country: {
        type: String,
      },
      stateCounty: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
    roles: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
