const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/hustcare', {
          useUnifiedTopology: true,
        });
        console.log('Kết nối MongoDB thành công.');
    } catch (error) {
        console.error('Không thể kết nối tới cơ sở dữ liệu MongoDB:', error);
    }
};

export default connectDB;
