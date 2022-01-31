
# Slots machine (backend)

The backend for an at-home Casino Royale Slots Machine.

## Tech Stack

TypeScript, Node, Express, Express Session, MongoDB, Mongoose, Passport

## Deployment

This project is deployed at <https://casino-royale-slot-machine.herokuapp.com/>

## API Reference

### Login or Signup

```http
  POST /auth/signup-signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `national_id` | `string` | **Required**. form-urlencoded |
| `password` | `string` | **Required**. form-urlencoded |

### Get item

```http
  GET /game/play
```

Requires previous authentication.

## Run Locally

Clone the project

```bash
  git clone https://github.com/cristianblar/casino-royale-slot-machine
```

Go to the project directory

```bash
  cd casino-royale-slot-machine
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`BCRYPT_SALT_ROUNDS`

`MONGO_URI`

`SESSION_SECRET`

`SLOTS_AMOUNT`

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

## Authors

[@cristianblar](https://github.com/cristianblar)

## License

[MIT](https://choosealicense.com/licenses/mit/)
