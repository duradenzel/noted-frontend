import axios, { AxiosResponse } from 'axios';

interface BackendConnectProps {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any; 
  onSuccess: (response: AxiosResponse) => void;
  onError: (error: any) => void;
}

const BackendConnect: React.FC<BackendConnectProps> = ({ url, method, data, onSuccess, onError }) => {
  const fetchData = async () => {
    try {
      let response;
      switch (method) {
        case 'GET':
          response = await axios.get(url);
          break;
        case 'POST':
          response = await axios.post(url, data);
          break;
        case 'PUT':
          response = await axios.put(url, data);
          break;
        case 'DELETE':
          response = await axios.delete(url);
          break;
        default:
          throw new Error('Unsupported method');
      }
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  };

  fetchData(); 

  return null; 
};

export default BackendConnect;
