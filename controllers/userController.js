import { getDatabase, ref, push, set, get } from "firebase/database";
import { User } from "../models/User.js";
import { db } from "../config/firebase.js";

export const createUser = async (req, res) => {
    try {
      const { id, name, email } = req.body;
  
      if (!id || !name || !email) {
        return res.status(400).json({ message: "Invalid user data" });
      }
  
      const userRef = ref(db, `users/${id}`);
      const newUser = new User(id, name, email, []);
  
      await set(userRef, newUser);
  
      return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Error creating user", error });
    }
  };
  

  export const getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
  
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);
  
      if (!snapshot.exists()) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json(snapshot.val());
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Error fetching user", error });
    }
  };