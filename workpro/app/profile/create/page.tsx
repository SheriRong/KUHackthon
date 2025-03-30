'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUpload, FaFileAlt, FaSpinner } from 'react-icons/fa';

export default function CreateProfile() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [professionalTitle, setProfessionalTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!fullName || !professionalTitle) {
        alert('Please fill in all required fields');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate step 2
      if (!file) {
        alert('Please upload your resume');
        return;
      }

      // Simulate resume processing with IPFS and AI
      setIsUploading(true);
      try {
        // In a real app, we would upload to IPFS here
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(3);
      } catch (error) {
        alert('Error uploading resume. Please try again.');
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    } else if (currentStep === 3) {
      // Complete profile creation
      router.push('/dashboard/jobs');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="header">
        <div className="text-2xl font-bold">FreelanceChain</div>
        <nav className="space-x-6">
          <Link href="/" className="text-white hover:text-opacity-80">Home</Link>
          <Link href="/jobs" className="text-white hover:text-opacity-80">Jobs</Link>
          <Link href="/freelancers" className="text-white hover:text-opacity-80">Freelancers</Link>
          <Link href="/login" className="text-white hover:text-opacity-80">Login</Link>
        </nav>
      </header>

      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-center mb-2">Create Your Freelancer Profile</h1>
          <p className="text-gray-600 text-center mb-8">AI will analyze your resume to extract skills and suggest job matches</p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span className="font-medium">Step {currentStep} of {totalSteps}: {currentStep === 1 ? 'Basic Information' : currentStep === 2 ? 'Resume Upload' : 'Skills Review'}</span>
              </div>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                  <input 
                    type="text" 
                    value={professionalTitle}
                    onChange={(e) => setProfessionalTitle(e.target.value)}
                    placeholder="e.g. Full Stack Developer, Blockchain Engineer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Resume Upload */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Resume Upload (IPFS Storage)</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />
                
                {!file ? (
                  <label 
                    htmlFor="resume-upload" 
                    className="cursor-pointer text-center"
                  >
                    <FaUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 mb-2">Drag and drop your resume here</p>
                    <p className="text-gray-500 text-sm">or browse files</p>
                  </label>
                ) : (
                  <div className="flex items-center space-x-2 text-indigo-600">
                    <FaFileAlt className="w-6 h-6" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center text-sm text-indigo-600 bg-indigo-50 p-2 rounded">
                Your data is securely stored on IPFS
              </div>
            </div>
          )}

          {/* Step 3: Skills Review */}
          {currentStep === 3 && (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="text-green-800 font-medium mb-2">Resume Successfully Processed</h3>
                <p className="text-green-700 text-sm">We've identified the following skills:</p>
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Extracted Skills</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">JavaScript</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Node.js</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Solidity</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Web3.js</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Experience</h3>
                  <div className="text-gray-700">
                    <p>4+ years of experience in web development</p>
                    <p>2+ years of experience in blockchain development</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">Based on your profile, we'll match you with relevant job opportunities</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-end">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isUploading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md mr-4 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            
            <button
              onClick={handleNextStep}
              disabled={isUploading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
            >
              {isUploading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : currentStep === totalSteps ? 'Complete Profile' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
