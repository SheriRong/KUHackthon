import axios from 'axios';

export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export class PinataService {
  private apiKey: string;
  private apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async uploadFile(file: File): Promise<PinataResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<PinataResponse>(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: this.apiKey,
            pinata_secret_api_key: this.apiSecret,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      throw new Error('Failed to upload file to Pinata');
    }
  }

  async getFile(hash: string): Promise<Blob> {
    try {
      const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${hash}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching file from Pinata:', error);
      throw new Error('Failed to fetch file from Pinata');
    }
  }
} 