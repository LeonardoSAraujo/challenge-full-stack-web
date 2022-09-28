function authenticated(token){
    if(token === process.env.TOKEN){
      return true
    }else{
      return false
    }
  }

module.exports = {authenticated}