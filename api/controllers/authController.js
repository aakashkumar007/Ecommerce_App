import userSchema from "../model/user.model.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone,answer, address } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userSchema.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userSchema({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();

    console.log("User registered successfully");

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error,"This is error in registration");
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userSchema.findOne({ email });
    if (!user) {
      console.log(req.body);
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
       
      });
      
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const forgotPasswordController = async(req,res)=>{
  try {
    const {email,password,answer} =req.body;
    console.log(email, password, answer);
    if (!email) {
      return res.status(400).send({ message: 'Please provide an email' });
    }
    
    if (!password) {
      return res.status(400).send({ message: 'Please provide a new password' });
    }
    
    if (!answer) {
      return res.status(400).send({ message: 'Please provide an answer' });
    }

    //check
    const user = await userSchema.findOne({email,answer})

    //validation
    if (!user) {
      return res.status(404).send({
        success:false,
        message:"Wrong Email Or Answer"
      })
    }
    const hashed =await hashPassword(password)
    await userSchema.findByIdAndUpdate(user._id ,{password :hashed});
    
    res.status(201).json({
      success: true,
      data:{
        _id:user._id,
        email:user.email,
        message:'Password has been changed successfully',
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Server Error",
      error
    })
  }

}

export const updateController = async (req, res) => {
  try {
    console.log(req);
    const { name, password, address, phone } = req.body;
    
    
    const user = await userSchema.findById(req.body._id);
    
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    
    
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.body._id,
      {
        
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};


//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};