import * as SecureStore from 'expo-secure-store';
import { useNavigation } from 'expo-router';
import { useNotification } from '@/app/context/notificationContext';

const useHandleLogout = () => {
  const navigation = useNavigation();
  const { showNotification } = useNotification();

  const handleLogout = async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync('jwtToken');
      await SecureStore.deleteItemAsync('savedEmail');
      await SecureStore.deleteItemAsync('savedPassword');
      await SecureStore.deleteItemAsync('savedAccType');

      navigation.navigate('authScreens/login' as never);

      showNotification('Logged out successfully!', 'success');
    } catch (error) {
      showNotification('Error logging out, please try again.', 'error');
    }
  };

  return handleLogout;
};

export default useHandleLogout;