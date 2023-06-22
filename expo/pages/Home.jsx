import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";

class Todo {
    constructor(id, text, completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }

    toggle = () => {
        this.completed = !this.completed;
    };
}

const Homepage = ({ navigation }) => {
    const [list, setList] = useState([
        new Todo(1, "TODO 1", false),
        new Todo(2, "TODO 2", false),
        new Todo(3, "TODO 3", false),
    ]);

    const toggleTodo = (idx) => {
        list[idx].toggle();
        setList([...list]);
    };

    const navigateToQrReader = () => {
        navigation.navigate("QrReader");
    };

    return (
        <View style={styles.container}>
            {list.map((item, idx) => {
                return (
                    <View key={idx} style={styles.todoContainer}>
                        <View style={styles.todoContent}>
                            <Checkbox
                                style={styles.checkbox}
                                value={item.completed}
                                onValueChange={() => toggleTodo(idx)}
                                color="yellowgreen"
                            />

                            <TouchableOpacity
                                onPress={navigateToQrReader}
                                style={{
                                    flex: 1,
                                    height: "100%",
                                }}
                            >
                                <Text style={styles.itemText}>{item.text}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        alignItems: "center",
        justifyContent: "center",
    },
    todoContainer: {
        padding: 5,
        marginVertical: 10,
        width: "80%",
        height: 80,
        borderRadius: 10,
        backgroundColor: "grey",
        justifyContent: "center",
    },
    todoContent: {
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
    },
    itemText: {
        color: "#fff",
        marginLeft: 20,
        height: "100%",
        textAlignVertical: "center",
    },
    checkbox: {
        borderRadius: 20,
        height: 25,
        width: 25,
    },
});

export default Homepage;
