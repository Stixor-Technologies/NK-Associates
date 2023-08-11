# NK Associates

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
    </li>
    <li>
      <a href="#tools-used">Tools Used</a>
    </li>
    <li>
      <a href="#prerequisites">Prerequisites</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#naming-conventions">Naming Conventions</a>
    </li>
    <li>
      <a href="#folder-structure">Folder & File Structure</a>
    </li>
    <li>
      <a href="#git-flow">Git Flow</a>
    </li>
  </ol>
</details>

## Overview

NK Associates & Builders Pvt Ltd, established in 2004, is a prominent real estate development, construction, and investment consultancy firm. They specialize in bulk sourcing and sale of properties within Bahria Town and DHA. Their primary goal is to transform into a Proptech company while leveraging their real estate license. This Repo contains the NK Associates app and website in a single codebase.

## Tools Used

#### Turbo-Repo

Turbo-Repo is a web-based Git repository manager that provides a simple and user-friendly interface for managing Git repositories. It provides features such as Git hosting, code review, issue tracking, dependency management, code generation, automated testing, and deployment capabilities.Furthermore it is the development platform used for this project which simplifies the development process by integrating various tools and workflows.

#### Strapi

Some of the key features of Strapi include:

##### Customizable content types and fields:

Strapi provides a powerful content modeling system that allows us to create custom content types and fields to suit the needs of our application.

##### API-first approach:

Strapi is designed to provide an API-first approach to content management, making integration of our content with other web applications or services easy.

##### User management:

Strapi provides a built-in user management system that enables us to manage user authentication and authorization for our application.

##### Flexible plugins and extensions:

Strapi provides a flexible plugin system that allows us to extend its functionality to meet the needs of your application.

##### Multi-database support:

Strapi supports multiple databases, including MongoDB, Postgres, MySQL, and SQLite.

### Front End

##### NextJS:

NextJS is a React-based web framework that enables server-side rendering, automatic code splitting, and easy client-side routing. It allows for fast and optimized website performance and is particularly well-suited for building large-scale, dynamic web applications.

##### Tailwind CSS:

Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined styles and components. It enables you to quickly and easily create responsive web designs without having to write custom CSS code.

##### Typescript:

Typescript is a superset of JavaScript that adds static type checking and other features to make it easier to write and maintain large-scale JavaScript applications. It provides benefits such as better error handling, code completion, and code refactoring.

## Prerequisites

You will need the following packages to be installed beforehand in order to clone and run the project.

- [Node JS](https://nodejs.org/en) follow the installation guide provided by Nodejs.

  > Note: Required to install Node version in-between ">=14.19.1 <=18.x.x"

  To check whether node and npm is installed, run the following commands:

  ```sh
  npm -v
  ```

  If using nvm, run following commands:

  ```sh
  nvm install 18 # choose node version in-between 14.19.1 and 18.x.x
  nvm use 18
  ```

- Yarn Package Manager

  ```sh
  npm install yarn -g
  ```

  To check whether yarn is installed, run the following commands.

  ```sh
  yarn -v
  ```

## Installation

1. Clone the repo

   ```sh
   git clone https://github.com/Stixor-Technologies/NK-Associates/
   ```

2. Install the project dependencies using Turbo Repo

   ```sh
   yarn install
   ```

3. Start the development server

   ```sh
   yarn dev
   ```

4. Build (Optional)

   ```sh
   yarn build
   ```

## Strapi local setup

1.  Install PostgresSQL

    Follow the guide provided by [PostgresSQL](https://www.postgresql.org/download/), keep all default settings.

    > TroubleShooting on MacOS with M1 chip:

        If you are facing the following error:
        ```The application cannot be opened for an unexpected reason, error=Error Domain=NSOSStatusErrorDomain Code=-10669 "(null)" UserInfo={_LSLine=3863, _LSFunction=_LSOpenStuffCallLocal} (1)```,
        confirm that you have rosetta installed, find more details [here](https://support.apple.com/en-us/HT211861).

2.  Change Database env variable's values

    - Assign variable NEXT_PUBLIC_BACKEND_URL="http://127.0.0.1:1337", in env file at _/apps/nk-associates-frontend_

    - Assign your appropriate db username and db password to env variables, in env file at _/apps/nk-associates-cms_
      ```
      DATABASE_NAME=<your_database_name>
      DATABASE_USERNAME=<your_database_name>
      DATABASE_PASSWORD=<your_database_password>
      ```

<!-- USAGE EXAMPLES -->

## Naming Conventions

#### Folders and files

- For all folders and files, follow lowercase alphabets, and words separated by a hyphen. For example "home-screen", "global-styles".
- Refrain from using "index.ts" for a filename. Filenames should be meaningful.

#### Coding conventions and practices

- Variables, functions and states follow the same naming convention, which is camel-case. For example: `var isAlreadyPresentInDb:boolean = false; var initialValues:boolean = true; `
- Always initialise states with initial values. Be sure to provide "undefined" if the state has to be absolutely undefined initially.
- Boolean states or variables to be started with "is" or "has" prefix. For example `const [isBoolean, setIsBoolean] = useState<boolean>(false)`
- Define types and interfaces inside the utils/types directory. If the type of interface is specific to a certain file, you may keep it inside the specific tsx or ts file.
- Use ES6 syntax for functions, i.e., `const function = () => {}`

## Folder Structure

We're following a folder structure that nicely separates the individual apps. Each app i.e. nk-associates-frontend lives in its own subfolder in the app directory. All apps are run simultaneously using the yarn dev command as listed below.

```
	NK-Associates
├── .eslintrc.json
├── .gitignore
├── .gitattributes
├── .npmrc
├── README.md
├── buildspec.yml
├── package.json
├── yarn.lock
├── turbo.json
└── apps
  └── nk-associates-cms
      ├── package.json
  │   ├── [subfolders and files for the CMS app]
  └── nk-associates-frontend
      ├── package.json
      ├── [subfolders and files for the frontend app]
  └── packages
    └── eslint-config-custom
    └── tsconfig
    └── ui
```

## [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

![Git Flow](<./gitflow%20(1).png>)

We maintain five distinct types of branches in our version control system, each distinguished by its designated color code as can be seen in the above image.

- The main branch serves as the repository of all of the official releases and builds.
- In the event of any errors in the main branch, the resolution process is to create a new 'hot-fix' branch originating from main and subsequently merging the hot-fix changes back into the main branch.
- The develop branch is used for ongoing development and stability.It is the primary workspace for developers. This branch serves as the foundation for merging new features into the codebase
- In the event of any errors in the develop branch, the resolution process is to create a new 'bug-fix' branch originating from develop and subsequently merging the bug-fix changes back into the develop branch.
- Development of any and all new features take place in their own seperate 'feature' branches. Upon completion of the specific feature, the branch is then merged back into the develop branch.

By adhering to this formal branching strategy, we ensure a systematic and organized approach to version control, facilitating collaborative development while effectively managing bug fixes, new features, and stable releases.
