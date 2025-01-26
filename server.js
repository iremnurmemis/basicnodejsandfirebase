import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { db } from "./config/firebase.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";

const app = express();


app.use(cors());
app.use(bodyParser.json());


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Car Rental API",
            version: "1.0.0",
            description: "Firebase Realtime Database ile geliştirilmiş araç kiralama API'si"
        },
        servers: [{ url: "http://localhost:5000" }]
    },
    apis: ["./routes/*.js"], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/categories", categoryRoutes);
app.use("/cars", carRoutes);
app.use("/users", userRoutes);
app.use("/rentals", rentalRoutes);


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});




