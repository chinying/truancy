var mongoose = require("mongoose");

var lessonSchema = mongoose.Schema({
  subject: String,
  subjectCode: String,
  lessonType: String,
  date: String,
  startTime: String,
  endTime: String,
  duration: Number,
  lessonId: Number,
  location: String,
  attended: Boolean
});

var Lessons = mongoose.model("Lessons", lessonSchema);

module.exports = Lessons;
