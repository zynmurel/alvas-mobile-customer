
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import twrnc from 'twrnc';
import { baseUrl } from '../helpers/endpoint';
import { useUserStore } from '../helpers/zustand/user';

function ProductsScreen({ navigation }: any) {
    const {user} = useUserStore()
    return (
        <View style={twrnc` h-full w-full overflow-scroll`}>
        <WebView
          style={styles.container}
          source={{ uri: `${baseUrl}/customer/basket/${user?.user_id}` }}
        />
        </View>
    );
}

function OrdersScreen({ navigation }: any) {
    const {user} = useUserStore()
    return (
        <View style={twrnc` h-full w-full overflow-scroll`}>
        <WebView
          style={styles.container}
          source={{ uri: `${baseUrl}/customer/orders/${user?.user_id}` }}
        />
        </View>
    );
}

function AccountScreen({ navigation }: any) {
    const {user} = useUserStore()
    return (
        <View style={twrnc` h-full w-full overflow-scroll`}>
        <WebView
          style={styles.container}
          source={{ uri: `${baseUrl}/customer/account/${user?.user_id}` }}
        />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function CustomerScreen() {
    return (
        <Drawer.Navigator initialRouteName="Basket">
            <Drawer.Screen name="Basket" component={ProductsScreen} />
            <Drawer.Screen name="Orders" component={OrdersScreen} />
            <Drawer.Screen name="Account" component={AccountScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"auto",
    width:"auto"
  },
});