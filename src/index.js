import AppLoading from 'expo-app-loading';
import React, { createRef } from 'react';
import { default as RootNavigator } from '_navigations';
import { GlobalContext } from '_services';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Global } from '_services';

Global.firebaseApp();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

let CUSTOM_FONTS = {
    'AcuminVariableConcept': require('./assets/fonts/AcuminVariableConcept.ttf'),
    'MyriadProRegular'     : require('./assets/fonts/MyriadProRegular.otf'),
    'RobotoLight'          : require('./assets/fonts/RobotoLight.ttf'),
};

class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            pushToken: '',
            notification: false,
        }

        this.notificationListener = createRef();
        this.responseListener = createRef();
    }

    componentDidMount() {
        this._loadFontsAsync();
        this._loadNotificationModule();
    }

    async registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            console.log('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
      
        return token;
      }

    async _loadNotificationModule() {
        this.registerForPushNotificationsAsync().then((token) => {
            this.setState({
                pushToken: token,
            })
        });

        this.notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        this.responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(this.notificationListener.current);
            Notifications.removeNotificationSubscription(this.responseListener.current);
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(CUSTOM_FONTS);
        this.setState({
            isReady: true,
        });
    }

    render() {
        return (
            <GlobalContext>
                {this.state.isReady == false ? <AppLoading /> : <RootNavigator />}
            </GlobalContext>
        );
    }
}


export default App;