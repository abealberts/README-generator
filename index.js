const inquirer = require('inquirer');
const fs = require('fs');

//List of possible licenses to be used by inquirer prompt
const licenses = [
    'No License',
    'GNU AGPLv3',
    'GNU GPLv3',
    'GNU LGPLv3',
    'Mozilla Public License 2.0',
    'Apache License 2.0',
    'MIT License',
    'Boost Software License 1.0',
    'The Unlicense',
];

//Array of markup badges that correspond to the selected license
const licenseBadges = [
    //no license
    '',
    //gnuagpl
    '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)',
    //gnugpl
    '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
    //gnulgpl
    '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)',
    //mozilla
    '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',
    //apache
    '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    //mit
    '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    //boost
    '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)',
    //unlicense
    '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)',
];

//The selected license / license badge (populated when badgeSelect() is called).
selectedBadge = '';
selectedLicense = '';

//Question prompts used by inquirer
const prompts = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'PROJECT TITLE:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'PROJECT DESCRIPTION:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'INSTALLATION INSTRUCTIONS:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'USAGE INFORMATION:',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'CONTRIBUTION GUIDELINES:',
    },
    {
        type: 'input',
        name: 'testing',
        message: 'TEST INSTRUCTIONS:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'CHOOSE A LICENSE:',
        choices: licenses,
    },
    {
        type: 'input',
        name: 'username',
        message: 'GITHUB USERNAME:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'PREFERRED CONTACT EMAIL:',
    },
];

// Creates the README file w/ user responses.
function writeToFile(fileName, data) {
    fs.writeFile(`./results/${fileName}`, data, (err) =>
        err ? console.log(err) : console.log(`Successfully created ${fileName}! Your README is located in the 'results' folder within this directory.`)
    );
};

//selects the badge for the user-selected license.
function badgeSelect( { license } ) {
    if (license == licenses[0]) {
        selectedBadge = '';
        selectedLicense = '';
    } else {
        for (let i = 0; i< licenses.length; i++) {
            if (licenses[i] == license) {
                selectedBadge = licenseBadges[i];
            };
        };
        selectedLicense =
`## License
        
This project is covered under: **${license}**`;
    };
};

const generate = ({ projectTitle, description, installation, usage, contribution, testing, license, username, email }) => {
    return md =  
`# ${projectTitle}

${selectedBadge}

## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)


## Installation

${installation}

## Usage

${usage}

## Contributing

${contribution}

## Tests

${testing}

${selectedLicense}

## Questions

**[Find me on GitHub here](https://www.github.com/${username})**, or contact me with any question you may have via email: **${email}**`;
};

const init = () => {

    inquirer
        .prompt(prompts)
        .then((answers) => {
            badgeSelect(answers),
            writeToFile(`README-${answers.projectTitle}.md`, generate(answers))})
        .catch((err) => console.error(err));
};

//Initialize app
init();