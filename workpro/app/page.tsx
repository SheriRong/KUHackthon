'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { extractTextFromFile, validateFile } from '../utils/fileUtils';
import { AIService } from '../services/aiService';
import { FaUpload, FaFileAlt, FaSpinner } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validationError = validateFile(selectedFile);
      
      if (validationError) {
        setFileError(validationError);
        setFile(null);
      } else {
        setFileError(null);
        setFile(selectedFile);
      }
      setError(null);
    }
  };

  const uploadToPinata = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
          },
        }
      );

      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      throw new Error('Failed to upload file to Pinata');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      console.log('Starting file processing...');
      
      // Upload to Pinata
      console.log('Uploading to Pinata...');
      const ipfsHash = await uploadToPinata(file);
      console.log('File uploaded to Pinata:', ipfsHash);
      
      // Read file content
      console.log('Extracting text from file...');
      const text = await extractTextFromFile(file);
      console.log('Text extracted successfully');
      
      // Initialize AI Service
      console.log('Initializing AI Service...');
      const aiService = new AIService(process.env.GOOGLE_AI_API_KEY || '');
      
      // Analyze with Gemini AI
      console.log('Starting AI analysis...');
      const jobMatches = await aiService.analyzeResume(text);
      console.log('AI analysis completed');
      
      // Store matches in localStorage for the results page
      localStorage.setItem('jobMatches', JSON.stringify(jobMatches));
      
      // Navigate to results page
      router.push('/results');
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while processing your resume');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-gray-600">
              Upload your resume and let our AI find the perfect job matches for you
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                  Upload Your Resume
                </label>
                <div className="mt-2">
                  <div className="relative">
                    <input
                      type="file"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="mb-2 text-lg text-gray-600">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, DOC, DOCX, or TXT (MAX. 5MB)
                        </p>
                      </div>
                    </label>
                  </div>
                  {file && (
                    <div className="mt-4 flex items-center text-gray-600">
                      <FaFileAlt className="mr-2" />
                      <span>{file.name}</span>
                    </div>
                  )}
                  {fileError && (
                    <p className="mt-2 text-sm text-red-600">{fileError}</p>
                  )}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {uploading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Processing...
                  </span>
                ) : (
                  'Find Matching Jobs'
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Resume</h3>
                <p className="text-gray-600">Upload your resume in any supported format</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-gray-600"> @GoogleGemini analyzes your skills and experience</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Get Matches</h3>
                <p className="text-gray-600">Receive personalized job recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 