import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import { ChatMessage } from '../types/chat';

export default function ChatBox({receiver, message}: {receiver: string, message: ChatMessage}) {

    return (
        <View style={{ flexDirection: 'row', justifyContent: receiver === message.ownerId ? 'flex-start' : 'flex-end', padding: 10 }}>
        <View style={message.ownerId !== receiver ? styles.containerOriginal : styles.containerOther}>
            <View style={message.ownerId !== receiver ? styles.senderMessage : styles.receiverMessage}>
                <Text style={message.ownerId !== receiver ? styles.senderText : styles.receiverText}>{message.message}</Text>
                <Text style={[message.ownerId !== receiver ? styles.senderText : styles.receiverText, {fontWeight: "400", fontSize: 10}]}>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerOriginal: {
        backgroundColor: colors.primary,
        maxWidth: '80%',
        padding: 5,
        borderRadius: 10,
        borderTopRightRadius: 0,
    },
    containerOther: {
        backgroundColor: colors.secondary,
        maxWidth: '80%',
        padding: 5,
        borderRadius: 10,
        borderTopLeftRadius: 0,
    },
    senderMessage: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
        alignSelf: 'flex-end',
        gap: 5,
    },
    receiverMessage: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        padding: 10,
        alignSelf: 'flex-start',
        gap: 5,
    },
    senderText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
    },
    receiverText: {
        color: '#000',
        fontSize: 13,
        fontWeight: '500',
    },
});