import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '@/app/styles/colors';
import useChatbotSocket from '@/hooks/useChatBot';
import ChatBoxBot from '../components/chatBoxBot';
const logo = require('@/assets/images/robot.png');

export default function ChatBotChat() {
  const [chatData, setChatData] = useState<{flag: boolean, message: string}[]>([]);
  const [messageText, setMessageText] = useState('');
  const lastMessageRef = useRef('');
  const scrollViewRef = useRef<ScrollView | null>(null);
  const ws = useChatbotSocket({setChatData});

  const sendMessage = () => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) {
      console.warn('Cannot send an empty message');
      return;
    }

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: 'ai',
          data: {
            prompt: trimmedMessage,
          },
        })
      );
      lastMessageRef.current = trimmedMessage;
      setChatData((prev) => [...prev, {flag: false, message: trimmedMessage}]);
      setMessageText('');
    } else {
      console.error('WebSocket is not open. Unable to send message. readyState:', ws.current?.readyState);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [chatData]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={{ width: 40, height: 40, borderRadius: 20 }} />
          <Text style={{ fontSize: 22, color: '#fff', fontWeight: '600' }}>aklny</Text>
        </View>
        <ScrollView style={styles.messagesBody} ref={scrollViewRef}>
          {chatData.map((message: {flag: boolean, message: string}, index: number) => (
            <ChatBoxBot key={index} flag={message.flag} message={message.message} />
          ))}
        </ScrollView>
        <View style={styles.sendAreaBody}>
          <TextInput
            placeholder="Type a message..."
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
            style={{
              backgroundColor: colors.background,
              padding: 10,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: colors.primary,
              width: '90%',
            }}
          />
          <MaterialIcons onPress={sendMessage} name="send" size={24} color="white" />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.primary,
    gap: 10
  },
  messagesBody: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
  sendAreaBody: {
    backgroundColor: colors.primary,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});