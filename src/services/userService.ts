import User, { IUser } from '../models/userModel';

export default {
  async getUsers(): Promise<IUser[]> {
    return await User.find();
  },

  async createUser(data: Partial<IUser>): Promise<IUser | null> {
    const existingUser = await User.findOne({
      $or: [
        { email: data.email },
        { cpf: data.cpf },
        { telefone: data.telefone }
      ]
    });

    if (existingUser) {
      throw new Error('Usuário com este email, CPF ou telefone já existe.');
    }

    const newUser = new User(data);
    return await newUser.save();
  },

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
};
