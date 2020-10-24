import { sequelize } from '../../models';

export default async (req, res) => {
  const value = await sequelize.query('SELECT * FROM "cadastros"');
  res.status(200).json(value);
};
