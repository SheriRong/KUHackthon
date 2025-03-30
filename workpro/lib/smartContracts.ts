/**
 * Smart Contract Integration for WorkPro
 * 
 * This file provides functions to interact with smart contracts
 * for job agreements between clients and freelancers.
 */

import { storeOnAutonomys, retrieveFromAutonomys } from './autonomys';

export interface Milestone {
  name: string;
  description: string;
  deadline: string;
  payment: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'disputed';
}

export interface SmartContract {
  id: string;
  name: string;
  client: string; // wallet address
  freelancer: string; // wallet address
  totalAmount: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled' | 'disputed';
  progress: number;
  milestones: Milestone[];
  createdAt: string;
  terms: string;
  autonomysCid?: string; // Autonomys DSN content identifier
}

/**
 * Creates a new smart contract for a job agreement
 * @param contractData - Contract details
 * @returns The created contract with its ID
 */
export async function createSmartContract(contractData: Omit<SmartContract, 'id' | 'createdAt' | 'autonomysCid' | 'progress'>) {
  // Generate a unique ID
  const id = 'contract-' + Math.random().toString(36).substring(2, 15);
  
  // Create the contract object
  const contract: SmartContract = {
    ...contractData,
    id,
    createdAt: new Date().toISOString(),
    progress: 0,
  };
  
  // Store contract on Autonomys DSN
  const autonomysResult = await storeOnAutonomys(contract, {
    collection: 'contracts',
    metadata: {
      contractId: id,
      clientAddress: contractData.client,
      freelancerAddress: contractData.freelancer,
    }
  });
  
  // Update contract with Autonomys CID
  const finalContract: SmartContract = {
    ...contract,
    autonomysCid: autonomysResult.cid,
  };
  
  // In a real application, you would also deploy an actual smart contract to the blockchain
  // For this demo, we'll just store it in local storage
  saveContractToLocalStorage(finalContract);
  
  return finalContract;
}

/**
 * Updates the status of a milestone in a contract
 * @param contractId - ID of the contract
 * @param milestoneIndex - Index of the milestone to update
 * @param status - New status for the milestone
 * @returns The updated contract
 */
export async function updateMilestoneStatus(
  contractId: string,
  milestoneIndex: number,
  status: Milestone['status']
) {
  // Get the contract
  const contract = getContractFromLocalStorage(contractId);
  if (!contract) {
    throw new Error(`Contract with ID ${contractId} not found`);
  }
  
  // Update the milestone status
  const updatedMilestones = [...contract.milestones];
  updatedMilestones[milestoneIndex] = {
    ...updatedMilestones[milestoneIndex],
    status,
  };
  
  // Calculate new progress
  const completedMilestones = updatedMilestones.filter(m => m.status === 'completed').length;
  const progress = Math.round((completedMilestones / updatedMilestones.length) * 100);
  
  // Update contract status if all milestones are completed
  let contractStatus = contract.status;
  if (progress === 100) {
    contractStatus = 'completed';
  }
  
  // Update the contract
  const updatedContract: SmartContract = {
    ...contract,
    milestones: updatedMilestones,
    progress,
    status: contractStatus,
  };
  
  // Store the updated contract on Autonomys DSN
  const autonomysResult = await storeOnAutonomys(updatedContract, {
    collection: 'contracts',
    metadata: {
      contractId,
      action: 'milestone-update',
      milestoneIndex,
      status,
    }
  });
  
  // Update contract with new Autonomys CID
  const finalContract: SmartContract = {
    ...updatedContract,
    autonomysCid: autonomysResult.cid,
  };
  
  // Save the updated contract
  saveContractToLocalStorage(finalContract);
  
  return finalContract;
}

/**
 * Get all contracts for a user (either as client or freelancer)
 * @param walletAddress - User's wallet address
 * @returns List of contracts where the user is involved
 */
export function getUserContracts(walletAddress: string): SmartContract[] {
  try {
    // Get all contracts from local storage
    const allContracts = getAllContractsFromLocalStorage();
    
    // Filter contracts where the user is either client or freelancer
    return allContracts.filter(
      contract => contract.client === walletAddress || contract.freelancer === walletAddress
    );
  } catch (error) {
    console.error('Error getting user contracts:', error);
    return [];
  }
}

// Helper functions for local storage

function saveContractToLocalStorage(contract: SmartContract) {
  try {
    // Get existing contracts
    const contracts = getAllContractsFromLocalStorage();
    
    // Find if this contract already exists
    const index = contracts.findIndex(c => c.id === contract.id);
    
    if (index !== -1) {
      // Update existing contract
      contracts[index] = contract;
    } else {
      // Add new contract
      contracts.push(contract);
    }
    
    // Save to local storage
    localStorage.setItem('workpro_contracts', JSON.stringify(contracts));
  } catch (error) {
    console.error('Error saving contract to local storage:', error);
  }
}

function getContractFromLocalStorage(contractId: string): SmartContract | null {
  try {
    const contracts = getAllContractsFromLocalStorage();
    return contracts.find(c => c.id === contractId) || null;
  } catch (error) {
    console.error('Error getting contract from local storage:', error);
    return null;
  }
}

function getAllContractsFromLocalStorage(): SmartContract[] {
  try {
    const contractsJson = localStorage.getItem('workpro_contracts');
    return contractsJson ? JSON.parse(contractsJson) : [];
  } catch (error) {
    console.error('Error getting all contracts from local storage:', error);
    return [];
  }
}
