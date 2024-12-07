const mongoose= require('mongoose')
const {Schema}= mongoose
mongoose
    .connect("mongodb://127.0.0.1:27017/mongo_relationship")
    .then(() => {
        console.log("connection open");
    })
    .catch((err) => {
        console.log("Connection error", err);
    });
        const userSchema=new Schema({
            username:String,
            age:Number,
        })
        const tweetSchema=new Schema({
            text:String,
            likes:Number,
            user:{type:Schema.Types.ObjectId,ref:'User'}
        })
        const User=mongoose.model('User',userSchema)
        const Tweet=mongoose.model('Tweet',tweetSchema)
        
//         const makeTweets=async()=>{
// const user= new User({username:'chickenfan99',age:61})
// const tweet2= new Tweet({text:'Bock bock my chickens make noise', likes:61})/* this is the second tweet for the same user */
// tweet2.user=user
// user.save()
// tweet2.save()
//         }
//         makeTweets();

const findTweet= async()=>{
    /* SAARE TWEETS KO DHOONDHKE POPULATE KARNA WITH USER KI INFO UNKI ID KI JAGAH */
    const t= await Tweet.find({}).populate('user')/* THIS IS USED TO REPLACE THE USER FIELD IN EACH TWEET WITH THE FULL USER OBJECT REFERENCES 
    WITHOUT POPULATE YOU WOULD ONLY SEE THE UUSER'S ID WITH .POPULATE() YOU GET THE DETAILS LIKE USERNAME AND AGE OF THE USER LINKED TO THE TWEET*/
    console.log(t)
}
findTweet();