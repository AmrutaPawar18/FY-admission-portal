const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Users',
        unique: true
    },
    what:{
      type:String,
      defaultValue:'ssc_cert',
      enum:['ssc_cert', 'hsc_cert']
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
