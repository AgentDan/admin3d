const {Router} = require('express')
const router = Router()
const File = require("../models/File")
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./client/public/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({storage: storageConfig});

router.post("/addfile", upload.single('file'), async (req, res) => {
    try {
        const fileName = req.file.originalname
        const userId = req.body.userId
        const existingFile = await File.findOne({file: fileName})

        if (existingFile) {
            return res.status(404).json({message: 'Фаил с таким именем уже существует!'})
        }

        const newFile = new File({
            owner: userId,
            file: fileName
        })

        await newFile.save();
        res.json({message: 'File upload'})

    } catch (error) {
        res.status(500).json({message: "My Error"})
    }
})

router.get('/list', async (req, res) => {
    try {
        const newlist = await File.find().populate('owner', 'username')
        res.json(newlist)
    } catch (error) {
        console.log(error)
    }
})

router.get('/userfiles/:id', async (req, res)=>{
    try {
        const id = req.params.id
        const projects = await File.find({owner: id})
        res.status(200).json(projects)

    }catch (error){
        res.status(400).json({message: error})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const delfile = await File.findById(id)

        if (!delfile) {
            return res.status(200).json({message: "File not found!"})
        }

        const filePath = path.join(__dirname, `../client/public/uploads/${delfile.file}`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await File.deleteOne({_id: id})

        res.json({message: "File deleted"})
    } catch (error) {
        res.status(500).json({message: "My error"})
    }
})

module.exports = router