class AppError extends Error {
constructor(message,status){
    super()/* this is used so that we can access parent class methods and call overridenn methods of the parent class */
this.message=message
this.status=status
}


}


module.exports= AppError