# MindDrive

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Deployment](#deployment)
- [Demo](#demo)
- [Folder Structure](#folder-structure)
- [License](#license)


## Overview
Mind Drive leverages Node.js, EJS, Tailwind CSS, and MongoDB to offer a holistic mental health platform. Featuring an AI-driven chatbot, it intuitively gauges user moods, community support, and a resource library for enhanced emotional well-being.
## Tech Stack

- EJS: Embedded JavaScript templates for server-side rendering.
- Node.js: JavaScript runtime environment.
  

## Features
Mind Drive integrates a sophisticated AI chatbot within its Node.js and MongoDB framework, providing users with personalized mental health support. The chatbot serves as a versatile tool, enabling users to express their feelings confidentially and receive immediate emotional guidance. Beyond mood assessment, users can explore tailored fun activities, curated based on their current emotional state. This feature not only enhances engagement but also promotes positive mental health practices. Additionally, Mind Drive offers a comprehensive resource library, fostering community engagement and providing a platform for users to share experiences and support each other in their mental health journey.

## Deployment
This project is deployed on Render for production. Render provides scalability and reliability for hosting web applications.


## Demo
[MindDrive](https://minddrive.onrender.com/)

## Folder Structure


```bash
MindDrive/
│
├── config/
│ ├──db.config.js
│ └── keys.config.js
│
├── controllers/
│ ├── auth.controller.js
│ └──  gemini.controller.js
│
├── database/
│ └── Mongo.database.js
│
├──models/
│ └── user.model.js
│
├── public/
│    ├── css/
│      ├── modal.css
│      └── style.css
│    ├── images/
│      └──  emojis/
│    └──  js/
│      ├── chatbot.js
│      └── global.js
│
├── routes/
│   ├── auth.routes.js
│   └── gemini.routes.js
│
├── viewss/
│ ├── includes/
│    ├── navbar.ejs
│    └── sidebar.ejs
│ └──pages/
│    ├──about.ejs
│    ├──chatbot.ejs
│    ├──index.ejs
│    └── profile.ejs
├── .gitignore
├── LICENSE
├── README
├── app.js
├── package-lock.json
└── package.json
```

## License

4>
