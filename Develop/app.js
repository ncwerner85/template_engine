const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Output
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeTeam = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeeQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the manager's ID?"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "managerNumber",
        message: "What is the manager's office number?"
    }
];

function manager() {
    console.log("Lets start building your team!");
    inquirer.prompt(employeeQuestions).then(function(data){
        const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerNumber);
        employeeTeam.push(manager)
        addMember()
    })
};

function addMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "chooseMember",
            message: "Please choose the type of team member you would like to add.",
            choices: [
                "An Engineer",
                "An Intern",
                "I am done adding members. Show me my team!"
            ]
        }
    ]).then(function(data){
        if (data.chooseMember === "An Engineer"){
            engineer();
        } else if (data.chooseMember === "An Intern"){
            intern();
        } else (finishTeam());
    });
};

function engineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's Github username?"
        }
    ]).then(function(data){
        const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
        employeeTeam.push(engineer)
        addMember()
    });
};

function intern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "internId",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school?"
        }
    ]).then(function(data){
        const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
        employeeTeam.push(intern)
        addMember()
    });
};

function finishTeam() {
    fs.writeFileSync(outputPath, render(employeeTeam), "utf-8")
    console.log(employeeTeam)
}

manager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
