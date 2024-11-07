import { Request, Response } from 'express';
import UserService from '../services/userService';

export default {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      return res.status(200).json({ status: 200, data: users });
    } catch (error) {
      return res.status(400).json({ status: 400, error: 'Erro ao listar usuários' });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const newUser = await UserService.createUser(req.body);
      return res.status(201).json({ status: 201, data: newUser });
    } catch (error) {
          return res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedUser = await UserService.updateUser(id, req.body);
      if (updatedUser) {
        return res.status(200).json({ status: 200, data: updatedUser });
      } else {
        return res.status(404).json({ status: 404, error: 'Usuário não encontrado' });
      }
    } catch (error) {
      return res.status(400).json({ status: 400, error: 'Erro ao atualizar usuário' });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await UserService.deleteUser(id);
      return res.status(204).json({ status: 204, message: 'Usuário excluído com sucesso' });
    } catch (error) {
      return res.status(400).json({ status: 400, error: 'Erro ao excluir usuário' });
    }
  }
};
