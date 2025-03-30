import { GoogleGenerativeAI, GenerativeModel, GenerateContentRequest } from '@google/generative-ai';

interface ResumeAnalysis {
  skills: string[];
  yearsOfExperience: number;
  achievements: string[];
  educationLevel: string;
  industryFocus: string[];
  suggestedRoles: string[];
}

interface JobMatch {
  jobId: string;
  score: number;
  explanation: string;
  keyMatches: string[];
  gapAreas: string[];
}

interface MatchResult {
  matches: JobMatch[];
}

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  matchScore: number;
  location: string;
  salary: string;
  jobType: string;
  experience: string;
  skills: string[];
  benefits: string[];
  applicationUrl: string;
  companyDescription: string;
  culture: string;
  growth: string;
}

export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    console.log('Initializing Gemini AI...');
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
    try {
      console.log('Starting resume analysis...');
      if (!resumeText || resumeText.trim().length === 0) {
        throw new Error('Resume text is empty');
      }

      const prompt = `
        Analyze the following resume and extract key information:
        1. Skills (technical and soft skills)
        2. Years of experience
        3. Key achievements
        4. Education level
        5. Industry focus

        Resume:
        ${resumeText}

        Provide the analysis in JSON format with the following structure:
        {
          "skills": string[],
          "yearsOfExperience": number,
          "achievements": string[],
          "educationLevel": string,
          "industryFocus": string[],
          "suggestedRoles": string[]
        }
      `;

      console.log('Sending prompt to Gemini AI...');
      const request: GenerateContentRequest = {
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }]
      };
      
      const result = await this.model.generateContent(request);
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw response from Gemini AI:', text);
      
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      try {
        const profile = JSON.parse(cleanText);
        console.log('Successfully parsed profile:', profile);
        return profile;
      } catch (parseError) {
        console.error('Failed to parse AI response as JSON:', cleanText);
        throw new Error('Failed to parse AI response as valid JSON');
      }
    } catch (error) {
      console.error('Detailed error in analyzeResume:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to analyze resume: ${error.message}`);
      }
      throw new Error('Failed to analyze resume: Unknown error');
    }
  }

  async matchJobsToProfile(profile: any, jobs: Job[]): Promise<MatchResult> {
    try {
      const prompt = `
        Given a candidate profile and a list of jobs, rank the jobs based on how well they match the candidate's skills and experience.
        
        Candidate Profile:
        ${JSON.stringify(profile)}

        Jobs:
        ${JSON.stringify(jobs)}

        For each job, provide a match score (0-100) and explanation. Return in JSON format:
        {
          "matches": [
            {
              "jobId": string,
              "score": number,
              "explanation": string,
              "keyMatches": string[],
              "gapAreas": string[]
            }
          ]
        }
      `;

      console.log('Sending prompt to Gemini AI...');
      const request: GenerateContentRequest = {
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }]
      };

      const result = await this.model.generateContent(request);
      const response = await result.response;
      const text = response.text();

      console.log('Raw response from Gemini AI:', text);
      
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      try {
        const matches = JSON.parse(cleanText);
        console.log('Successfully parsed job matches:', matches);
        return matches;
      } catch (parseError) {
        console.error('Failed to parse AI response as JSON:', cleanText);
        throw new Error('Failed to parse AI response as valid JSON');
      }
    } catch (error) {
      console.error('Error matching jobs:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to match jobs: ${error.message}`);
      }
      throw new Error('Failed to match jobs: Unknown error');
    }
  }

  async generateJobDescription(requirements: string): Promise<string> {
    try {
      const prompt = `
        Create a comprehensive job description based on the following requirements:
        ${requirements}

        Include:
        1. Role overview
        2. Key responsibilities
        3. Required qualifications
        4. Preferred qualifications
        5. Benefits
        6. Company culture points

        Format in markdown.
      `;

      console.log('Sending prompt to Gemini AI...');
      const request: GenerateContentRequest = {
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }]
      };

      const result = await this.model.generateContent(request);
      const response = await result.response;
      const text = response.text();

      console.log('Successfully generated job description');
      return text;
    } catch (error) {
      console.error('Error generating job description:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate job description: ${error.message}`);
      }
      throw new Error('Failed to generate job description: Unknown error');
    }
  }
}