import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignUpScreen"
import Homepage from "./screens/Homepage"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text }from "react-native"


function HomeScreen() {
  return (
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>wellcome to home</Text>
    </View>
  )
}

const RootStack = createNativeStackNavigator({
  initialRouteName : 'Home',
  screenOptions : {
    headerShown: false,
  },
  screens : {
    Login : LoginScreen,
    Signup : SignupScreen,
    Home : Homepage,
  }
})


const Navigation = createStaticNavigation(RootStack)

const App = () => {
  return (
    <Navigation />
  )
}

export default App