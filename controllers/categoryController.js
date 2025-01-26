import {db} from "../config/firebase.js"
import { ref, push, set, update, remove, get } from "firebase/database";

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }

        const categoryRef = ref(db, "categories"); 
        const newCategoryRef = push(categoryRef); 
        await set(newCategoryRef, { id: newCategoryRef.key, name }); 

        res.status(201).json({ id: newCategoryRef.key, name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategories=async(req,res)=>{
    try{
        const categoriesRef=ref(db,"categories");
        const snapshot=await get(categoriesRef);

        if(!snapshot.exists) return res.status(404).json({ message: "No categories found" });
        res.status(200).json(snapshot.val());

    }catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params; 
        const categoryRef = ref(db, `categories/${id}`); 
        const snapshot = await get(categoryRef);

        if (!snapshot.exists()) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json(snapshot.val());
    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({ message: "Error fetching category", error });
    }
};

export const updateCategory=async(req,res)=>{
    try{
        const{id}=req.params;
        const{name}=req.body;

        if (!name) return res.status(400).json({ message: "Category name is required" });
        const updateCategoryRef=ref(db,`categories/${id}`);
        await update(updateCategoryRef,{name});
        res.status(200).json({ id, name });
    }catch (error) {
        res.status(500).json({ message: "Error updating category", error });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryRef = ref(db, `categories/${id}`);

        await remove(categoryRef);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
};

