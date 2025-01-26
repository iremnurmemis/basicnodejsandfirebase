import express from "express";
import { addRentalToUser, getUserRentals,getAllRentals } from "../controllers/rentalController.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: User rental management
 */

/**
 * @swagger
 * /rentals/{userId}:
 *   get:
 *     summary: Get all rentals of a user
 *     tags: [Rentals]
 *     description: Retrieves all rentals associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: A list of rentals for the user.
 *       400:
 *         description: User ID is required.
 *       404:
 *         description: No rentals found for this user.
 *       500:
 *         description: Internal server error.
 */
router.get("/:userId", getUserRentals);


/**
 * @swagger
 * /rentals:
 *   get:
 *     summary: Get all rentals
 *     description: Retrieve all rental records from the database.
 *     responses:
 *       200:
 *         description: A list of all rentals.
 *       404:
 *         description: No rentals found.
 *       500:
 *         description: Server error.
 */
router.get("/", getAllRentals);

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Add a rental to a user
 *     tags: [Rentals]
 *     description: Creates a new rental record for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - carId
 *               - startDate
 *               - endDate
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user renting the car.
 *               carId:
 *                 type: string
 *                 description: The ID of the car being rented.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the rental.
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the rental.
 *     responses:
 *       201:
 *         description: Rental added successfully
 *       400:
 *         description: Invalid rental data
 *       500:
 *         description: Internal server error
 */
router.post("/", addRentalToUser);

/**
 * @swagger
 * /rentals/{userId}:
 *   get:
 *     summary: Get all rentals of a user
 *     tags: [Rentals]
 *     description: Retrieves all rentals associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: A list of rentals for the user.
 *       400:
 *         description: User ID is required.
 *       404:
 *         description: No rentals found for this user.
 *       500:
 *         description: Internal server error.
 */
router.get("/:userId", getUserRentals);




export default router;
