require("colors");
const inquirer = require("inquirer");

const principalQuestions = () => {
  const message =
    "\nWelcome to Neutral ✨\nThe interactive command line interface to overbuild your React applications\n";
  console.log(message);
  const questions = [
    {
      type: "input",
      name: "appName",
      message: "Give a name to your aplication?",
    },
    {
      type: "list",
      name: "appType",
      message: "Select your type of React app",
      choices: [
        "create-react-app (Default)",
        "create-react-app (Using webpack⚡)",
      ],
    },
    {
      type: "list",
      name: "appLanguage",
      message: "Select the language of preference",
      choices: ["JavaScript", "TypeScript"],
    },
    {
      type: "list",
      name: "appManager",
      message: "Which package manager do you want to use",
      choices: ["npm", "yarn"],
    },
  ];
  return inquirer.prompt(questions);
};

const convertAppName = (appName) => {
  const dirName = appName
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");
  return dirName;
};

principalQuestions();
