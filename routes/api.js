import express from "express";
import object from "../controllers/StudentsController.js";
import validateTodo from "../middleware/validateTodo.js";
import AuthController from "../controllers/AuthController.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.get("/",function(req,res){
    res.send("Halaman Home by Sam0042 and Fredy Rambitan Simanungkalit")
});

const StudentController = object;

//StudentController.method ditaruh di tempat callbackfunct  karena callbackfunct auto dijalankan ketika kita mengakses parameter satu
router.get("/students",auth,StudentController.index);
router.post("/students",auth,validateTodo,StudentController.store);
router.put("/students/:id",auth,StudentController.update);
router.delete("/students/:id",auth,StudentController.destroy);
router.get("/students/:id",auth,StudentController.show);
//register-login
router.post("/register",AuthController.register);
router.post("/login",AuthController.login);

export default router;