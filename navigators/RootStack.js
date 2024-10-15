import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Verification from '../screens/LinkVerification';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';
import Standings from '../screens/Standings';

const Stack = createNativeStackNavigator();
const MyTheme = {
    dark: false,
    colors: {
        background: 'white',
        card: 'white',
        border: 'white',
        notification: 'white'
    },
};
const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer theme={MyTheme}>
                    <Stack.Navigator initialRouteName="Login" /*screenOptions={{headerShown: false}}*/
                        screenOptions={{
                            // headerTintColor: 'white'
                            headerTitle: '',
                            headerShadowVisible: false
                        }}
                    >
                        {storedCredentials ?
                            (<>
                            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}} />
                            <Stack.Screen name="Standings" component={Standings} />
                            </>)
                            : (<>
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Signup" component={Signup} />
                                <Stack.Screen name="Verification" component={Verification} />
                            </>)
                        }


                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>

    )
}

export default RootStack;