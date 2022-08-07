const app = require('./app');
const {port} = require('./config/config');
require('./config/database');

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
});