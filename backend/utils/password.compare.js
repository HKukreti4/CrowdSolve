const bcrypt =require("bcryptjs");

 const checkPass = async (
  inputPass,
  hashPass
 )=> {
  return await bcrypt.compare(inputPass, hashPass);
}

module.exports={checkPass}