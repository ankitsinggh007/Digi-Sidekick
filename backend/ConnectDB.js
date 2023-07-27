import mongoose from 'mongoose';

const connectToDB=async(url)=>{
 try {
        await mongoose.connect(url);
    
 } catch (error) {
    throw error;
 }
}

export default connectToDB;
