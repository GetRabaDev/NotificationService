const User = require('../models/User');

class CustomerRepo {
  customerCreate = async (data) => {
    const customer = await new User(data).save();
    return customer;
  };

  findCustomer = async (condition) => {
    const property = await User.findOne(condition);
    return property;
  };

  searchCustomerByEmail = async (email) => {
    const users = await User.find({ email: { $regex: '.*' + email + '.*' } });
    return users;
  };
}

module.exports = {
  CustomerRepo,
};
