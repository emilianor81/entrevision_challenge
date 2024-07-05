import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import sequelize from './utils/db';
import { leagueRoutes } from './routes/leagueRoutes';

const app = express();

// Configurar CORS
app.use(cors());

// Middleware para analizar JSON
app.use(bodyParser.json()); // Usar body-parser para analizar cuerpos JSON

//app.use(express.json());
app.use('/api', leagueRoutes);

const startServer = async () => {
  try {
    await sequelize.sync(); // Sincroniza los modelos con la base de datos
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

