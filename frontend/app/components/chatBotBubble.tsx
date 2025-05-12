import React, { useRef } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
} from 'react-native';
import { useNavigation } from 'expo-router';
import colors from '../styles/colors';

const logo = require('@/assets/images/robot.png');

const ChatBotBubble = () => {
  const pan = useRef(new Animated.ValueXY({ x: 20, y: 100 })).current;
  const navigation = useNavigation();

  const gestureStartTime = useRef(0);
  const isDragging = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        gestureStartTime.current = Date.now();
        isDragging.current = false;

        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5) {
          isDragging.current = true;
        }

        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();

        const gestureDuration = Date.now() - gestureStartTime.current;

        if (!isDragging.current && gestureDuration < 200) {
          // Short tap: navigate
          navigation.navigate('_chatutils/chatBotChat');
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.bubble,
        {
          transform: pan.getTranslateTransform(),
        },
      ]}
    >
      <Image source={logo} style={styles.bubbleLogo} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 20,
    zIndex: 1000,
  },
  bubbleLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ChatBotBubble;
