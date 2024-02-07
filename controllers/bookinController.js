require('dotenv').config();
const { response, request } = require('express');
const { Cancha } = require('../models/canchaModel')
const { DateTime } = require("luxon");

//...
const bookins = async (request, response) => {
    const {date, time, name} = request.body
    try {
        let dateString = date
        let timeString = time 
        let concat = dateString + 'T' + timeString
        let DateISO = new Date(concat)
        console.log(DateISO)
        const newBookin = new Cancha ({
            Array:[{ date: DateISO, name: name}]
        })
        await newBookin.save()
        response.status(200).json({message:'se realizo la reserva con exito'})
    } catch (error) {
        response.status(400).json({message:'no se pudo hacer la reserva'});
    }
}


const getAllBookin = async (request, response) => {
    try {
        const { date, name } = request.body
        if(!date && !name){
            return response.status(400).json({ message: 'Se requiere la fecha para realizar la búsqueda' });
        }
        const cancha = await Cancha.find({Array:{$elemMatch:{date: date, name: name}}})
        if (cancha.length === 0) {
            return response.status(404).json({ message: 'No se encontraron reservas para la fecha especificada' });
        }
        response.status(200).json(cancha);
    } catch (error) {
        response.status(500).json({message:'no se pudo realizar la accion, disculpe las molestias'});
    }
}

//...
const checkTime = async (request, response) => {
    try {
        const bookin = await Cancha.find({Date})
        
    } catch (error) {
        response.status(500).json({message:'no se pudo realizar el borrado automatico'})
    }
}

// anda
const deleteBookin = async (request, response) => {
    const { id } = request.body
    try {
        
        
        response.status(200).json({message:'se pudo eliminar con exito'})
    } catch (error) {
        response.status(400).json({message:'no se pudo realizar la accion'})
    }
}

module.exports = { bookins, getAllBookin, checkTime, deleteBookin}