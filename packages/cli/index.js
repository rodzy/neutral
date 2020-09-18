require("colors");
const inquirer = require("inquirer");
const createReactApp = require("./create-react-app");

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
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.toLowerCase())
        .join("-");
    return dirName;
};

const mainConfig = {
    cra: createReactApp,
    webpack: "webpack --config",
};

const principalRunner = async () => {
    const answers = await principalQuestions();
    const { appName, appType, appLanguage, appManager } = answers;
    if (!appName || appName.length <= 0) {
        console.log(`❌ The name for the app is required.`.red);
        return process.exit(0);
    }
    const folderName = await convertAppName(appName);

    const app =
        appType === "create-react-app (Default)"
            ? mainConfig.cra
            : mainConfig.webpack;

    if (!app) {
        console.log(
            `${appLanguage} is not yet supported by this CLI tool.`.red
        );
        return process.exit(0);
    }

    const appDirectory = `${process.cwd()}/${folderName}`;

    const res = await app.execute(
        folderName,
        appDirectory,
        appType,
        appLanguage,
        appManager
    );

    if (!res) {
        console.log("❌ There was an error generating your app.".red);
        return process.exit(0);
    }

    return process.exit(0);
};

principalRunner();

process.on("SIGINT", function () {
    console.log("\nCancelled the app generation (CTRL+C was pressed)".italic);
    process.exit(1);
});
