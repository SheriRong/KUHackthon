'use client';

import { useEffect, useState } from 'react';
import { FaBriefcase, FaBuilding, FaEnvelope, FaGlobe, FaLinkedin, FaMapMarkerAlt, FaMoneyBillWave, 
  FaClock, FaUserTie, FaHeart, FaRocket, FaArrowLeft, FaCheckCircle, FaPlus, FaSearch, FaFilter, FaSave, FaShare } from 'react-icons/fa';
import Link from 'next/link';

export default function ResultsPage() {
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [displayedMatches, setDisplayedMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeMatch, setActiveMatch] = useState<number | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const matchesPerPage = 3;

  useEffect(() => {
    // Get matches from localStorage
    const storedMatches = localStorage.getItem('jobMatches');
    if (storedMatches) {
      const parsedMatches = JSON.parse(storedMatches);
      setAllMatches(parsedMatches);
      setDisplayedMatches(parsedMatches.slice(0, matchesPerPage));
      if (parsedMatches.length > 0) {
        setActiveMatch(0);
      }
    }

    // Get saved jobs from localStorage
    const storedSavedJobs = localStorage.getItem('savedJobs');
    if (storedSavedJobs) {
      setSavedJobs(JSON.parse(storedSavedJobs));
    }
    
    setLoading(false);
  }, []);

  const loadMoreMatches = () => {
    const nextPage = page + 1;
    const startIndex = 0;
    const endIndex = nextPage * matchesPerPage;
    setDisplayedMatches(allMatches.slice(startIndex, endIndex));
    setPage(nextPage);
  };

  const toggleSaveJob = (id: string) => {
    let newSavedJobs;
    if (savedJobs.includes(id)) {
      newSavedJobs = savedJobs.filter(jobId => jobId !== id);
    } else {
      newSavedJobs = [...savedJobs, id];
    }
    
    setSavedJobs(newSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
  };

  const hasMoreMatches = displayedMatches.length < allMatches.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your matches...</p>
        </div>
      </div>
    );
  }

  if (allMatches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaBriefcase className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">WorkPro</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Home</Link>
              <Link href="/dashboard/jobs" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Jobs</Link>
              <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Dashboard</Link>
            </div>
          </div>
        </nav>
        
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No matches found</h2>
            <p className="text-gray-600 mb-8">We couldn't find any jobs matching your profile. Please try uploading your resume again or adjust your search criteria.</p>
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200">
              <FaArrowLeft size={20} className="mr-2" />
              Back to Upload
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaBriefcase className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">WorkPro</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Home</Link>
            <Link href="/dashboard/jobs" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Jobs</Link>
            <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Dashboard</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Left Column - Control Panel */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <Link 
                  href="/"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
                >
                  <FaArrowLeft size={16} className="mr-2" />
                  Back to Home
                </Link>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Your Results</h2>
                <p className="text-gray-600">
                  Based on your skills and experience, we've found {allMatches.length} matching opportunities.
                </p>
              </div>
              
              <div className="mb-6">
                <button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  <span className="font-medium flex items-center">
                    <FaFilter className="mr-2" /> Filters
                  </span>
                  <span>{filterOpen ? '−' : '+'}</span>
                </button>
                
                {filterOpen && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        <option value="">All Types</option>
                        <option value="fulltime">Full Time</option>
                        <option value="parttime">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="remote">Remote</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input 
                        type="text" 
                        placeholder="City or Remote"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Match Score</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          defaultValue="50"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm text-gray-600">50%+</span>
                      </div>
                    </div>
                    <button className="w-full py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800">Match List</h3>
                {displayedMatches.map((match, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveMatch(index)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${activeMatch === index ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 line-clamp-1">{match.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-1">{match.company}</p>
                      </div>
                      <div className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                        {match.matchScore}%
                      </div>
                    </div>
                  </div>
                ))}
                
                {hasMoreMatches && (
                  <button
                    onClick={loadMoreMatches}
                    className="w-full py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Show More
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Job Details */}
          <div className="lg:w-3/4">
            {activeMatch !== null && displayedMatches[activeMatch] && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between flex-wrap">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{displayedMatches[activeMatch].title}</h2>
                      <div className="flex items-center text-gray-600 mt-2">
                        <FaBuilding size={20} className="mr-2" />
                        <span className="text-xl">{displayedMatches[activeMatch].company}</span>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-2 sm:mt-0">
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-lg font-medium">
                        {displayedMatches[activeMatch].matchScore}% Match
                      </div>
                      <button 
                        onClick={() => toggleSaveJob(displayedMatches[activeMatch].id)}
                        className={`p-2 rounded-full ${savedJobs.includes(displayedMatches[activeMatch].id) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} hover:bg-blue-200 transition-colors`}
                      >
                        <FaSave size={20} />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                        <FaShare size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt size={20} className="mr-2 text-blue-500" />
                      <span>{displayedMatches[activeMatch].location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMoneyBillWave size={20} className="mr-2 text-green-500" />
                      <span>{displayedMatches[activeMatch].salary}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaClock size={20} className="mr-2 text-purple-500" />
                      <span>{displayedMatches[activeMatch].jobType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaUserTie size={20} className="mr-2 text-indigo-500" />
                      <span>{displayedMatches[activeMatch].experience}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
                    <p className="text-gray-600 leading-relaxed">{displayedMatches[activeMatch].description}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {displayedMatches[activeMatch].requirements && displayedMatches[activeMatch].requirements.length > 0 ? (
                          displayedMatches[activeMatch].requirements.map((req: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <FaCheckCircle size={20} className="text-green-500 mr-2 mt-1" />
                              <span className="text-gray-600">{req}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">No specific requirements listed</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {displayedMatches[activeMatch].skills && displayedMatches[activeMatch].skills.length > 0 ? (
                          displayedMatches[activeMatch].skills.map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No specific skills listed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayedMatches[activeMatch].benefits && displayedMatches[activeMatch].benefits.length > 0 ? (
                        displayedMatches[activeMatch].benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <FaCheckCircle size={20} className="text-green-500 mr-2 mt-1" />
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No specific benefits listed</li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Culture</h3>
                      <div className="flex items-start">
                        <FaHeart size={20} className="mr-2 text-red-500 mt-1" />
                        <p className="text-gray-600">{displayedMatches[activeMatch].culture}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth Opportunities</h3>
                      <div className="flex items-start">
                        <FaRocket size={20} className="mr-2 text-purple-500 mt-1" />
                        <p className="text-gray-600">{displayedMatches[activeMatch].growth}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={displayedMatches[activeMatch].applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <FaBriefcase size={20} className="mr-2" />
                      Apply Now
                    </a>
                    <a
                      href={`mailto:careers@${displayedMatches[activeMatch].company.toLowerCase().replace(/\s+/g, '')}.com`}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <FaEnvelope size={20} className="mr-2" />
                      Contact HR
                    </a>
                    <a
                      href={`https://www.linkedin.com/company/${displayedMatches[activeMatch].company.toLowerCase().replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <FaLinkedin size={20} className="mr-2" />
                      LinkedIn Profile
                    </a>
                    <a
                      href={`https://${displayedMatches[activeMatch].company.toLowerCase().replace(/\s+/g, '')}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <FaGlobe size={20} className="mr-2" />
                      Company Website
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <FaBriefcase className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">WorkPro</span>
              </div>
              <p className="mt-2 text-gray-400">Find your next opportunity with AI-powered job matching</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h3 className="font-bold mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/dashboard/jobs" className="text-gray-400 hover:text-white transition-colors">Jobs</Link></li>
                  <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} WorkPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}