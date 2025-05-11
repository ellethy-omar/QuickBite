import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ChatMessage } from '../types/chat';
import ChatBox from '../components/chatBox';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import useChatWebSocket from '@/hooks/useChatWebsocket';

export default function UserDriverChat() {
    const { chat } = useLocalSearchParams();
    const [chatData, setChatData] = useState(JSON.parse(chat));
    const [messageText, setMessageText] = useState('');
    const lastMessageRef = useRef('');
    const scrollViewRef = useRef<ScrollView | null>(null);
    const ws = useChatWebSocket({ chatData, setChatData, lastMessageRef });

    

    const sendMessage = () => {
        const trimmedMessage = messageText.trim();
        if (!trimmedMessage) {
            console.warn('Cannot send an empty message');
            return;
        }

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(
                JSON.stringify({
                    type: 'chatSend',
                    data: {
                        chatId: chatData.id,
                        content: trimmedMessage,
                    },
                })
            );

        lastMessageRef.current = trimmedMessage;
        setMessageText('');
        } else {
            console.error('WebSocket is not open. Unable to send message.');
        }
    };

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd();
        }
    }, [chatData.messages]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 22, color: '#fff', fontWeight: '600' }}>Chat</Text>
                </View>
                <ScrollView style={styles.messagesBody} ref={scrollViewRef}>
                    {chatData.messages.map((message : ChatMessage, index: number) => (
                        <ChatBox key={index} receiver={chatData.receiverId} message={message} />
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
