const { CustomerRepo } = require('./customer.table');
const { PrayerRepo } = require('./prayer.table');
const { TestimonyRepo } = require('./testimony.table');

const userRepo = new CustomerRepo();
const testimonyRepo = new TestimonyRepo();
const prayerRepo = new PrayerRepo();

module.exports = {
  userRepo,
  testimonyRepo,
  prayerRepo,
};
