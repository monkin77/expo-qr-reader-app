import { useState } from "react";

const QrReader = () => {
    return (
        <h1>QrReader</h1>
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

export default QrReader;
