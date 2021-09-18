 require('../Schema/userSchema')
exports.signup = async (req,res) => {
   
   const userExists = await User.findOne({email:req.body.email})
      
   if(userExists) {
     return  res.json({errror:'user already exists'})
   }
   const user = await new User(req.body).then(
      res.json(user)
   ).catch(
      console.log('cant create user')
   )
}