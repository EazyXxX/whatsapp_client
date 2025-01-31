# Whatsapp Web Client

A simple Whatsapp web client made for exchanging text messages via HTTP requests. GreenAPI API is used for sending and receiving messages.

App's demo is hosted on Netlify => https://messengerclient.netlify.app/

## How to use this app?

To start using the Whatsapp Web Client you have to register on https://green-api.com/ and to create your own API instance. Use your idInstace and apiTokenInstance provided by the GreenAPI to login and simply enjoy the app. There are no extra actions to be executed to run the web client.

This client uses HTTP requests to send and receive messages. This is not Websocket - new notification is received every 5 seconds, so, be patient.

## How to run this app?

### Prerequisites

- npm

### Installation

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Use this command for building the app for production:

```
npm run build
```

Or this command to run the app in develop mode:

```
npm run dev
```
