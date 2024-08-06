import { Users, validateBlog } from "../modules/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UsersController {
  async get(req, res) {
    try {
      const users = await Users.find();
      if (!users.length) {
        return res.status(400).json({
          msg: "User is not defined",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "All Users",
        variant: "success",
        payload: users,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }

  async post(req, res) {
    try {
      let { error } = validateBlog(req.body);
      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "error",
          payload: null,
        });
      }

      const exist = await Users.exists({ username: req.body.username });
      if (exist) {
        return res.status(400).json({
          msg: "username mavjud",
          variant: "error",
          payload: null,
        });
      }
      const user = await Users.create(req.body);
      res.status(201).json({
        msg: "users is created",
        variant: "success",
        payload: user,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }

  // async post(req, res) {
  //   try {
  //     const { username, password } = req.body;
  //     const user = await Users.findOne({ username });

  //     if (!user) {
  //       return res.status(400).json({
  //         msg: "username xato",
  //         variant: "succes",
  //         payload: user,
  //       });
  //     }

  //     bcrypt.compare(password, user.password, function (err, response) {
  //       const token = jwt.sign(
  //         { _id: user._id, role: "admin" },
  //         process.env.SECRET_KEY
  //       );
  //       if (response) {
  //         return res.status(200).json({
  //           msg: "Log in",
  //           variant: "succes",
  //           payload: { user, token },
  //         });
  //       } else {
  //         return res.status(400).json({
  //           msg: "password xato",
  //           variant: "error",
  //           payload: null,
  //         });
  //       }
  //     });
  //   } catch {
  //     res.status(500).json({
  //       msg: "Server error",
  //       variant: "error",
  //       payload: null,
  //     });
  //   }
  // }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Users.findByIdAndDelete(id);
      res.status(201).json({
        msg: "user is deleted",
        variant: "succes",
        payload: null,
      });
    } catch {
      res.status(500).json({
        msg: "server error",
        variant: "error",
        payload: null,
      });
    }
  }

  async put(req, res) {
    try {
      const { id } = req.params;
      await Users.findByIdAndUpdate(id, req.body);
      res.status(201).json({
        msg: "user is updete",
        variant: "succes",
        payload: null,
      });
    } catch {
      res.status(500).json({
        msg: "server error",
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new UsersController();
