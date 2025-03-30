# Decentralized Work Platform

A modern web application that allows job seekers to upload their resumes to IPFS (via Pinata) and uses Google's Gemini AI to match them with relevant job positions.

## Features

- Resume upload to IPFS via Pinata
- AI-powered job matching using Gemini
- Modern, responsive UI with Tailwind CSS
- Decentralized storage for resumes
- Job search and matching functionality

## Prerequisites

- Node.js 18.x or later
- Pinata API Key
- Google AI API Key (for Gemini)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_API_SECRET=your_pinata_api_secret
GOOGLE_AI_API_KEY=your_gemini_api_key
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Visit `http://localhost:3000`
2. Upload your resume
3. View AI-matched job positions
4. Apply to matched positions

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Pinata/IPFS
- Google Gemini AI
- Ethers.js 