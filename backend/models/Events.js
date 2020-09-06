const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "Please add a category"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  no_of_participant:{
    type: String,
    required: [true, "Please add participant number"],
  },
  deadline_for_reg:{
    type: Date,
    default: Date.now,
    // required: [true, "Please add deadline date for register"],
  },
  college: {
    type: mongoose.Schema.ObjectId,
    ref: "College",
    required: true,
  },
  event_date:{
    type:Date,
    default: Date.now,
    // required: [true, "Please add event date"],
  },
  fees: {
    type: String,
    required: [true, "Please add rate"],
  },
//   stock: {
//     type: Number,
//     required: [true, "Please add in stock"],
//   },
  file: 
    {
      type: String,
      default: "/uploads/no-photo.jpg",
    },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Static method to get avg of course tuitions
// EventSchema.statics.getAverageCost = async function (collegeId) {
//   const obj = await this.aggregate([
//     {
//       $match: { college: collegeId },
//     },
//     {
//       $group: {
//         _id: "$college",
//         averageCost: { $avg: "$tuition" },
//       },
//     },
//   ]);

//   try {
//     await this.model("College").findByIdAndUpdate(collegeId, {
//       averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Call getAverageCost after save
// EventSchema.post("save", function () {
//   this.constructor.getAverageCost(this.college);
// });

// // Call getAverageCost before remove
// EventSchema.pre("remove", function () {
//   this.constructor.getAverageCost(this.college);
// });

module.exports = mongoose.model("Event", EventSchema);
