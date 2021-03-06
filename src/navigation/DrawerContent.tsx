import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';
import {checkAuth} from '../services/User.service';
import {COLORS} from '../constants/theme';
import {AuthContext} from '../shared/AuthProvider';
import {getIdTokenRefreshed} from '../utils/Utility';
export function DrawerContent(props: any) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState('Home');
  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    getIdTokenRefreshed().then(token => {
      checkAuth(token!).then(res => {
        console.log('Details', res.data);
        setUser({...res?.data});
      });
    });
  }, []);
  auth().onAuthStateChanged(async user => {
    const refreshedToken = await user?.getIdToken();
    if (user) {
      setLoggedIn(true);
    }
    // console.log('token', refreshedToken);
  });

  const logout = async () => {
    await auth().signOut();
    setLoggedIn(false);
  };

  const navigate = (location: string) => {
    setActiveDrawer(location);
    props.navigation.toggleDrawer();
    props.navigation.navigate(location);
  };
  return (
    <>
      <DrawerContentScrollView
        {...props}
        style={{backgroundColor: COLORS.primary[100]}}>
        <DrawerItem
          icon={() => <Feather name="home" size={24} style={styles.icons} />}
          activeBackgroundColor={COLORS.primary[200]}
          activeTintColor="black"
          inactiveTintColor="black"
          focused={activeDrawer == 'Home'}
          label="Home"
          onPress={() => navigate('Home')}
        />
        <DrawerItem
          icon={() => (
            <Feather name="phone-call" size={24} style={styles.icons} />
          )}
          activeBackgroundColor={COLORS.primary[200]}
          activeTintColor="black"
          inactiveTintColor="black"
          focused={activeDrawer == 'Consult with Doctor'}
          label="Consult with Doctor"
          onPress={() => navigate('Consult with Doctor')}
        />
        <DrawerItem
          icon={() => (
            <AntDesign name="wallet" size={24} style={styles.icons} />
          )}
          activeBackgroundColor={COLORS.primary[200]}
          activeTintColor="black"
          inactiveTintColor="black"
          focused={activeDrawer == 'Wallet'}
          label="Wallet"
          onPress={() => navigate('Wallet')}
        />
        <DrawerItem
          icon={() => (
            <Feather name="settings" size={24} style={styles.icons} />
          )}
          activeBackgroundColor={COLORS.primary[200]}
          activeTintColor="black"
          inactiveTintColor="black"
          focused={activeDrawer == 'Settings'}
          label="Settings"
          onPress={() => navigate('Settings')}
        />

        {loggedIn ? (
          <DrawerItem
            label="Logout"
            icon={() => (
              <AntDesign name="logout" size={24} style={styles.icons} />
            )}
            activeTintColor="black"
            inactiveTintColor="black"
            onPress={logout}
          />
        ) : (
          <DrawerItem
            label="Login"
            icon={() => (
              <AntDesign name="login" size={24} style={styles.icons} />
            )}
            activeTintColor="black"
            inactiveTintColor="black"
            onPress={() => navigate('Login')}
          />
        )}
        {/* <DrawerItem
          label="Test Screen"
          icon={() => <AntDesign name="login" size={24} style={styles.icons} />}
          activeTintColor="black"
          inactiveTintColor="black"
          onPress={() => navigate("SignUp")}
        /> */}
      </DrawerContentScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  icons: {
    // backgroundColor: "#FF70071A",
    borderRadius: 5,
    padding: 3,
    color: COLORS.primary[500],
  },
  drawerItemLabel: {
    color: 'white',
  },
});
