const mongoose = require("mongoose");
mongoose
    .connect("mongodb://127.0.0.1:27017/mongo_relationship")
    .then(() => {
        console.log("connection open");
    })
    .catch((err) => {
        console.log("Connection error", err);
    });

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            /* so basically mongo treats this address as it's own embedded schema and therefore creates another seperate id for it */
            _id:{ id: false},/* this stops the creation of id for address by mongo */
            street: String,
            city: String,
            State: String,
            country: String,
        },
    ],
});
const User = mongoose.model("User", userSchema);

const makeUser = async () => {
    const u = new User({
        first: "Harry",
        last: "Singh",
    });
    u.addresses.push({
        street: "123 Sesame Street",
        city: "New York",
        State: "NY",
        country: "United States of America",
    });
    const res = await u.save();
    console.log(res);
};

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: "99 3rd Street",
        city: "New York",
        State: "NY",
        country: "United States of America",
    });
    const res = await user.save();
    console.log(res);
};

addAddress('674f0006796779c56ce6999c');
makeUser();
