require('dotenv').config();
const { response, request } = require('express');
const { Cancha } = require('../models/canchaModel')
const { DateTime } = require("luxon");

//...
const bookins = async (req, res) => {
    const {date, time, name, cancha} = req.body
    try {
        let nombre = cancha
        let dateString = date
        let timeString = time 
        let concat = dateString + 'T' + timeString
        let DateISO = new Date(concat)
        let now =  new Date()
        console.log(DateISO);
        let canchas = await Cancha.findOne({Title : nombre})
        
        if(DateISO < now ){
            return res.status(400).json({message: 'no puedes hacer reservas para el pasado'})
        };
        if(canchas.Title === nombre){
            canchas.Array.push({ date: DateISO, name: name })
            await canchas.save()
            res.status(200).json({message:'se realizo la reserva con exito'})
        }else {
            res.status(404).json({ message: 'No se encontró la cancha especificada' });
        };
    } catch (error) {
        res.status(500).json({message:'no se pudo realizar la accion de reserva cancha, disculpe las molestias'});
    }
}

//is workin
const getAllBookin = async (req, res) => {
    try {
        const cancha = await Cancha.find()
        if (cancha.length === 0) {
            return res.status(404).json({ message: 'No se encontraron reservas' });
        }
        res.status(200).json(cancha);
    } catch (error) {
        res.status(500).json({message:'no se pudo realizar la accion, disculpe las molestias'});
    }
}

//dont work
const checkTime = async (req, res) => {
    try {
        const bookin = await Cancha.find({Array: {$all: date}})
        console.log(bookin)
        let arrayfromback = bookin
        let [date] = arrayfromback;
        let dateBack = new Date (date.parse())
        let now = new Date()
        if(!arrayfromback){
            return response.status(400).json({message: 'No se encontraron reservas'})
        }
        if(dateBack < now){
            await Cancha.deleteOne({Array})
            response.status(200).json({})
        }
        
        // const canchas = await Cancha.find();
        // for (const cancha of canchas) {
        //     const arrayFromBack = cancha.Array;

        //     for (const fecha of arrayFromBack) {

        //         const dateBack = new Date(fecha);

        //         const now = new Date();

        //         if (dateBack < now) {
        //             await Cancha.updateOne({ _id: cancha._id }, { $set: { Array: [] } });
        //         }
        //     }
        // }

        response.status(200).json({ message: 'Proceso de verificación completado' });
    } catch (error) {
        response.status(500).json({message:'no se pudo realizar la accion, disculpe las molestias'})
    }
}

//...
const deleteBookin = async (req, res) => {
    const { id } = req.params;
    try {
        const bookin = await Cancha.findOne({Array:{_id:id}});
        if(!bookin){
            return res.status(400).json({message:'no existe la reserva'})
        }
        if(bookin){
            
        };
        res.status(200).json({message:'se pudo eliminar con exito'})
    } catch (error) {
        res.status(500).json({message:'no se pudo realizar la accion, disculpe las molestias'})
    }
}

module.exports = { bookins, getAllBookin, checkTime, deleteBookin}