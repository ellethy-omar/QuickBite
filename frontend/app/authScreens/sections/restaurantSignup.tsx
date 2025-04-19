import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { RestaurantFormData } from '@/app/types/authTypes';
import colors from '../../styles/colors';
import cuisineList from '@/constants/cuisineList';

export default function RestaurantSignup({
  restaurantFormData,
  setRestaurantFormData,
}: {
  restaurantFormData: RestaurantFormData;
  setRestaurantFormData: React.Dispatch<React.SetStateAction<RestaurantFormData>>;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ width: '100%', justifyContent: 'center', alignItems: 'center'}}
      >
        <Text style={styles.subText}>Register your business</Text>
        {currentStep === 0 && (
          <View>
            <Text style={styles.stepTitle}>Step 1: Enter your restaurant's credentials</Text>
            <View style={styles.inputContainer}>
              <IconSymbol name="person.fill" size={16} color={colors.primary} style={{ marginTop: 5 }} />
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                placeholder="Restaurant Name"
                value={restaurantFormData.name}
                onChangeText={(text) =>
                  setRestaurantFormData({ ...restaurantFormData, name: text })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <IconSymbol name="mail.fill" size={16} color={colors.primary} style={{ marginTop: 6 }} />
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                placeholder="Business Email"
                value={restaurantFormData.email}
                onChangeText={(text) =>
                  setRestaurantFormData({ ...restaurantFormData, email: text })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <IconSymbol name="lock.fill" size={16} color={colors.primary} style={{ marginTop: 5 }} />
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                placeholder="Password"
                secureTextEntry
                value={restaurantFormData.password}
                onChangeText={(text) =>
                  setRestaurantFormData({ ...restaurantFormData, password: text })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <IconSymbol name="lock.fill" size={16} color={colors.primary} style={{ marginTop: 5 }} />
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                placeholder="Confirm Password"
                secureTextEntry
                value={restaurantFormData.confirmPassword}
                onChangeText={(text) =>
                  setRestaurantFormData({ ...restaurantFormData, confirmPassword: text })
                }
              />
            </View>
          </View>
        )}
        {currentStep === 1 && (
          <View>
            <Text style={styles.stepTitle}>Step 2: Enter your restaurant's data</Text>
            <View style={styles.inputContainer}>
              <IconSymbol name="phone.fill" size={16} color={colors.primary} style={{ marginTop: 5 }} />
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                placeholder="Phone Number"
                value={restaurantFormData.phone}
                onChangeText={(text) =>
                  setRestaurantFormData({ ...restaurantFormData, phone: text })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <IconSymbol name="location.fill" size={16} color={colors.primary} style={{ marginTop: 7 }} />
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                placeholder="Address"
                value={restaurantFormData.address}
                onChangeText={(text) =>
                  setRestaurantFormData({ ...restaurantFormData, address: text })
                }
              />
            </View>
            <View style={styles.inputContainerSquare}>
              <IconSymbol name="info.circle.fill" size={16} color={colors.primary} style={{ marginTop: 5 }} />
              <TextInput
                style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
                placeholderTextColor="gray"
                placeholder="Description"
                value={restaurantFormData.description}
                onChangeText={(text) =>
                  setRestaurantFormData({ ...restaurantFormData, description: text })
                }
                multiline={true}
              />
            </View>
            <Text style={styles.cuisineText}>Select your restaurant's cuisines</Text>
            <View style={{ width: '80%', marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', rowGap: 5, columnGap: 3 }}>
                {cuisineList.map((cuisine) => (
                    <TouchableOpacity
                      key={cuisine}
                      style={{
                        backgroundColor: restaurantFormData.cuisines.includes(cuisine) ? colors.primary : '#fff',
                        padding: 6,
                        paddingHorizontal: 8,
                        borderRadius: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 8,
                      }}
                      onPress={() => {
                        if (restaurantFormData.cuisines.includes(cuisine)) {
                          setRestaurantFormData({
                            ...restaurantFormData,
                            cuisines: restaurantFormData.cuisines.filter((c) => c !== cuisine),
                          });
                        } else {
                          setRestaurantFormData({
                            ...restaurantFormData,
                            cuisines: [...restaurantFormData.cuisines, cuisine],
                          });
                        }
                      }}
                    >
                      <View
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: 7,
                          backgroundColor: restaurantFormData.cuisines.includes(cuisine) ? 'white' : colors.primary,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {restaurantFormData.cuisines.includes(cuisine) && (
                          <IconSymbol name="checkmark" size={10} color={colors.primary} />
                        )}
                      </View>
                      <Text style={{ color: restaurantFormData.cuisines.includes(cuisine) ? 'white' : 'black', fontSize: 12 }}>
                        {cuisine}
                      </Text>
                    </TouchableOpacity>
                ))}
            </View>
          </View>
        )}
        <View
          style={{
            width: '100%',
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.stepButton}
            onPress={() => setCurrentStep(0)}
          >
            <IconSymbol name="chevron.left" size={15} color="white" />
            <Text style={{ color: 'white', fontSize: 14 }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stepButton}
            onPress={() => setCurrentStep(1)}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>Next</Text>
            <IconSymbol name="chevron.right" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 0.5,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainerSquare: {
    marginTop: 20,
    height: 80,
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 0.5,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  subText: {
    fontSize: 14,
    color: colors.primary,
    marginVertical: 12,
    textAlign: 'center',
  },
  stepTitle: {
    fontWeight: '600',
    color: colors.primary,
    fontSize: 15,
    marginTop: 10,
    width: '80%',
  },
  input: {
    width: '90%',
  },
  cuisineText: {
    fontWeight: '500',
    color: colors.primary,
    fontSize: 15,
    marginTop: 20,
  },
  stepButton: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
});
