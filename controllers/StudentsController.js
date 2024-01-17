import { Op } from "sequelize";
import Student from "../models/Student.js";


class StudentController{
    //INDEX
    async index(req,res){

        const {order,sort,nama} = req.query;

        //SORTING
        if("sort" in req.query){

            const sorting = await Student.findAll({
                order: [
                    [sort, order]
                ]
            })
            res.json({data:sorting})
        }

        //FILTERING BY NAMA
        else if("nama" in req.query){
            const filter = await Student.findAll({
                where:{
                    nama: {
                        [Op.substring]: nama
                    }
                }
            })
            res.json({data:filter})
        }

        //FILTERING BY JURUSAN
        else if("jurusan" in req.query){
            const filter = await Student.findAll({
                where:{
                    jurusan: {
                        [Op.substring]: req.query.jurusan
                    }
                }
            })
            res.json({data:filter})
        }

        else{
            const students = await Student.findAll();

            const data = {
                message:"Menampilkan data students",
                data: students,
            };
            res.json(data)
        }
    }

    async store(req,res){
        const {nama,nim,email,jurusan} = req.body;

        const students = await Student.create(req.body);

        const data = {
            message:`Menambahkan data student`,
            data: students,
        };
        res.status(201).json(data)
    }

    async update(req,res){
        const {id} = req.params;

        const student = await Student.findByPk(id);

        if(student){
            const condition = {
                where:{
                    id:id,
                }
            }

            await Student.update(req.body,condition);
            
            const student = await Student.findOne(condition);

            const data = {
                message:`Mengedit data student dengan id ${id}`,
                data: student,
            };
            res.status(200).json(data)
        }
        else{
            const data = {
                message:"Student tidak ditemukan",
            };
            res.status(404).json(data)
        }

        
    }

    async destroy(req,res){
        const {id} = req.params;
        const students = await Student.findByPk(id);

        if(students){
            const condition = {
                where: {
                    id: id,
                }
            };

            await Student.destroy(condition);

            const data = {
                message:`Student dengan id ${id} telah dihapus`,
            };
            res.status(200).json(data)
        }
        else{
            const data = {
                message:`Student tidak ditemukan`,
            };
            res.status(404).json(data)
        }
    }

    async show(req,res){
        const {id} = req.params;
        const students = await Student.findByPk(id);

        if(students){
            const condition = {
                where: {
                    id: id,
                }
            }

            const students = await Student.findOne(condition);

            const data = {
                message:`Menampilkan data student dengan id: ${id}`,
                data: students,
            };
            res.status(200).json(data)
        }
        else{
            const data = {
                message:"Student tidak ditemukan",
            };
            res.status(404).json(data)
        }
    }
}

const object = new StudentController();

export default object;