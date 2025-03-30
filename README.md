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
