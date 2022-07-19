require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3001;

function init() {
    app.listen(PORT, () => {
        console.log(`"Listening on port ${PORT}"`);
    });
}

init();