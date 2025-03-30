'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type JobMatch = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchPercentage: number;
  skills: string[];
  postedAt: string;
  remote: boolean;
};

export default function JobMatches() {
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for demonstration
  useEffect(() => {
    const mockJobs: JobMatch[] = [
      {
        id: '1',
        title: 'Senior React Developer - DeFi Project',
        company: 'BlockFinance Inc.',
        location: 'Remote',
        salary: '$80-100/hr',
        matchPercentage: 95,
        skills: ['React', 'Next.js', 'Solidity', 'Web3'],
        postedAt: '2 days ago',
        remote: true
      },
      {
        id: '2',
        title: 'Blockchain Developer - NFT Marketplace',
        company: 'CryptoArt Labs',
        location: 'Remote',
        salary: '$70-90/hr',
        matchPercentage: 88,
        skills: ['Ethereum', 'Solidity', 'Smart Contracts'],
        postedAt: '1 week ago',
        remote: true
      },
      {
        id: '3',
        title: 'Full Stack Developer - Web3 Dashboard',
        company: 'DecentraData',
        location: 'Remote',
        salary: '$60-80/hr',
        matchPercentage: 82,
        skills: ['Node.js', 'React', 'Express', 'APIs'],
        postedAt: '3 days ago',
        remote: true
      },
    ];
    
    setTimeout(() => {
      setJobs(mockJobs);
      setIsLoading(false);
    }, 1000); // Simulate loading
  }, []);
  
  const getMatchClass = (percentage: number): string => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800';
    return 'bg-purple-100 text-purple-800';
  };
  
  const getMatchBorderClass = (percentage: number): string => {
    if (percentage >= 90) return 'border-l-4 border-green-500';
    if (percentage >= 80) return 'border-l-4 border-blue-500';
    return 'border-l-4 border-purple-500';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="header">
        <div className="text-2xl font-bold">FreelanceChain</div>
        <nav className="space-x-6">
          <Link href="/dashboard" className="text-white hover:text-opacity-80">Dashboard</Link>
          <Link href="/dashboard/jobs" className="text-white hover:text-opacity-80">Job Matches</Link>
          <Link href="/dashboard/applications" className="text-white hover:text-opacity-80">Applications</Link>
          <Link href="/profile" className="text-white hover:text-opacity-80">Profile</Link>
        </nav>
      </header>

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 border-r border-gray-200 p-5">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <div className="flex items-center text-sm mt-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Online</span>
            </div>
          </div>
          
          <nav className="space-y-2">
            <Link href="/dashboard" className="block py-2 text-gray-600 hover:text-indigo-600">Dashboard</Link>
            <Link href="/dashboard/jobs" className="block py-2 text-indigo-600 font-medium">AI Job Matches</Link>
            <Link href="/dashboard/applications" className="block py-2 text-gray-600 hover:text-indigo-600">Applications</Link>
            <Link href="/dashboard/messages" className="block py-2 text-gray-600 hover:text-indigo-600">Messages</Link>
            <Link href="/dashboard/contracts" className="block py-2 text-gray-600 hover:text-indigo-600">Active Contracts</Link>
            <Link href="/dashboard/payments" className="block py-2 text-gray-600 hover:text-indigo-600">Payments</Link>
            <Link href="/dashboard/settings" className="block py-2 text-gray-600 hover:text-indigo-600">Settings</Link>
          </nav>
          
          <div className="mt-auto pt-6 border-t border-gray-200 mt-6">
            <Link href="#" className="block py-2 text-gray-600 hover:text-indigo-600">Need Help?</Link>
            <Link href="/" className="block py-2 text-gray-600 hover:text-indigo-600">Log Out</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Job Matches</h1>
            <p className="text-gray-600">Based on your skills and portfolio</p>
          </div>
          
          <div className="flex justify-between mb-6">
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 flex items-center">
                Filter <span className="ml-2">▼</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 flex items-center">
                Sort by <span className="ml-2">▼</span>
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  className={`p-6 bg-white rounded-lg shadow ${getMatchBorderClass(job.matchPercentage)}`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                      <div className="mt-1 text-gray-600">{job.company} • {job.location} • {job.salary}</div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-sm text-gray-600 mb-1">Skills match: {job.skills.join(', ')}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Posted {job.postedAt}</div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchClass(job.matchPercentage)}`}>
                        {job.matchPercentage}% match
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
