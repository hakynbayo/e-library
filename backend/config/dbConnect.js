const mongoose = require('mongoose');

const dbConnect = async () => {
    // connect DB
mongoose.connect(process.env.MONGODB_URL ,{ useUnifiedTopology: true,
useNewUrlParser: true}).then(()=>{
    console.log('connected to DB')
}).catch(err=>{
    console.log(err)
})
}

module.exports = dbConnect;