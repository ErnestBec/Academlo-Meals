const { initModels } = require("./Models/initModels");
//Utils
const { db } = require("./utils/database.utils");
const { app } = require("./app");

//authenticate database
db.authenticate()
  .then(() => {
    console.log("Database authenticate Successfull!!");
  })
  .catch((err) => {
    console.log(err);
  });

//Init Relations
initModels();

//Sync database
db.sync({ force: false })
  .then(() => console.log("Sync database Success!!"))
  .catch((err) => console.log(err));

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`App runing in ${PORT}`);
});
