# Job Listing Application

A Next.js application that displays a list of job postings using data from a JSON file.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Components](#components)
- [Data](#data)
- [Project Structure](#project-structure)

## Installation

To run this project locally:

1. Clone the repository.
2. Install the dependencies.
3. Run the development server.
4. Open your browser and go to `http://localhost:3000`.

## Usage

To add or update job postings, modify the `jobs.json` file located in the `Data` directory. The application will automatically reflect these changes.

## API Endpoint

The dashboard component uses the following API endpoint to fetch job opportunity details:

`https://akil-backend.onrender.com/opportunities/{id}`

## Screenshots

### Home Page

The Home Page displays a list of job postings.

![Home Page](./screenshots/home_page.png)
![Home Page](./screenshots/home_page2.png)

**Description**: The Home Page lists all available job postings. Each job card displays the job title, description, type, categories, and an image.

### Job Card

A detailed view of an individual job card.

![Job Card](./screenshots/job_card.png)

### Applicant Dashboard

![Job Card](./screenshots/dash_board.png)

**Description**: Each job card includes the organization's logo, job title, location, description, operation type, and categories.

### Faild API Request

Below is a screenshot showing the error message displayed when the API request fails:

![Job Card](./screenshots/faild_API.png)
![Job Card](./screenshots/faild_API2.png)

## Components

### Home Page

The `Home` component fetches job data from `jobs.json` and maps through it to display `JobCard` components.

### Job Card

The `JobCard` component displays individual job details.

### Applicant Dashboard

The `Applicant Dashboard` component displays every details of the chosen job.

## Project Structure

```
.
├── app
│   └── page.tsx
|   └── global.css
|   └── layout.tsx
|   └── components
|   │    └── jobCard.tsx
|   └── [id]
|         └── jobCard.tsx
|
└── screenshots
│       ├── home_page.png
│       └── job_card.png
├── types
│   └── job.ts
│   └── apiResponse.ts
├── next.config.js
├── package.json
└── README.md
```
