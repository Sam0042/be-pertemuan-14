import { check,validationResult } from "express-validator";

const isTextOnly = (value) => {
    // Using regex to check if the string contains only letters
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(value);
  };

const rules = [
    check("email")
        .notEmpty().withMessage("Email wajib diisi!")
        .isEmail().withMessage("Email Invalid!"),
    check("nim")
        .notEmpty().withMessage("NIM wajib diisi!")
        .isNumeric().withMessage("NIM harus berupa angka!"),
    check("nama")
        .notEmpty().withMessage("Nama wajib diisi!")
        .isString().withMessage("Nama harus berupa string!")
        .custom(isTextOnly).withMessage("Nama harus berupa huruf!")
        ,
    check("jurusan")
        .notEmpty().withMessage("Jurusan wajib diisi!")
        .isString().withMessage("Jurusan harus berupa string!")
        .custom(isTextOnly).withMessage("Jurusan harus berupa huruf!")
        ,
    
]

const validateTodo =[
    rules,
    (req,res,next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        next();
    }
]

export default validateTodo