import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';

import { Octicons, Ionicons } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './../components/styles';
import { Alert, View, ActivityIndicator } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// API Client
import axios from 'axios';
import { baseAPIUrl } from '../components/shared';
import { CommonActions, StackActions } from '@react-navigation/routers';

//Colors
const { brand, darkLight, primary } = Colors;

const Signup = ({ navigation }) => {
    const login = () => {
        Alert.alert("Login to Continue..");
        navigation.goBack();
    }
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    // const login = () => Alert.alert("Hello World")
    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = `${baseAPIUrl}/user/signup`;
        // const url = baseAPIUrl+"/user/signup";
        axios.post(url, credentials)
            .then((response) => {
                const result = response.data;
                const { message, status, data } = result;
                setSubmitting(false);
                if (status !== 'PENDING') {
                    handleMessage(message, status);
                } else {
                    // console.log("lets take a peek at the data:\n"+{...data}) // giving undefined (How 2 fix?)

                    // navigation.navigate('Verification', {...data});
                    // navigation.dispatch(
                    //     StackActions.replace('Verification', {...data})
                    // );
                    navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                {
                                    name: 'Verification',
                                    params: { ...data },
                                },
                            ],
                        })
                    );

                    // navigation.replace('Welcome', {...data[0]});
                    // navigation.navigate('Welcome', {...data[0]});

                    // Alert.alert("Signup Successful. You can now Login");
                    // navigation.goBack();
                }
            })
            .catch(error => {
                console.log(error);
                setSubmitting(false);
                handleMessage("An error occurred. Check your network and try again");
            })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    {/* <PageLogo resizeMode="cover" source={require('./../assets/cf_logo.png')} /> */}
                    <PageTitle>CodeForces</PageTitle>
                    <SubTitle>Account Signup</SubTitle>

                    <Formik
                        initialValues={{ name: '', email: '', handle: '', password: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            if (values.name == '' || values.email == '' || values.handle == '' || values.password == '') {
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            } else {
                                handleSignup(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Name"
                                    icon="person"
                                    placeholder="John Doe"
                                    placeholderTextColr={darkLight}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                <MyTextInput
                                    label="College Email Address"
                                    icon="mail"
                                    placeholder="johndoe@srmist.edu.in"
                                    placeholderTextColr={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                <MyTextInput
                                    label="CodeForces Handle Name"
                                    icon="mail"
                                    placeholder="johndoe"
                                    placeholderTextColr={darkLight}
                                    onChangeText={handleChange('handle')}
                                    onBlur={handleBlur('handle')}
                                    value={values.handle}
                                />
                                <MyTextInput
                                    label="Create Password"
                                    icon="lock"
                                    placeholder="* * * * * * * * *"
                                    placeholderTextColr={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>

                                {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Signup
                                    </ButtonText>
                                </StyledButton>)}

                                {isSubmitting && (<StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>)}

                                {/* <StyledButton onPress={handleSubmit,login}>
                                    <ButtonText>
                                        Signup
                                    </ButtonText>
                                </StyledButton> */}
                                {/* <Line /> */}
                                {/* <ExtraView>
                                    <ExtraText>Already have an account? </ExtraText>
                                    <TextLink>
                                        <TextLinkContent>Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView> */}
                            </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;