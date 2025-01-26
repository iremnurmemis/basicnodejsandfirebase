import { db } from "../config/firebase.js";
import {
  ref,
  push,
  set,
  update,
  remove,
  get,
  
} from "firebase/database";
import Car from "../models/Car.js";

export const addCar = async (req, res) => {
  try {
    const { plate, model, categoryId } = req.body;
    if (!model || !plate || !categoryId) {
      return res
        .status(400)
        .json({ error: "Category model,plate,categoryId is required" });
    }

    const carsRef = ref(db, "cars");
    const newCarRef = push(carsRef);

    const car = new Car(newCarRef.key, plate, model, categoryId);
    await set(newCarRef, car);
    return res.status(201).json({ message: "Car added successfully", car });
  } catch (error) {
    console.error("Error adding car:", error);
    return res.status(500).json({ message: "Error adding car", error });
  }
};

export const getCars = async (req, res) => {
  try {
    const snapshot = await get(ref(db, "cars"));
    if (!snapshot.exists())
      return res.status(400).json({ message: "No cars found" });

    res.status(201).json(snapshot.val());
  } catch (error) {
    res.status(500).json({ message: "Error getting car", error });
  }
};

export const getCarsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId)
      return res.status(400).json({ message: "categoryId is required" });

    const carsRef = ref(db, "cars");
    const snapshot = await get(carsRef); 

    if (!snapshot.exists())
      return res.status(404).json({ message: "No cars found" });

    const allCars = snapshot.val();

    const filteredCars = Object.keys(allCars).map((key) => allCars[key]).filter(
      (car) => car.categoryId === categoryId
    );
    if (filteredCars.length === 0)
      return res
        .status(404)
        .json({ message: "No cars found for this category" });

    return res.status(200).json(filteredCars);
  } catch (error) {
    console.error("Error fetching cars by category:", error);
    return res
      .status(500)
      .json({ message: "Error fetching cars by category", error });
  }
};


export const getCarById=async(req,res)=>{
    try{
        const{id}=req.params;
        if(!id){
            return res.status(400).json({message:"carId is required"});
        }

        const carRef=ref(db,`cars/${id}`);
        const snapshot=await get(carRef);

        if(!snapshot.exists()){
            return res.status(404).json({ message: "No car found" });
        }

        return res.status(200).json(snapshot.val());

    }catch(error){
        return res.status(500).json({message:"error fetching car by carId",error});
    }
};

export const updateCar=async (req,res)=>{
    try{
        const {id}=req.params;
        const{plate,model,categoryId}=req.body;

        const updateCarRef=ref(db,`cars/${id}`);
        const snapshot = await get(updateCarRef);
        if (!snapshot.exists()) {
            return res.status(404).json({ message: "Car not found" });
        }

        const updatedData = {
            plate: plate || snapshot.val().plate,
            model: model || snapshot.val().model,
            categoryId: categoryId || snapshot.val().categoryId,
        };

        await update(updateCarRef, updatedData);
        return res.status(200).json({ message: "Car updated successfully", updatedData });


    }catch(error){
        return res.status(500).json({message:"error fetching update car",error})
    }

};

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const carRef = ref(db, `cars/${id}`);
        const snapshot = await get(carRef);

        if (!snapshot.exists()) {
            return res.status(404).json({ message: "Car not found" });
        }

        await remove(carRef);
        return res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error("Error deleting car:", error);
        return res.status(500).json({ message: "Error deleting car", error });
    }
};