import { useEffect, useRef } from 'react';
import { refreshAuthToken, isTokenExpired } from '@/app/utils/authHelpers';
import * as SecureStore from 'expo-secure-store';

interface UseWebSocketProps {
  setChatData: React.Dispatch<React.SetStateAction<{flag: boolean, message: string}[]>>;
}

export default function useChatbotSocket({setChatData}: UseWebSocketProps) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
          let token = "";
          token = await SecureStore.getItemAsync('jwtToken') || '';
          console.log('🔑 JWT token:', token ? `${token.slice(0, 20)}... (length: ${token.length})` : 'Missing');
          if (!token) throw new Error('No token found');
          if (isTokenExpired(token)) {
            console.log('🔑 Token expired, refreshing...');
            token = await refreshAuthToken() || '';
            console.log('🔑 Refreshed token:', token ? `${token.slice(0, 20)}... (length: ${token.length})` : 'Failed');
          }

        ws.current = new WebSocket(`wss://quickbite.zapto.org/user?token=${token}`);

        ws.current.onopen = () => {
          ws.current?.send(
            JSON.stringify({
              type: 'ai',
              data: {
                prompt: 'Hello, chatbot!',
              },
            })
          );
        };

        ws.current.onmessage = (event) => {
          console.log('📩 WebSocket message received:', event.data);
          const data = JSON.parse(event.data);

          if (data.type === 'aiResponse') {
            const newMessage = {
                flag: true,
                message: data.data,
            };

            setChatData((prev) => [...prev, newMessage]);
            
          } else {
            console.warn('Unhandled WebSocket message type:', data.type);
          }
        };

        ws.current.onerror = (error) => {
          console.error('🔌 WebSocket error:', error);
        };

        ws.current.onclose = (event) => {
          console.log('🔌 WebSocket connection closed:', { code: event.code, reason: event.reason });
        };
      } catch (error) {
        console.error('Error connecting WebSocket:', error);
      }
    };

    connectWebSocket();

    return () => {
      ws.current?.close();
    };
  }, []);

  return ws;
}