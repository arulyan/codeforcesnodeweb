import React, { useState, useContext, useEffect } from 'react';
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
    TextLinkContent,
    WelcomeContainer
} from './../components/styles';
import { Alert, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/CredentialsContext';
import axios from 'axios';
import Leaderboard from './Leaderboard';
import Analysis from './Analysis';
import PreviousContest from './PreviousContest';
import Profile from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../components/Icons';

//Colors
const { brand, darkLight } = Colors;

//Tabs
const TabArr = [
    { route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'trophy', inActiveIcon: 'trophy-outline', component: Leaderboard },
    { route: 'List', label: 'List', type: Ionicons, activeIcon: 'rocket', inActiveIcon: 'rocket-outline', component: PreviousContest },
    { route: 'Search', label: 'Search', type: Ionicons, activeIcon: 'bonfire', inActiveIcon: 'bonfire-outline', component: Analysis },
    { route: 'Account', label: 'Account', type: Ionicons, activeIcon: 'person', inActiveIcon: 'person-outline', component: Profile }
]

const Tab = createBottomTabNavigator();

const Welcome = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                //    position: 'absolute',
                //     bottom: 16,
                //     right: 16,
                //     left: 16,
                    borderRadius: 10
                }
            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen name={item.route} component={item.component} key={item}
                        options={{
                            tabBarShowLabel: false,
                            // tabBarLabel: item.label,
                            tabBarIcon: ({ color, focused }) => (
                                <Icon size={25} type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={color} />
                            )
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    )
}


export default Welcome;