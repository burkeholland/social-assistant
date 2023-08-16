# Advocacy AI Assistant

**This is not the Advocacy AI Tools repo. It is just an experiment.** Go to https://github.com/burkeholland/advocacy-ai-tools for the app deployed at aka.ms/advocacy-ai-tools.

## Project Setup

```sh
npm install
```

### Run Project

The project consists of a Vue/Vite frontend and an Azure Functions API. The SWA CLI must be used to simulate the running env of a SWA application, including api request routing and auth. 

All commands are relative to the root folder. 

#### Run Vue/Vite App

```sh
npm run dev
```

### Run Functions API

```sh
cd api
func start
```

### Run SWA Emulator

```sh
swa start http://localhost:5173
```

Access the application on http://localhost:4280