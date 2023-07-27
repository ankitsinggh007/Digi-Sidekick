import { User } from "./User_Modal.js";

export const register = async (req, res) => {
  console.log(req.body);
  try {
    const response = await User.create(req.body);

    return res.status(201).json({
      success: true,
      response,
      message: "user is succesfully registered",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      response: [],
      message: error.message,
      error: error,
    });
  }
};

export const fetchUser=async(req,res)=>{

    try {
        const response = await User.find({});
        const count=await User.countDocuments();
        return res.status(201).json({
          success: true,
          response,
          message: "Fetched all user Successfully",
          error: {},
          count
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          response: [],
          message: error.message,
          error: error,
        });
      }
    

}
