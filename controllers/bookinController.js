require('dotenv').config();
const { response, request } = require('express');
const { bookin } = require('../models/bookinModel');
const { Cancha } = require('../models/canchaModel');
const { User } = require('../models/userModel');


//no anda
const bookins = async (request, response) => {
    const {Date, Hora, Email, id} = request.body
    try {
        const booking = await bookin.findOne({Date, Hora})
        const cancha = await Cancha.findOne({_id: id})
        const user = await User.findOne({email : Email})
        if(booking){
            return response.status(400).json({message:'ya existe una reserva en esa hora'})
        }
        if (!cancha) {
            return response.status(404).json({ message: 'La cancha especificada no existe' });
        }
        if (!user) {
            return response.status(404).json({ message: 'El usuario especificado no existe' });
        }
        if(!booking && cancha.id === id && user.email === Email){
            const reserve = new bookin({
                Date,
                Hora,
                Email
            })
            await reserve.save();
            response.status(200).json({message:'se realizo la reserva con exito'})
        } 
    } catch (error) {
        response.status(400).json({message:'no se pudo hacer la reserva'});
    }
}


const getAllBookin = async () => {
    try {
        const bookins = await bookin.find({});
        response.status(200).json(bookins);
    } catch (error) {
        response.status(500).json({message:'no se pudo realizar la accion, disculpe las molestias'});
    }
}

//no anda
const checkTime = async (request, response) => {
    try {
        const bookins = await bookin.find({})
        let bookinparserDate = bookin.Date.parse()
        let bookinparserHour = bookin.Hour.parse()
        let timestamp =  Date.now()

        response.json({ message: 'Reservas eliminadas con éxito' });
    } catch (error) {
        response.status(500).json({message:'no se pudo realizar el borrado automatico'})
    }
}

// anda
const deleteBookin = async (request, response) => {
    const { id } = request.body
    try {
        const bookins = await bookin.findOne({_id:id})
        if(!bookins){
            return response.status(400).json({message:'no existe la reserva'})
        }

        await bookin.deleteOne({_id: id})
        response.status(200).json({message:'se pudo eliminar con exito'})
    } catch (error) {
        response.status(400).json({message:'no se pudo realizar la accion'})
    }
}

module.exports = { bookins, getAllBookin, checkTime, deleteBookin}