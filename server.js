const app = require('./index');
const db = require('./models');

const PORT = 3000;

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
