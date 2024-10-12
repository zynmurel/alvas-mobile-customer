
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import twrnc from 'twrnc';
import { baseUrl } from '../helpers/endpoint';
import { useUserStore } from '../helpers/zustand/user';
import { Image } from 'expo-image';
import Feather from '@expo/vector-icons/Feather';
import { logout } from '../helpers/utils/logout';
import { TouchableOpacity } from 'react-native-gesture-handler';
const injectedJavaScript = `
const meta = document.createElement('meta');
meta.setAttribute('name', 'viewport');
meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
document.getElementsByTagName('head')[0].appendChild(meta);
`;
function ProductsScreen({ navigation }: any) {
  const { user } = useUserStore()
  return (
    <View style={twrnc` h-full w-full overflow-scroll bg-red-100`}>
      <WebView
        style={styles.container}
        source={{ uri: `${baseUrl}/customer/basket/${user?.user_id}` }}
        scalesPageToFit={false} // For Android
        javaScriptEnabled={true}
        injectedJavaScript={injectedJavaScript} // For iOS
      />
    </View>
  );
}

function OrdersScreen({ navigation }: any) {
  const { user } = useUserStore()
  return (
    <View style={twrnc` h-full w-full overflow-scroll`}>
      <WebView
        style={styles.container}
        source={{ uri: `${baseUrl}/customer/orders/${user?.user_id}` }}
        scalesPageToFit={false} // For Android
        javaScriptEnabled={true}
        injectedJavaScript={injectedJavaScript} // For iOS
      />
    </View>
  );
}

function AccountScreen({ navigation }: any) {
  const { user } = useUserStore()
  return (
    <View style={twrnc` h-full w-full overflow-scroll`}>
      <WebView
        style={styles.container}
        source={{ uri: `${baseUrl}/customer/account/${user?.user_id}` }}
        scalesPageToFit={false} // For Android
        javaScriptEnabled={true}
        injectedJavaScript={injectedJavaScript} // For iOS
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();
function CustomDrawerContent(props: any) {
  const { setUser } = useUserStore();
  const _logout = () => {
    logout()
    setUser(undefined)
  }
  return (
    <DrawerContentScrollView {...props}>
      <View style={twrnc`p-2 flex flex-col`}>
        <Image
          style={{
            height: 70
          }}
          source={require('../assets/images/logo.png')}
          contentFit="contain"
          transition={1000}
        />
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={_logout} style={twrnc`m-5 flex items-center justify-center flex-row gap-1 w-auto p-1 bg-red-200 rounded border border-red-500`}>
        <Feather name="log-out" size={14} color="red" /><Text style={twrnc`text-red-600 text-sm`}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function CustomerScreen() {
  return (
    <Drawer.Navigator
     initialRouteName="Basket"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: twrnc`bg-gray-100 w-72`, // Custom drawer width and background
        headerStyle: { backgroundColor: 'rgb(21 128 61)' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerActiveTintColor:'green'
      }}>
      <Drawer.Screen name="Basket" component={ProductsScreen} />
      <Drawer.Screen name="Orders" component={OrdersScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto",
    width: "auto",
    backgroundColor: "gray"
  },
});