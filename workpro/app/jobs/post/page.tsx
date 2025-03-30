'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBriefcase, FaCode, FaMoneyBillWave, FaClock, FaCheckCircle, FaFileUpload, FaShieldAlt } from 'react-icons/fa';
import { storeOnAutonomys } from '../../../lib/autonomys';

export default function PostJob() {
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('4');
  const [milestones, setMilestones] = useState([{ name: '', payment: '', description: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [autonomysCid, setAutonomysCid] = useState('');

  const addMilestone = () => {
    setMilestones([...milestones, { name: '', payment: '', description: '' }]);
  };

  const removeMilestone = (index) => {
    if (milestones.length > 1) {
      const newMilestones = [...milestones];
      newMilestones.splice(index, 1);
      setMilestones(newMilestones);
    }
  };

  const updateMilestone = (index, field, value) => {
    const newMilestones = [...milestones];
    newMilestones[index][field] = value;
    setMilestones(newMilestones);
  };

  const nextStep = () => {
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadStatus('uploading');
    
    try {
      // Create job object
      const jobData = {
        title,
        description,
        skills: skills.split(',').map(skill => skill.trim()),
        budget,
        duration,
        milestones,
        createdAt: new Date().toISOString(),
        status: 'open'
      };
      
      // Store on Autonomys DSN
      const result = await storeOnAutonomys(jobData, {
        collection: 'jobs',
        metadata: {
          jobType: 'freelance',
          skills: skills.split(',').map(skill => skill.trim())
        }
      });
      
      setAutonomysCid(result.cid);
      setUploadStatus('success');
      
      // Wait a bit before redirecting
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to the posted job page
      router.push(`/jobs/candidates?cid=${result.cid}`);
    } catch (error) {
      console.error('Error posting job:', error);
      setUploadStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <FaBriefcase className="mr-2" /> WorkPro
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-opacity-80 font-medium">Home</Link>
            <Link href="/jobs" className="text-white hover:text-opacity-80 font-medium">Jobs</Link>
            <Link href="/profile" className="text-white hover:text-opacity-80 font-medium">Profile</Link>
            <Link href="/contracts" className="text-white hover:text-opacity-80 font-medium">Smart Contracts</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-white hover:text-opacity-80 font-medium">Log in</Link>
            <Link href="/signup" className="btn btn-accent">Get started</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-8">
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <div className={`flex items-center ${formStep >= 1 ? 'text-primary font-semibold' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${formStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                    Job Details
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${formStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  <div className={`flex items-center ${formStep >= 2 ? 'text-primary font-semibold' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${formStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                    Milestones
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${formStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  <div className={`flex items-center ${formStep >= 3 ? 'text-primary font-semibold' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${formStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                    Review
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h1 className="text-3xl font-bold mb-2 gradient-text">Post a New Job</h1>
              <p className="text-gray-600 mb-8">Your job will be securely stored on Autonomys DSN and matched to talent by AI</p>

              <form onSubmit={handleSubmit}>
                {/* Step 1 - Job Details */}
                {formStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaBriefcase className="text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="input pl-10"
                          placeholder="e.g. Full Stack Developer for NFT Marketplace"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                      <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input h-32"
                        placeholder="Describe the project, responsibilities, and expectations"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Required Skills (AI will use these for matching)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCode className="text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                          placeholder="e.g. React, Solidity, Web3.js, Node.js"
                          className="input pl-10"
                          required
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget (ETH)</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaMoneyBillWave className="text-gray-400" />
                          </div>
                          <input 
                            type="number" 
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            step="0.1"
                            min="0.1"
                            className="input pl-10"
                            placeholder="0.0"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaClock className="text-gray-400" />
                          </div>
                          <input 
                            type="number" 
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            min="1"
                            className="input pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn btn-primary"
                      >
                        Continue to Milestones
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 - Milestones */}
                {formStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Project Milestones</h2>
                        <button 
                          type="button" 
                          onClick={addMilestone} 
                          className="text-primary hover:text-primary-hover"
                        >
                          + Add Milestone
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {milestones.map((milestone, index) => (
                          <div key={index} className="border border-gray-200 rounded-xl p-4 bg-white">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="font-medium">Milestone {index + 1}</h3>
                              {milestones.length > 1 && (
                                <button 
                                  type="button" 
                                  onClick={() => removeMilestone(index)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Milestone Name</label>
                                <input 
                                  type="text" 
                                  value={milestone.name}
                                  onChange={(e) => updateMilestone(index, 'name', e.target.value)}
                                  className="input"
                                  placeholder="e.g. Frontend Implementation"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (ETH)</label>
                                <input 
                                  type="number" 
                                  value={milestone.payment}
                                  onChange={(e) => updateMilestone(index, 'payment', e.target.value)}
                                  step="0.01"
                                  min="0.01"
                                  className="input"
                                  placeholder="0.0"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Milestone Description</label>
                              <input 
                                type="text" 
                                value={milestone.description}
                                onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                                className="input"
                                placeholder="Describe what deliverables are expected"
                                required
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn btn-secondary"
                      >
                        Back to Details
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn btn-primary"
                      >
                        Review Job Posting
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 - Review */}
                {formStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Review Job Details</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Job Title</h3>
                          <p className="font-medium">{title}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
                          <p className="font-medium">{budget} ETH</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                        <p className="text-gray-700">{description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Required Skills</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {skills.split(',').map((skill, i) => (
                              <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Expected Duration</h3>
                          <p className="font-medium">{duration} weeks</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Milestones</h3>
                        <div className="space-y-3">
                          {milestones.map((milestone, index) => (
                            <div key={index} className="flex justify-between border-b border-gray-200 pb-2">
                              <div>
                                <p className="font-medium">{milestone.name}</p>
                                <p className="text-sm text-gray-600">{milestone.description}</p>
                              </div>
                              <p className="font-medium">{milestone.payment} ETH</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <FaShieldAlt className="text-blue-500 mr-3 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        By posting this job, you agree to create a smart contract with milestone-based payments.
                        Job data will be securely stored on Autonomys DSN for immutability and verification.
                      </p>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn btn-secondary"
                      >
                        Back to Milestones
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            {uploadStatus === 'uploading' && 'Uploading to Autonomys DSN...'}
                            {uploadStatus === 'success' && (
                              <>
                                <FaCheckCircle className="mr-2" /> Uploaded Successfully!
                              </>
                            )}
                            {uploadStatus === 'error' && 'Upload Failed. Try Again'}
                          </>
                        ) : (
                          <>
                            <FaFileUpload className="mr-2" /> Post Job Now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-2xl font-bold flex items-center">
                <FaBriefcase className="mr-2 text-primary" /> WorkPro
              </Link>
              <p className="mt-2 text-gray-400">Decentralized Work Platform with Autonomys DSN</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h3 className="font-bold mb-2">Platform</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link href="/jobs" className="text-gray-400 hover:text-white">Jobs</Link></li>
                  <li><Link href="/profile" className="text-gray-400 hover:text-white">Profile</Link></li>
                  <li><Link href="/contracts" className="text-gray-400 hover:text-white">Smart Contracts</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
