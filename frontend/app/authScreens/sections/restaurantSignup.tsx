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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={styles.subText}>Register your business</Text>

        {/* Step 1: Credentials */}
        {currentStep === 0 && (
          <View>
            <Text style={styles.stepTitle}>Step 1: Enter your restaurant's credentials</Text>
            <View style={styles.inputContainer}>
              <IconSymbol name="person.fill" size={16} color={colors.primary} />
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
              <IconSymbol name="lock.fill" size={16} color={colors.primary} />
              <TextInput
                style={{ width: '80%' }}
                placeholderTextColor="gray"
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={restaurantFormData.password}
                onChangeText={(text) =>
                  setRestaurantFormData({ ...restaurantFormData, password: text })
                }
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <IconSymbol
                  name={!showPassword ? 'eye.fill' : 'eye.slash.fill'}
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <IconSymbol name="lock.fill" size={16} color={colors.primary} />
              <TextInput
                style={{ width: '80%' }}
                placeholderTextColor="gray"
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={restaurantFormData.confirmPassword}
                onChangeText={(text) =>
                  setRestaurantFormData({ ...restaurantFormData, confirmPassword: text })
                }
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <IconSymbol
                  name={!showConfirmPassword ? 'eye.fill' : 'eye.slash.fill'}
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 2: Business Info */}
        {currentStep === 1 && (
          <View>
            <Text style={styles.stepTitle}>Step 2: Enter your restaurant's contacts</Text>
            <View style={styles.inputContainer}>
              <IconSymbol name="mail.fill" size={16} color={colors.primary} />
              <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Business Email" value={restaurantFormData.email} onChangeText={(text) => setRestaurantFormData({ ...restaurantFormData, email: text })} />
            </View>
            <View style={styles.inputContainer}>
              <IconSymbol name="phone.fill" size={16} color={colors.primary} />
              <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Phone Number" value={restaurantFormData.phone} onChangeText={(text) =>setRestaurantFormData({ ...restaurantFormData, phone: text }) } />
            </View>
            <View style={styles.inputContainer}>
                <IconSymbol name="location.fill" size={16} color={colors.primary} />
                <TextInput style={{width: '90%'}} placeholderTextColor="gray" placeholder="Governorate/state" value={restaurantFormData.address.area} onChangeText={(text) => setRestaurantFormData({...restaurantFormData, address: {...restaurantFormData.address, area: text}})} />
            </View>
            <View style={{width: '80%', marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={styles.inputContainerMinor}>
                    <IconSymbol name="signpost.right.fill" size={16} color={colors.primary} />
                    <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Street" value={restaurantFormData.address.street} onChangeText={(text) => setRestaurantFormData({...restaurantFormData, address: {...restaurantFormData.address, street: text}})} />
                </View>
                <View style={styles.inputContainerMinor}>
                    <IconSymbol name="house.fill" size={16} color={colors.primary} />
                    <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="City" value={restaurantFormData.address.city} onChangeText={(text) => setRestaurantFormData({...restaurantFormData, address: {...restaurantFormData.address, city: text}})} />
                </View>
            </View>
          </View>
        )}

{currentStep === 2 && (
  <View>
    <Text style={styles.stepTitle}>Step 3: Set your restaurant's opening hours</Text>
    {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const).map((day) => (
      <View key={day} style={[styles.inputContainer, { marginVertical: -12, alignItems: 'center' }]}>
        <Text style={{ width: '25%', fontSize: 14, color: colors.primary }}>{day}</Text>
        {/* Open Time */}
        <TextInput
          placeholder="Opening"
          placeholderTextColor="gray"
          value={restaurantFormData.openingHours[day]?.open || ''}
          style={[styles.input, { width: '35%' }]}
          keyboardType="numeric"
          maxLength={5}
          onChangeText={(text) => {
            let digits = text.replace(/[^\d]/g, '');

            if (digits.length > 4) digits = digits.slice(0, 4);
            let formatted = digits;

            if (digits.length >= 3) {
              formatted = `${digits.slice(0, 2)}:${digits.slice(2)}`;
            }

            const isValid = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formatted) || formatted.length < 5;

            if (isValid) {
              setRestaurantFormData((prev) => ({
                ...prev,
                openingHours: {
                  ...prev.openingHours,
                  [day]: {
                    ...prev.openingHours[day],
                    open: formatted,
                  },
                },
              }));
            }
          }}
        />

        {/* Close Time */}
        <TextInput
          placeholder="Closing"
          placeholderTextColor="gray"
          value={restaurantFormData.openingHours[day]?.close || ''}
          style={[styles.input, { width: '35%' }]}
          keyboardType="numeric"
          maxLength={5}
          onChangeText={(text) => {
            let digits = text.replace(/[^\d]/g, '');

            if (digits.length > 4) digits = digits.slice(0, 4);
            let formatted = digits;

            if (digits.length >= 3) {
              formatted = `${digits.slice(0, 2)}:${digits.slice(2)}`;
            }

            const isValid = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formatted) || formatted.length < 5;

            if (isValid) {
              setRestaurantFormData((prev) => ({
                ...prev,
                openingHours: {
                  ...prev.openingHours,
                  [day]: {
                    ...prev.openingHours[day],
                    close: formatted,
                  },
                },
              }));
            }
          }}
        />
      </View>
    ))}
  </View>
)}
{currentStep === 3 && (
  <View>
  <Text style={styles.stepTitle}>Step 4: Set your restaurant's specialties</Text>
  <View style={styles.inputContainerSquare}>
    <IconSymbol name="info.circle.fill" size={16} color={colors.primary} />
    <TextInput style={[styles.input, { height: '100%', textAlignVertical: 'top' }]} placeholderTextColor="gray" placeholder="Description" value={restaurantFormData.description} onChangeText={(text) =>setRestaurantFormData({ ...restaurantFormData, description: text })} multiline={true}/>
  </View>
  <Text style={styles.cuisineText}>Select your restaurant's cuisines</Text>
    <View style={{ width: '80%', marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', rowGap: 5, columnGap: 3 }}>
      {cuisineList.map((cuisine) => (
        <TouchableOpacity key={cuisine} style={{ backgroundColor: restaurantFormData.cuisines.includes(cuisine) ? colors.primary : '#fff', padding: 6, paddingHorizontal: 8, borderRadius: 10, alignItems: 'center', flexDirection: 'row', gap: 8,}}
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
          }}>
          <View
            style={{
              width: 11,
              height: 11,
              borderRadius: 7,
              backgroundColor: restaurantFormData.cuisines.includes(cuisine)
                ? 'white'
                : colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {restaurantFormData.cuisines.includes(cuisine) && (
              <IconSymbol name="checkmark" size={10} color={colors.primary} />
            )}
          </View>
          <Text
            style={{
              color: restaurantFormData.cuisines.includes(cuisine) ? 'white' : 'black',
              fontSize: 12,
            }}
          >
            {cuisine}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)}

        {/* Navigation Buttons */}
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
            onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
          >
            <IconSymbol name="chevron.left" size={15} color="white" />
            <Text style={{ color: 'white', fontSize: 14 }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stepButton}
            onPress={() => setCurrentStep(Math.min(3, currentStep + 1))}
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
    alignItems: 'center',
    paddingVertical: 0,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainerMinor: {
    height: 40,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0.5,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: '48%',
    paddingHorizontal: 10,
    paddingVertical: 0,
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
    paddingVertical: 0,
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
