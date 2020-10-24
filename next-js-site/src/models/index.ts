import { Model, Sequelize } from 'sequelize';
import { config } from '../utils/config';

export const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true
    }
  },
  database: config.get('db.database'),
  host: config.get('db.host'),
  username: config.get('db.username'),
  password: config.get('db.password')
});

export class Produto extends Model {
  public idProduto!: number;
  public produto: string;
}

Produto.init(
  { idProduto: { type: 'int', primaryKey: true }, produto: 'varchar' },
  { timestamps: false, sequelize, tableName: 'produtos' }
);
