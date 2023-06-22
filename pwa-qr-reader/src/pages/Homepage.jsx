import React, { useState } from "react";
import { Box, Grid, Checkbox, Typography } from "@mui/material";

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
        <Box sx={{ width: "100%", height: "100%", padding: 3 }}>
            <Typography variant="h4" color="white" sx={{ marginBottom: 3 }}>
                Homepage
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {list.map((item, idx) => {
                        return (
                            <Grid item xs={12} key={idx}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        margin: 2,
                                    }}
                                >
                                    <Checkbox
                                        style={{
                                            borderRadius: 20,
                                            height: 25,
                                            width: 25,
                                            color: "#34eb7a",
                                        }}
                                        checked={item.completed}
                                        onChange={() => toggleTodo(idx)}
                                    />

                                    <div
                                        onClick={navigateToQrReader}
                                        style={{
                                            display: "flex",
                                            flex: 1,
                                            height: "100%",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#fff",
                                                marginLeft: 4,
                                                height: "100%",
                                                textAlignVertical: "center",
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </div>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
};

export default Homepage;
