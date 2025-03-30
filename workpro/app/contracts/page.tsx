'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaFileContract, FaCheck, FaTimes, FaClock, FaBriefcase, FaShieldAlt } from 'react-icons/fa';

export default function Contracts() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('create');
  const [milestones, setMilestones] = useState([{ name: '', description: '', deadline: '', payment: '' }]);
  const [contractName, setContractName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [freelancerAddress, setFreelancerAddress] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [agreementTerms, setAgreementTerms] = useState('');

  // Sample contracts for display
  const sampleContracts = [
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

  const addMilestone = () => {
    setMilestones([...milestones, { name: '', description: '', deadline: '', payment: '' }]);
  };

  const removeMilestone = (index) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  const updateMilestone = (index, field, value) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index][field] = value;
    setMilestones(updatedMilestones);
  };

  const createContract = (e) => {
    e.preventDefault();
    // This would connect to the blockchain to create a smart contract
    // For now, let's just show a success message
    alert('Contract created and stored on Autonomys DSN!');
    // Reset form
    setContractName('');
    setClientAddress('');
    setFreelancerAddress('');
    setTotalAmount('');
    setAgreementTerms('');
    setMilestones([{ name: '', description: '', deadline: '', payment: '' }]);
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
      <div className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold gradient-text">Smart Contracts</h1>
            <div>
              <button 
                onClick={() => setActiveTab('create')} 
                className={`px-4 py-2 mr-2 rounded-lg ${activeTab === 'create' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'}`}
              >
                Create Contract
              </button>
              <button 
                onClick={() => setActiveTab('active')} 
                className={`px-4 py-2 rounded-lg ${activeTab === 'active' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'}`}
              >
                Active Contracts
              </button>
            </div>
          </div>

          {activeTab === 'create' ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-6">
                <FaShieldAlt className="text-primary text-xl mr-3" />
                <h2 className="text-xl font-semibold">Create New Smart Contract</h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Stored on Autonomys DSN</h3>
                <p className="text-sm text-blue-700">
                  All contract data is permanently stored on Autonomys DSN for immutability and trustless verification. 
                  This is ideal for contracts requiring long-term persistence and verification.
                </p>
              </div>

              <form onSubmit={createContract}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contract Name</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g., Website Development Project"
                      value={contractName}
                      onChange={(e) => setContractName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g., 2 ETH"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Wallet Address</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g., 0x1234..."
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Freelancer Wallet Address</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g., 0x5678..."
                      value={freelancerAddress}
                      onChange={(e) => setFreelancerAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agreement Terms</label>
                  <textarea 
                    className="input min-h-[100px]" 
                    placeholder="Define the general terms and conditions of this contract..."
                    value={agreementTerms}
                    onChange={(e) => setAgreementTerms(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-lg font-medium text-gray-700">Milestones</label>
                    <button 
                      type="button" 
                      onClick={addMilestone} 
                      className="text-primary hover:text-primary-hover"
                    >
                      + Add Milestone
                    </button>
                  </div>
                  
                  {milestones.map((milestone, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Milestone {index + 1}</h3>
                        {milestones.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeMilestone(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input 
                            type="text" 
                            className="input" 
                            placeholder="e.g., Initial Design"
                            value={milestone.name}
                            onChange={(e) => updateMilestone(index, 'name', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
                          <input 
                            type="text" 
                            className="input" 
                            placeholder="e.g., 0.5 ETH"
                            value={milestone.payment}
                            onChange={(e) => updateMilestone(index, 'payment', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                          <input 
                            type="date" 
                            className="input" 
                            value={milestone.deadline}
                            onChange={(e) => updateMilestone(index, 'deadline', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <input 
                            type="text" 
                            className="input" 
                            placeholder="Description of deliverables"
                            value={milestone.description}
                            onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button type="submit" className="btn btn-primary">
                    Create Smart Contract
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Active Contracts</h2>
              <div className="grid grid-cols-1 gap-6">
                {sampleContracts.map((contract) => (
                  <div key={contract.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{contract.name}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${contract.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {contract.status === 'completed' ? 'Completed' : 'In Progress'}
                        </div>
                      </div>
                      <div className="mt-2 text-gray-600">
                        <div className="flex justify-between text-sm">
                          <span>Client: {contract.client}</span>
                          <span>Freelancer: {contract.freelancer}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span>Total: {contract.totalAmount}</span>
                          <span>Progress: {contract.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <h4 className="font-medium mb-3">Milestones</h4>
                      <div className="space-y-3">
                        {contract.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="flex items-center">
                              {milestone.status === 'completed' ? (
                                <FaCheck className="text-green-500 mr-2" />
                              ) : milestone.status === 'in-progress' ? (
                                <FaClock className="text-blue-500 mr-2" />
                              ) : (
                                <FaTimes className="text-gray-400 mr-2" />
                              )}
                              <span>{milestone.name}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 mr-4">{milestone.payment}</span>
                              {milestone.status === 'in-progress' && (
                                <button className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
                                  Mark Complete
                                </button>
                              )}
                              {milestone.status === 'pending' && contract.milestones[index - 1]?.status === 'completed' && (
                                <button className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
                                  Start Work
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 py-3 bg-gray-50 flex justify-end">
                      <Link href={`/contracts/${contract.id}`} className="text-primary hover:text-primary-hover font-medium flex items-center">
                        <FaFileContract className="mr-1" /> View Full Contract
                      </Link>
                    </div>
                  </div>
                ))}
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
