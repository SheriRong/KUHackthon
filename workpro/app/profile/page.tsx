'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserAlt, FaFileAlt, FaBriefcase, FaEdit, FaDownload, FaFileContract, FaShieldAlt } from 'react-icons/fa';
import { retrieveFromAutonomys } from '../../lib/autonomys';
import { getUserContracts } from '../../lib/smartContracts';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    walletAddress: '0x1234...5678',
    skills: ['JavaScript', 'React', 'Node.js', 'Smart Contracts', 'UI/UX Design'],
    resumeCid: 'pinata-abcdef123456',
    contractsCid: 'autonomys-xyz7890',
    jobsCompleted: 12,
    rating: 4.8,
    memberSince: 'June 2023'
  });
  
  // Mock user contracts
  const [contracts, setContracts] = useState([]);
  
  useEffect(() => {
    // Simulate loading user data and contracts
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would fetch the actual user data
        // Simulate fetching contracts from Autonomys DSN
        const mockContracts = [
          {
            id: '1',
            name: 'Website Development',
            client: '0x1234...5678',
            freelancer: '0x8765...4321',
            totalAmount: '2 ETH',
            status: 'active',
            progress: 60,
            milestones: [
              { name: 'Design Approval', status: 'completed', payment: '0.5 ETH' },
              { name: 'Frontend Implementation', status: 'in-progress', payment: '0.7 ETH' },
              { name: 'Backend Integration', status: 'pending', payment: '0.8 ETH' }
            ]
          },
          {
            id: '2',
            name: 'Logo Design Project',
            client: '0x2345...6789',
            freelancer: '0x9876...5432',
            totalAmount: '0.5 ETH',
            status: 'completed',
            progress: 100,
            milestones: [
              { name: 'Initial Concepts', status: 'completed', payment: '0.2 ETH' },
              { name: 'Final Design', status: 'completed', payment: '0.3 ETH' }
            ]
          }
        ];
        
        setContracts(mockContracts);
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
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
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 text-center border-b border-gray-200">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaUserAlt className="text-primary text-3xl" />
                    </div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600 mt-1">{user.email}</p>
                    <p className="text-gray-500 text-sm mt-2">{user.walletAddress}</p>
                  </div>
                  <div className="p-4">
                    <nav>
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center w-full px-4 py-2 rounded-md mb-1 ${activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FaUserAlt className="mr-3" />
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab('resume')}
                        className={`flex items-center w-full px-4 py-2 rounded-md mb-1 ${activeTab === 'resume' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FaFileAlt className="mr-3" />
                        Resume
                      </button>
                      <button
                        onClick={() => setActiveTab('contracts')}
                        className={`flex items-center w-full px-4 py-2 rounded-md mb-1 ${activeTab === 'contracts' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FaFileContract className="mr-3" />
                        Contracts
                      </button>
                    </nav>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-3">
                {activeTab === 'overview' && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">Profile Overview</h2>
                      <Link href="/profile/edit" className="flex items-center text-primary hover:text-primary-hover">
                        <FaEdit className="mr-1" /> Edit Profile
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p>{user.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p>{user.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Wallet Address</p>
                            <p>{user.walletAddress}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p>{user.memberSince}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Professional Information</h3>
                        <div>
                          <p className="text-sm text-gray-500">Skills</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {user.skills.map((skill, index) => (
                              <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{skill}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Work Stats</p>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="bg-primary/5 p-3 rounded-md">
                              <p className="text-sm text-gray-600">Jobs Completed</p>
                              <p className="text-2xl font-semibold text-primary">{user.jobsCompleted}</p>
                            </div>
                            <div className="bg-primary/5 p-3 rounded-md">
                              <p className="text-sm text-gray-600">Rating</p>
                              <p className="text-2xl font-semibold text-primary">{user.rating}/5</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'resume' && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">Resume</h2>
                      <div className="flex space-x-2">
                        <Link href="/profile/resume/edit" className="flex items-center text-primary hover:text-primary-hover">
                          <FaEdit className="mr-1" /> Update Resume
                        </Link>
                        <button className="flex items-center text-primary hover:text-primary-hover">
                          <FaDownload className="mr-1" /> Download
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start border border-blue-100">
                      <div className="mr-3 mt-1 text-blue-500">
                        <FaFileAlt />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-800 mb-1">Stored on Pinata (IPFS)</h4>
                        <p className="text-sm text-blue-700">
                          Resume data is stored on Pinata IPFS with identifier: <span className="font-mono text-sm">{user.resumeCid}</span><br />
                          <span className="text-xs">Pinata is used for frequently updated content like resumes and profile information.</span>
                        </p>
                      </div>
                    </div>

                    {/* Resume Preview - This would display the actual resume content */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">{user.name}</h3>
                      <p className="text-gray-600 mb-4">{user.email} • {user.walletAddress}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-md font-semibold border-b border-gray-200 pb-2 mb-3">Summary</h4>
                        <p className="text-gray-700">
                          Experienced developer with expertise in blockchain technologies, web development, and smart contracts.
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-md font-semibold border-b border-gray-200 pb-2 mb-3">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill, index) => (
                            <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{skill}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-md font-semibold border-b border-gray-200 pb-2 mb-3">Experience</h4>
                        <div className="mb-4">
                          <div className="flex justify-between">
                            <h5 className="font-medium">Senior Developer</h5>
                            <span className="text-gray-600 text-sm">Jan 2022 - Present</span>
                          </div>
                          <p className="text-gray-600 italic">Blockchain Solutions Inc.</p>
                          <p className="text-gray-700 mt-2">
                            Led development of decentralized applications and smart contracts.
                          </p>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between">
                            <h5 className="font-medium">Frontend Developer</h5>
                            <span className="text-gray-600 text-sm">Mar 2020 - Dec 2021</span>
                          </div>
                          <p className="text-gray-600 italic">Web3 Labs</p>
                          <p className="text-gray-700 mt-2">
                            Built responsive user interfaces for blockchain applications.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contracts' && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">Your Contracts</h2>
                      <Link href="/contracts" className="flex items-center text-primary hover:text-primary-hover">
                        <FaFileContract className="mr-1" /> Create Contract
                      </Link>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-md mb-6 flex items-start border border-indigo-100">
                      <div className="mr-3 mt-1 text-indigo-500">
                        <FaShieldAlt />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-indigo-800 mb-1">Stored on Autonomys DSN</h4>
                        <p className="text-sm text-indigo-700">
                          Contract data is permanently stored on Autonomys DSN with identifier: <span className="font-mono text-sm">{user.contractsCid}</span><br />
                          <span className="text-xs">Autonomys is used for immutable records like contracts that require verification and permanence.</span>
                        </p>
                      </div>
                    </div>
                    
                    {contracts.length === 0 ? (
                      <div className="text-center py-8">
                        <FaFileContract className="text-gray-400 text-4xl mx-auto mb-4" />
                        <p className="text-gray-600">You don't have any contracts yet.</p>
                        <Link href="/contracts" className="mt-4 inline-block text-primary hover:text-primary-hover">
                          Create a new contract
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {contracts.map((contract) => (
                          <div key={contract.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-lg font-semibold">{contract.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${contract.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {contract.status === 'completed' ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-3">
                              <span>
                                {contract.client === user.walletAddress ? 'You are the client' : 'You are the freelancer'}
                              </span>
                              <span>Total: {contract.totalAmount}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${contract.progress}%` }}
                              ></div>
                            </div>
                            <Link href={`/contracts/${contract.id}`} className="text-primary hover:text-primary-hover text-sm font-medium">
                              View Contract Details →
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
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
