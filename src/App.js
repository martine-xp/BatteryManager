import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from "./navigation/StackNavigator"
import BottomTabs from "./navigation/BottomTabNavigator";

export default function App() {
  return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>

  );
}

