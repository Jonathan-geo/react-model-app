import { Produto } from '../../models';

export default async (req, res) => {
  const value: Produto[] = await Produto.findAll();
  res.status(200).json(value);
};
