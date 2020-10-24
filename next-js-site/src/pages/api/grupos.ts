import { sequelize } from '../../models';

export default async (req, res) => {
  const [zero] = await sequelize.query('SELECT * FROM "grupos"').catch(err => {
    console.log(err);
  });
  res.status(200).json([...zero]);
};
