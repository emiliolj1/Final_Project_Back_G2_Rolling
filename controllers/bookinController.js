require('dotenv').config();
const { response, request } = require('express');
const { Cancha } = require('../models/canchaModel')
const { DateTime } = require("luxon");

//...
const bookins = async (request, response) => {
    const {date, time, name, cancha} = request.body
    try {
        let nombre = cancha
        let dateString = date
        let timeString = time 
        let concat = dateString + 'T' + timeString
        let DateISO = new Date(concat)
        console.log(DateISO);
        let canchas = await Cancha.findOne({Title : nombre})
        //const [Title] = canchas
        if(canchas.Title === nombre){
            
            canchas.Array.push({ date: DateISO, name: name })
            // const newBookin = new Cancha ({
            //     Title,
            //     Url,
            //     description,
            //     Array:[{ date: DateISO, name: name }]
            // })
            await canchas.save()
            response.status(200).json({message:'se realizo la reserva con exito'})
        }else {
            response.status(404).json({ message: 'No se encontró la cancha especificada' });
        }
    } catch (error) {
        response.status(400).json({message:'no se pudo hacer la reserva'});
    }
}

//...
const getAllBookin = async (request, response) => {
    try {
        const cancha = await Cancha.find({Array})
        if (cancha.length === 0) {
            return response.status(404).json({ message: 'No se encontraron reservas' });
        }
        response.status(200).json(cancha);
    } catch (error) {
        response.status(500).json({message:'no se pudo realizar la accion, disculpe las molestias'});
    }
}

//...
const checkTime = async (request, response) => {
    try {
        const bookin = await Cancha.find({Array: {$all: date}})
        
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
    } catch (error) {
        response.status(500).json({message:'no se pudo realizar la accion, disculpe las molestias'})
    }
}

//...
const deleteBookin = async (request, response) => {
    const { id } = request.body
    try {
        
        
        response.status(200).json({message:'se pudo eliminar con exito'})
    } catch (error) {
        response.status(400).json({message:'no se pudo realizar la accion'})
    }
}

module.exports = { bookins, getAllBookin, checkTime, deleteBookin}