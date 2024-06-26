import bcrypt from "bcryptjs";
import { IUser, User } from "../models/user";
import ErrorHandler from "../utils/error-utility-class";

class AuthService {
  async loginAuthService(email: string, password: string): Promise<IUser> {
    try {
      const user = await User.findOne({ email }).select("password");
      if (!user) throw new ErrorHandler("no user found ", 404);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new ErrorHandler("password not matched", 400);
      return user;
    } catch (err) {
      throw new ErrorHandler(`err:${err}`, 500);
    }
  }
  async registerAuthService(
    name: string,
    email: string,
    password: string
  ): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return user;
    } catch (err) {
      throw new ErrorHandler("Internal Server Error", 500);
    }
  }

  async getAuthenticatedUsers(): Promise<IUser[]> {
    try {
      const user = await User.find({});
      if (user.length == 0) {
        throw new ErrorHandler("No user found", 404);
      }
      return user;
    } catch (err) {
      throw new ErrorHandler(`err:${err}`, 500);
    }
  }

  async getSingleUser(id: string): Promise<IUser> {
    try {
      const user = await User.findById(id);
      if (!user)
        throw new ErrorHandler(`user with the id:${id} not found`, 404);
      return user;
    } catch (err) {
      throw new ErrorHandler(`err:${err}`, 500);
    }
  }

  async updateSingleUser(id: string, role: string): Promise<IUser> {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          role,
        },
        { new: true }
      );
      if (!user) throw new ErrorHandler(`user with the ${id} not found`, 404);
      return user;
    } catch (err) {
      throw new ErrorHandler(`err: ${err}`, 500);
    }
  }
  async deleteSingleUser(id: string): Promise<IUser> {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) throw new ErrorHandler(`user with the ${id} not found`, 404);
      return user;
    } catch (err) {
      throw new ErrorHandler(`err: ${err}`, 500);
    }
  }
}
export default new AuthService();
