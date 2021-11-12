const mongoose = require('mongoose')
const NoteSchema = new mongoose.Schema({
    userId:{
        type:'string'
    },
    Label: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label'
    },
    email:{
      type:'string',
    },
    title:{
        type: 'string',
        required: true,
    },
    description:{
        type: 'string',
    }
})
const Post = mongoose.model('Notes',NoteSchema)
module.exports = Post;