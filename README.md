# AI-PBX Middleware Service

This project implements a middleware service that integrates a PBX system with an AI processing layer.  
It is designed to track real-time telephony events and orchestrate asynchronous AI-related workflows.

---

## Features

### AMI Integration (Call State Tracking)
- Connects to Asterisk Manager Interface (AMI)
- Listens for call lifecycle events such as:
  - Call answered
  - Call hangup
- Stores Caller ID, destination, start time, and total call duration

### ARI Integration (AI Bridge)
- Handles calls routed to the `ai-bridge` ARI application
- Answers incoming calls
- Plays a system prompt
- Records caller audio
- Triggers asynchronous processing after recording completes

### Async Processing
- Non-blocking event handling
- Background task execution for AI transcription simulation
- Designed to survive PBX restarts with automatic reconnection logic

### API
- `GET /calls`
  - Returns call history and AI processing status

---

## Tech Stack

- Node.js
- Express
- Async event handling (Promises / Event-driven logic)
- PostgreSQL / SQLite (configurable)
- Asterisk AMI & ARI

---

## Project Structure
src/
├── ami/ # AMI client and event listeners
├── ari/ # ARI application logic
├── db/ # Database connection and models
├── routes/ # REST API routes
└── index.js # Application entry point


---

## Running the Project

1. Install dependencies
2. Configure AMI and ARI credentials
3. Start the server
4. Place calls through the PBX to observe real-time event handling

---

## Notes

This project focuses on architectural design, async event handling, and reliability patterns required for PBX-to-AI integrations.
