import mongoose from "mongoose";

type connection = {
  isConnected?: boolean;
};

const connObject: connection = {};
const DbConnect = async () => {
  if (connObject.isConnected) {
    console.log("database already connected!!!");
    return;
  }

  try {
    const dbConnectionResponse = await mongoose.connect(
      `${process.env.DB_CONNECT_URL}/${process.env.DATABASE_NAME}`
    );

    // console.log(dbConnectionResponse);
    if (dbConnectionResponse.connection.readyState === 1) {
      connObject.isConnected = true;
    }

    console.log("DB Connected Successfully");
    return;
  } catch (error) {
    console.error(`failed to connect db ${error}`);
    process.exit(1);
  }
};

export default DbConnect;
