import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function ChatBoxBot({flag, message}: {flag: boolean, message: string}) {
    console.log('ChatBoxBot - flag:', flag, 'message:', message);
    return (
        <View style={{ flexDirection: 'row', justifyContent: flag? 'flex-start' : 'flex-end', padding: 10 }}>
        <View style={!flag ? styles.containerOriginal : styles.containerOther}>
            <View style={!flag ? styles.senderMessage : styles.receiverMessage}>
                <Text style={!flag ? styles.senderText : styles.receiverText}>{message}</Text>
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