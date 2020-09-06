const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    
    usn: {
      type: String,
      required: [true, "Please add a uid"],
      maxlength: [50, "uid can not be more than 50 characters"],
    },
    year: {
      type: String,
      required: [true, "Please add a year"],
    },
    contact: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    dob: {
      type: String,
      required: [true, "Please add Date of Birth"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Transender"],
    },
    
      college: {
        type: String,
        required: [true, "Please add a college name"],
        maxlength: [50, "Name can not be more than 50 characters"],
      },
      department: {
        type: String,
        required: [true, "Please add a Departmet"],
        maxlength: [50, "Name can not be more than 50 characters"],
      },
      file: 
      {
        type: String,
        default: "/uploads/no-photo.jpg",
      },
    
    // address: {
    //   type: String,
    //   required: [true, "Please add an address"],
    // },
    // location: {
    //   // GeoJSON Point
    //   type: {
    //     type: String,
    //     enum: ["Point"],
    //   },
    //   coordinates: {
    //     type: [Number],
    //     index: "2dsphere",
    //   },
    //   formattedAddress: String,
    //   street: String,
    //   city: String,
    //   state: String,
    //   zipcode: String,
    //   country: String,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create  slug from the name
StudentSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode & create location field
// StudentSchema.pre("save", async function (next) {
//   const loc = await geocoder.geocode(this.address);
//   this.location = {
//     type: "Point",
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress,
//     street: loc[0].streetName,
//     city: loc[0].city,
//     state: loc[0].stateCode,
//     zipcode: loc[0].zipcode,
//     country: loc[0].countryCode,
//   };

//   // Do not\  save address in DB
//   this.address = undefined;
//   next();
// });

// Cascade delete order when a public is deleted
StudentSchema.pre("remove", async function (next) {
  console.log(`Students being removed from list ${this._id}`);
  await this.model("Student").deleteMany({ student: this._id });
  next();
});

// Reverse populate with virtuals
StudentSchema.virtual("student", {
  ref: "Student",
  localField: "_id",
  foreignField: "student",
  justOne: false,
});

module.exports = mongoose.model("Student", StudentSchema);
