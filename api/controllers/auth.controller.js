import Employee from "../models/employee.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { employeeName, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newEmp = new Employee({
    employeeName,
    email,
    password: hashedPassword,
  });

  try {
    await newEmp.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    res.status(500).json(error.message)
  }
};
