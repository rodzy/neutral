const reactRouter = require('./react-router-dom');
const wouter=require('./wouter')

module.exports = {
    name: 'routers',
    type: 'list',
    question: "Would you like any routing in your app?",
    choices:["No", reactRouter.name, wouter.name]
}