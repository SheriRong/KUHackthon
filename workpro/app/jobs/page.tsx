'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBriefcase, FaSearch, FaFilter, FaTag, FaClock, FaDollarSign, FaChevronRight } from 'react-icons/fa';

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  // Sample job categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'writing', name: 'Writing & Translation' },
    { id: 'admin', name: 'Admin Support' }
  ];

  // Sample jobs data
  const sampleJobs = [
    {
      id: '1',
      title: 'Full Stack Developer for DeFi Dashboard',
      description: 'Looking for a full stack developer to build a comprehensive DeFi dashboard with real-time data integration.',
      category: 'development',
      skills: ['React', 'Node.js', 'Solidity', 'Web3.js'],
      budget: '2-3 ETH',
      duration: '2-3 months',
      posted: '2 days ago',
      employer: {
        name: 'DeFi Innovations',
        rating: 4.8
      }
    },
    {
      id: '2',
      title: 'UI/UX Designer for NFT Marketplace',
      description: 'Need a talented UI/UX designer to create an intuitive and visually appealing interface for our new NFT marketplace.',
      category: 'design',
      skills: ['Figma', 'UI/UX', 'Web Design', 'NFT Knowledge'],
      budget: '1-2 ETH',
      duration: '1-2 months',
      posted: '5 days ago',
      employer: {
        name: 'MetaCollect',
        rating: 4.6
      }
    },
    {
      id: '3',
      title: 'Smart Contract Developer',
      description: 'Seeking an experienced smart contract developer to create and audit contracts for our decentralized finance platform.',
      category: 'development',
      skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Security'],
      budget: '3-5 ETH',
      duration: '1-3 months',
      posted: '1 week ago',
      employer: {
        name: 'SecureChain Finance',
        rating: 4.9
      }
    },
    {
      id: '4',
      title: 'Content Writer for Blockchain Blog',
      description: 'Looking for a knowledgeable content writer to create articles about blockchain technology, DeFi, and cryptocurrency trends.',
      category: 'writing',
      skills: ['Content Writing', 'Blockchain Knowledge', 'SEO', 'Research'],
      budget: '0.5-1 ETH',
      duration: 'Ongoing',
      posted: '3 days ago',
      employer: {
        name: 'CryptoInsights',
        rating: 4.7
      }
    },
    {
      id: '5',
      title: 'Digital Marketing Specialist for Token Launch',
      description: 'Need a marketing specialist with crypto experience to help plan and execute our upcoming token launch campaign.',
      category: 'marketing',
      skills: ['Digital Marketing', 'Social Media', 'Crypto Community', 'Token Economics'],
      budget: '1.5-2.5 ETH',
      duration: '3 months',
      posted: '4 days ago',
      employer: {
        name: 'TokenX Ventures',
        rating: 4.5
      }
    },
    {
      id: '6',
      title: 'Virtual Assistant for Blockchain Startup',
      description: 'Seeking an organized and efficient virtual assistant to help manage operations for our growing blockchain startup.',
      category: 'admin',
      skills: ['Organization', 'Communication', 'Basic Blockchain Knowledge', 'Calendar Management'],
      budget: '0.8-1.2 ETH',
      duration: 'Ongoing',
      posted: '1 day ago',
      employer: {
        name: 'BlockFuture Labs',
        rating: 4.4
      }
    }
  ];

  useEffect(() => {
    // Simulate loading jobs from API/blockchain
    const loadJobs = async () => {
      setIsLoading(true);
      
      // In a real app, we would fetch jobs from an API or blockchain
      setTimeout(() => {
        setJobs(sampleJobs);
        setIsLoading(false);
      }, 1000);
    };
    
    loadJobs();
  }, []);

  // Filter jobs based on search term and category
  const filteredJobs = jobs.filter(job => {
    // Filter by search term
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

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
      <div className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          {/* Jobs Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-4 md:mb-0">Find Work</h1>
            <Link href="/jobs/post" className="btn btn-primary">
              Post a Job
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search by keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFilter className="text-gray-400" />
                  </div>
                  <select
                    className="input pl-10 appearance-none pr-8"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaChevronRight className="text-gray-400 transform rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <FaBriefcase className="text-gray-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or category filter</p>
              <button 
                onClick={() => {setSearchTerm(''); setFilterCategory('all');}} 
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map(job => (
                <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">{job.title}</h2>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <span className="flex items-center mr-4">
                            <FaBriefcase className="mr-1" /> {job.employer.name}
                          </span>
                          <span className="flex items-center">
                            <FaClock className="mr-1" /> {job.posted}
                          </span>
                        </div>
                      </div>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm capitalize">
                        {job.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <FaDollarSign className="text-primary mr-1" />
                        <span><strong>Budget:</strong> {job.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="text-primary mr-1" />
                        <span><strong>Duration:</strong> {job.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Client Rating: <span className="font-medium text-primary">{job.employer.rating.toFixed(1)}</span>
                    </div>
                    <Link href={`/jobs/${job.id}`} className="btn btn-sm btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Post Job CTA */}
          <div className="bg-gradient-to-r from-primary-hover to-primary text-white rounded-xl shadow-md p-8 mt-10 text-center">
            <h3 className="text-2xl font-bold mb-3">Have a project that needs talent?</h3>
            <p className="mb-6 text-white/90">Post your job and reach skilled freelancers ready to work on your project</p>
            <Link href="/jobs/post" className="btn btn-accent">
              Post a Job Now
            </Link>
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
              <p className="mt-2 text-gray-400">Decentralized Work Platform</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/docs" className="text-gray-400 hover:text-white">Documentation</Link></li>
                  <li><a href="https://github.com/example/workpro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} WorkPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
