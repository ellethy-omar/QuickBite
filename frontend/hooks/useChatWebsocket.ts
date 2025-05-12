import { useEffect, useRef } from 'react';
import { ChatDriver, ChatMessage } from '@/app/types/chat';
import { refreshAuthToken, isTokenExpired } from '@/app/utils/authHelpers';
import * as SecureStore from 'expo-secure-store';

interface UseWebSocketProps {
  chatData: ChatDriver;
  setChatData: React.Dispatch<React.SetStateAction<ChatDriver>>;
  lastMessageRef: React.RefObject<string>;
  role?: 'user' | 'driver';
}

export default function useChatWebSocket({ chatData, setChatData, lastMessageRef, role = 'driver' }: UseWebSocketProps) {
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

        const endpoint = role === 'user' ? 'user' : 'driver';
        ws.current = new WebSocket(`wss://quickbite.zapto.org/${endpoint}?token=${token}`);

        ws.current.onopen = () => {
          console.log('🔌 WebSocket connection opened for', endpoint);
          ws.current?.send(
            JSON.stringify({
              type: 'chatInit',
              data: {
                [role === 'user' ? 'driverId' : 'userId']: chatData.receiverId,
                orderId: chatData.orderId,
              },
            })
          );
          console.log('📤 Sent chatInit:', {
            type: 'chatInit',
            data: {
              [role === 'user' ? 'driverId' : 'userId']: chatData.receiverId,
              orderId: chatData.orderId,
            },
          });
        };

        ws.current.onmessage = (event) => {
          console.log('📩 WebSocket message received:', event.data);
          const data = JSON.parse(event.data);

          if (data.type === 'messageSent') {
            const { senderId, messageId, timestamp } = data.data;
            const incomingMessage: ChatMessage = {
              message: lastMessageRef?.current ?? '',
              ownerId: senderId,
              id: messageId,
              timestamp,
              isRead: false,
            };

            setChatData((prev) => ({
              ...prev,
              messages: [...prev.messages, incomingMessage],
            }));
          } else if (data.type === 'chat_initialized') {
            setChatData({
              ...chatData,
              id: data.data.chatId,
              messages: data.data.messages.map((msg) => ({
                id: msg._id,
                message: msg.content,
                ownerId: msg.senderId,
                timestamp: msg.createdAt,
                isRead: msg.isRead,
              })),
            });
          } else if (data.type === 'newMessage') {
            const messageData = data.data.message;
            const incomingMessage: ChatMessage = {
              message: messageData.content,
              ownerId: messageData.senderId,
              id: messageData._id,
              timestamp: messageData.createdAt,
              isRead: false,
            };

            setChatData((prev) => ({
              ...prev,
              messages: [...prev.messages, incomingMessage],
            }));
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