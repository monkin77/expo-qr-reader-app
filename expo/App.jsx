import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./pages/Home";
import QrReader from "./pages/QrReader";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Homepage} />
                <Stack.Screen name="QrReader" component={QrReader} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
