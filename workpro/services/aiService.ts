import { GoogleGenerativeAI, GenerativeModel, GenerateContentRequest } from '@google/generative-ai';

export interface JobMatch {
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
  private model: GenerativeModel;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Google AI API key is not provided');
    }
    console.log('Initializing Gemini AI...');
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async analyzeResume(resumeText: string): Promise<JobMatch[]> {
    try {
      console.log('Starting resume analysis...');
      if (!resumeText || resumeText.trim().length === 0) {
        throw new Error('Resume text is empty');
      }

      const prompt = `
        You are a professional resume analyzer and job seeker. Analyze this resume and suggest matching openning job positions. It is important that the job position is still openning for registration. 
        For each match, provide information about the role, company, and why it's a good fit. It should started to seek depending on theier locatioin, search the surrounding job first, and then expand the searching area. 
        Format your response as a JSON array with exactly this structure:
        [
          {
            "id": "1",
            "title": "Software Engineer",
            "company": "Tech Company",
            "description": "Detailed job description",
            "requirements": ["requirement1", "requirement2"],
            "matchScore": 85,
            "location": "San Francisco, CA",
            "salary": "$120,000 - $150,000",
            "jobType": "Full-time",
            "experience": "3-5 years",
            "benefits": ["benefit1", "benefit2"],
            "applicationUrl": "https://company.com/careers/position",
            "companyDescription": "Brief company description",
            "culture": "Company culture description",
            "growth": "Growth opportunities description"
          }
        ]
        
        Important:
        1. Provide realistic and detailed information
        2. Match the requirements and skills with the resume content
        3. Include actual company names and locations
        4. The URL should be a direct link to the job application page 
        4. Provide realistic salary ranges based on the role and location
        5. Include specific benefits and growth opportunities
        6. Respond ONLY with the JSON array, no additional text
        
        Resume text: ${resumeText}
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
      
      // Clean the response text to ensure it's valid JSON
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
      console.error('Detailed error in analyzeResume:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to analyze resume: ${error.message}`);
      }
      throw new Error('Failed to analyze resume: Unknown error');
    }
  }

  async refineJobMatch(jobMatch: JobMatch, resumeText: string): Promise<JobMatch> {
    try {
      console.log('Refining job match...');
      const prompt = `
        Analyze why this job position is a good match for the resume.
        Provide a detailed explanation of the match, including:
        1. Why the candidate's skills align with the role
        2. How their experience matches the requirements
        3. Growth potential in this position
        4. Cultural fit with the company
        
        Job Position: ${JSON.stringify(jobMatch)}
        Resume: ${resumeText}
        
        Provide a detailed explanation of why this position is a good match.
      `;

      const request: GenerateContentRequest = {
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }]
      };

      const result = await this.model.generateContent(request);
      const response = await result.response;
      const text = response.text();

      console.log('Successfully refined job match');
      return {
        ...jobMatch,
        description: text,
      };
    } catch (error) {
      console.error('Error in refineJobMatch:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to refine job match: ${error.message}`);
      }
      throw new Error('Failed to refine job match: Unknown error');
    }
  }
} 