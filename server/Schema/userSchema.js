const { createHmac } =  require('crypto');
const uuidv4 = require('uuid/v4')
const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({   
   name: {
      type: String,
      required: true,
      trim: true
      
   },
   email: {
      type: String,
      required: true,
      trim: true
      
   },
   hashed_password: {
      type: String,
      required: true
   },
   salt: String,
   created: {
      type: Date,
      default: Date.now
   },
   updated: Date
   
}
)
userSchema.methods = {
   encrptPassword: function(password) {
      try {
         return createHmac('sha1', this.salt)
         .update(password)
         .digest('hex');
   
      }catch (err) {
         return '';
      }
   }
}

userSchema.virtual('password').set((password)=>{
   this._password = password
   this.salt = uuidv4()
   this.hashed_password = this.encrptPassword(password)

}).get(()=>{
   return this._password
})

module.exports = mongoose.model('User',userSchema)