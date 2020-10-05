const formik = require("./formik");
const reactHookForm = require("./react-hook-form");
const ultimateForm = require("./ultimate-form");

module.exports = {
    name: "routers",
    type: "list",
    question: "Would you like to add any form library to your app?",
    choices: [
        "❌ No, thank you",
        formik.name,
        reactHookForm.name,
        ultimateForm.name,
    ],
};
