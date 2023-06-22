import React, { useState } from "react";

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

const Homepage = () => {
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
        console.log("navigateToQrReader");
    };

    return (
        <h1>Homepage</h1>
        /* 
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
        </View> */
    );
};

export default Homepage;
