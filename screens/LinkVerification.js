import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyledContainer, TopHalf, BottomHalf, IconBg, Colors, PageTitle, InfoText, EmphasizeText, StyledButton, ButtonText, InlineGroup, TextLinkContent } from '../components/styles';

import { Octicons, Ionicons } from '@expo/vector-icons';

const { brand, primary, green } = Colors;

import { View } from 'react-native';

import ResendTimer from './../components/ResendTimer';

// api client
import axios from 'axios';

// api route
import { baseAPIUrl } from '../components/shared';
import { CommonActions } from '@react-navigation/routers';

const Verification = ({ navigation, route }) => {
    const [resendingEmail, setResendingEmail] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');

    // resend timer
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);

    const [activeResend, setActiveResend] = useState(false);
    let resendTimerInterval;

    const { email, userId, fakeLastName } = route?.params;

    const calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if (difference >= 0) {
            setTimeLeft(Math.round(difference / 1000));
        } else {
            setTimeLeft(null);
            clearInterval(resendTimerInterval);
            setActiveResend(true);
        }
    }

    const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
        setActiveResend(false);
        const finalTime = +new Date() + targetTimeInSeconds * 1000;
        resendTimerInterval = setInterval(() => (
            calculateTimeLeft(finalTime), 1000
        ))
    }

    useEffect(() => {
        triggerTimer();

        return () => {
            clearInterval(resendTimerInterval);
        };
    }, []);

    const resendEmail = async () => {
        setResendingEmail(true);
        // make request
        const url = `${baseAPIUrl}/user/resendVerificationLink`;
        try {
            await axios.post(url, { email, userId });
            setResendStatus('Sent!');
        } catch (err) {
            setResendStatus('Failed!');
            alert(`Resending email failed! ${err.message}`);
        }
        setResendingEmail(false);
        // hold on message
        setTimeout(() => {
            setResendStatus('Resend');
            setActiveResend(false);
            triggerTimer();
        }, 3000);
    }

    return (
        <StyledContainer
            style={{
                alignItems: 'center'
            }}
        >
            <TopHalf>
                <IconBg>
                    <StatusBar style="dark" />
                    <Octicons name="mail-read" size={125} color={brand} />
                </IconBg>
            </TopHalf>
            <BottomHalf>
                <PageTitle style={{ fontSize: 25 }}>Account Verification</PageTitle>
                <InfoText>
                    Please verify your email using the link sent to
                    <EmphasizeText> {`${email}`} </EmphasizeText>
                    and please change your CodeForces Account lastname to
                    <EmphasizeText> {`${fakeLastName}`} </EmphasizeText>
                    for authorization purposes. Once Logged in you can revert back.
                </InfoText>

                <StyledButton
                    onPress={() => {
                        // navigation.navigate('Login', { email: email });
                        navigation.dispatch(
                            CommonActions.reset({
                                routes: [
                                    {
                                        name: 'Login',
                                        params: { email: email },
                                    },
                                ],
                            })
                        );
                    }}
                    style={{ backgroundColor: green, flexDirection: 'row' }}
                >
                    <ButtonText>Proceed </ButtonText>
                    <Ionicons name="arrow-forward-circle" size={25} color={primary} />
                </StyledButton>
                <ResendTimer
                    activeResend={activeResend}
                    resendingEmail={resendingEmail}
                    resendStatus={resendStatus}
                    timeLeft={timeLeft}
                    targetTime={targetTime}
                    resendEmail={resendEmail}
                />
            </BottomHalf>
        </StyledContainer>
    );
};

export default Verification;