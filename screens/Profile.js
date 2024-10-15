import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../components/CredentialsContext";
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
    TextLinkContent,
    WelcomeContainer
} from './../components/styles';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [images, setimages] = useState();

    const login = () => {
        Alert.alert("You have been logged out");
        navigation.replace("Login");
    }

    // context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { name, email, handle } = storedCredentials
    const clearLogin = () => {
        AsyncStorage
            .removeItem('cfCredentials')
            .then(() => {
                setStoredCredentials("");
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://codeforces.com/api/user.info?handles=${handle}`)
            .then(function (response) {
                // handle success
                console.log(response.data.result[0]);
                let avatar = response.data.result[0].titlePhoto;
                setimages(avatar);
            })
            .catch(function (err) {
                console.log(err);
            })
    })

    return (
        <StyledContainer>
            <PageTitle>
                Profile
            </PageTitle>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={{ uri: images }} /*source={require('./../assets/cf_logo.png')}*/ />
                <PageTitle>WELCOME!</PageTitle>
                <SubTitle welcome={true}> {name || "John Doe"}</SubTitle>
                <SubTitle welcome={true}> {email || "johndoe@srmist.edu.in"}</SubTitle>
                <SubTitle welcome={true}> {handle || "johnny"}</SubTitle>
                <StyledButton onPress={login, clearLogin}>
                    <ButtonText>
                        Logout
                    </ButtonText>
                </StyledButton>
            </InnerContainer>
        </StyledContainer>
    )
}

export default Profile;