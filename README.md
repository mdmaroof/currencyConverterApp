# Currency Conversion Rate App

This project implements an Currency Conversion Rate of USD feature using React Native and zustand project also uses dayJs for date formating.

## Aim

The goal is to create a cross-platform React Native app that displays a list of currency conversion rates from USD to various other currencies.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mdmaroof/currencyConverterApp.git
   cd currencyConverterApp
   ```

2. Install dependencies:

   ```bash
   yarn add
   # or npm install
   ```

3. Run the development server:

   ```bash
   yarn start
   # or npm start
   ```

## Project Structure

- /api: Contain API integration and data fetching logic.
- /components: Reusable UI components.
- /screens: Contains the main screen of the app.
- /helper: Contain basic helper to use around the project
- /state: Configuration of Zustand and AsyncStorage.
- /assets: Contains images and other static assets used in the app.

## Basic Information

- App uses API endpoint [https://www.floatrates.com/daily/usd.json](https://www.floatrates.com/daily/usd.json) to fetch data.

## Features

- Displays conversion rates for USD to other currencies.
- Data fetched regularly from Floatrates API
- Persistent data storage using Zustand and AsyncStorage.
- Currency data auto-refreshes at a regular interval (every 10 seconds).
- Lists countries and currencies with the highest and lowest conversion rates at the top.

## Author

Mohd Maroof
