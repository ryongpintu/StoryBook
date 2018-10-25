const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  status: {
    type: String,
    default:'public'
  },
  allowComments: {
    type: Boolean,
    default:true
  },
  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentDate:{
      type: Date,
      default: Date.now
    },
    commentUser:{
      type: mongoose.Types.ObjectId,
      ref:'user'
    }
  }],
  user:{
    type: mongoose.Types.ObjectId,
    ref:'user'
  },
  date:{
    type: Date,
    default: Date.now
  }
});
 


const Story = mongoose.model('story',storySchema);

module.exports.Story=Story;