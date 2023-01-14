// import { Op } from 'sequelize';
const { admin, customer, Provider } = require('../models');

const { admins } = require('./admin.seed');
const { customers } = require('./customers.seed');
const { providers } = require('./provider.seed');

const seed = async () => {
  await admin.bulkCreate(admins);
  await customer.bulkCreate(customers);
  await Provider.bulkCreate(providers);
};

seed();
