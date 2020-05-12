# Ice Dealer

This application was created to learn Apollo GraphQL with NodeJS and by the way is currently used by my friend in production environment. Its main purpose was to enable registration, placing orders, communication with client and responsiveness.

Codebase uses [Lerna](https://lerna.js.org/) monorepo with [NodeJS](https://nodejs.org/en/), [Apollo GraphQL](https://www.apollographql.com/), [ReactJS](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/).

In production environment i use [Heroku](http://heroku.com) for backend and [Firebase](https://firebase.google.com/) for frontend hosting.

## List of features

- Authentication / Authorization
- GraphQL
- Lerna monorepo
- Typescript
- NoSQL Injection, XSS, CSRF protection
- Internationalization (shared between backend and frontend)
- Yup validation (shared between backend and frontend)
- Themes
- ESLint
- Prettier
- Husky
- Editing, searching, sorting and filtering data
- Formik forms
- CSV Export
- Placing orders
- List of users
- List of pickup locations
- List of orders
- Reset password token
- Automated deployment scripts
- CI/CD for Gitlab
- Integration with Heroku and Firebase
- React Material

## Getting started

_SSL certificate in backend directory is used only for development purposes_

### Database

The easiest way to handle database is to create MongoDB Atlas cluster. For more information visit [Get started with Atlas](https://docs.atlas.mongodb.com/getting-started/)

### Installation

Clone the repository

```
git clone https://github.com/kdubiel/ice-dealer.git
```

Switch to the repo folder

```
cd ice-dealer
```

Install dependencies

```
yarn install
```

Create `.env` files inside `backend` and `frontend` repositories and fill them with correct data

**Backend**

```
# Environment settings
NODE_ENV = "development"
PORT = 4000

# MongoDB Atlas credentials
MONGO_USER = "exampleUser"
MONGO_PASSWORD ="password"
MONGO_URL = "example-12345.mongodb.net"
MONGO_DB_NAME = "test"

# JSON Web Token key
JWT_KEY = "512bit_jwt_key"

# Apollo Engine credentials (not required)
APOLLO_KEY = ""
APOLLO_GRAPH_VARIANT = ""

# Gmail credentials for nodemailer
MAILER_USER = "icedealer@gmail.com"
MAILER_PASSWORD = "password"

# Frontend url (leave untouched for development)
FRONTEND_URL = "http://localhost:3000"
```

**Frontend**

```
REACT_APP_GQL_URI = "https://localhost:4000/graphql"
```

### Administrator account

_This step is required because every user needs to be accepted by administrator in order to sign in._

Run application

```
yarn watch
```

Visit graphql url and accept security issues

```
https://localhost:4000/graphql
```

Open app in browser

```
localhost:3000
```

Register account and manually set the fields below in MongoDB cluster

```
role: "ADMIN"
status: "CONFIRMED"
```

## TODO

- Unit, integration tests
- Backend to frontend error messages
- GraphQL type resolvers
- Use Webpack in backend
- DataLoaders
- Frontend ErrorBoundary

## Screenshots

### Login / Registration

![Sign in](https://i.imgur.com/ZcPOUKX.jpg)

![Sign up](https://i.imgur.com/7d6Soju.jpg)

### Forgot password

![Forgot password](https://i.imgur.com/ndsOwiR.jpg)

### Responsiveness

![Responsiveness](https://i.imgur.com/AqrruPe.jpg)

### Users

![List](https://i.imgur.com/RYtkBl7.jpg)

![Edition](https://i.imgur.com/IvLqFqa.jpg)

### Pickup locations

![Pickup locations](https://i.imgur.com/piRmL2c.jpg)

### User orders

![Orders list](https://i.imgur.com/7nmRdVT.jpg)

![Make order](https://i.imgur.com/zKOixG3.jpg)

### Admin orders

![Orders list](https://i.imgur.com/vzlW0b9.jpg)