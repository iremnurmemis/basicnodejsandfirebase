import { getDatabase, ref, push, set, get } from "firebase/database";
import { Rental } from "../models/Rental.js";
import { db } from "../config/firebase.js";

export const addRentalToUser = async (req, res) => {
    try {
      const { userId, carId, startDate, endDate } = req.body;
  
      if (!userId || !carId || !startDate || !endDate) {
        return res.status(400).json({ message: "Invalid rental data" });
      }
  
      const rentalRef = push(ref(db, "rentals"));
      const rentalId = rentalRef.key;

      const newRental = new Rental(rentalId, userId, carId, startDate, endDate);

      await set(ref(db, `rentals/${rentalId}`), newRental);
      await set(ref(db, `users/${userId}/rentals/${rentalId}`), newRental);

     
      return res.status(201).json({ message: "Rental added successfully", rental: newRental });
    } catch (error) {
      console.error("Error adding rental:", error);
      return res.status(500).json({ message: "Error adding rental", error });
    }
  };


export const getUserRentals = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const userRentalsRef = ref(db, `users/${userId}/rentals`);
    const snapshot = await get(userRentalsRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "No rentals found for this user" });
    }

    return res.status(200).json(snapshot.val());
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return res.status(500).json({ message: "Error fetching rentals", error });
  }
};

export const getAllRentals = async (req, res) => {
  try {
    const rentalsRef = ref(db, "rentals");
    const snapshot = await get(rentalsRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "No rentals found" });
    }

    return res.status(200).json(snapshot.val());
  } catch (error) {
    console.error("Error fetching all rentals:", error);
    return res.status(500).json({ message: "Error fetching rentals", error });
  }
};