## Doge Care Backend

### Requirements

- node 14.x +
- npm 6.x +
- docker 20.x +

### Setup

- To setup the project ensure that the requirements are fulfilled and run `bash setup.sh`

### Folder structure 

```
├── README.md
├── app
│   ├── database
│   │   └── connection.js
│   ├── index.js
│   ├── job
│   │   ├── controller.js
│   │   ├── model.js
│   │   └── service.js
│   ├── lib
│   │   ├── apiout.js
│   │   ├── statusCodes.js
│   │   ├── utils.js
│   │   └── validation.js
│   ├── routes
│   │   ├── common
│   │   │   └── middlewares.js
│   │   ├── index.js
│   │   └── v1
│   │       ├── index.js
│   │       ├── job.js
│   │       └── user.js
│   └── user
│       ├── controller.js
│       ├── model.js
│       └── service.js
├── bin
│   └── www
├── config
│   ├── defaults.js
│   └── index.js
├── docker-compose.yml
├── index.js
├── package-lock.json
├── package.json
└── setup.sh
```