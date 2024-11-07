import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db';
import userRoutes from './routes/users';

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
