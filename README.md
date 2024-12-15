# Donate App

A full-stack web application for managing donations of items. Users can donate items, track transactions, and manage their donation status.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Database Setup and Migrations](#database-setup-and-migrations)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project consists of two parts:

1. **Frontend (Client)**: A React-based frontend application for users to interact with.
2. **Backend (Server)**: An Express-based backend API that handles data and interactions with the database.

The project allows users to donate items, track transactions, and manage their donation status. It is built using PostgreSQL as the database.

## Technologies

### Frontend (Client)

- **React**: A JavaScript library for building user interfaces.
- **Material UI**: A popular React UI framework.
- **Formik**: For handling forms and validations.
- **Yup**: For schema validation.
- **React Router**: For routing and navigation in the app.
- **Axios**: For making HTTP requests to the backend API.

### Backend (Server)

- **Node.js**: A JavaScript runtime for the backend.
- **Express**: A web framework for building RESTful APIs.
- **Knex.js**: SQL query builder for interacting with the PostgreSQL database.
- **PostgreSQL**: Relational database used for storing data.
- **JWT (JSON Web Tokens)**: For user authentication.
- **Bcrypt**: For hashing passwords.
- **Nodemailer**: For sending email notifications.
- **Typescript**: For type safety and improved development experience.

### Database

- **PostgreSQL**: Used for storing data about users, items, transactions, etc.

## Setup Instructions

Follow these steps to set up the project locally.

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/razachikyan/donate-app.git
