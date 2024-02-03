require('dotenv').config();
const { response, request } = require('express');
const bookin = require('../models/bookinModel')



const bookins = async (request, response) => {
    const {Date, Time, email} = request.body;
    try {
        //first check if we already have a booking in the same date and time
        const bookin = await bookin.findOne({Date, Time});
        // if it exist we return an error
        if(bookin){
            return response.status(400).json({message:'ya hay una reserva en el horario'})
        };
        // if doestn exist we creat a new one in the date and time and then we save it the data base
        if(!bookin){
            const reserve = new bookin ({
                Date,
                Time,
                email
            });
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

const checkTime = async (request, response) => {
    try {
        const bookings = await bookin.find({})
        const now = new Date()
        if(!time){
            return response.status(400).json({message:'no existe el turno'});
        }

        for (const booking of bookings){
            const bookinDateTime = new Date(`${bookin.Date}${bookin.Time}`)
            if(bookinDateTime.getTime() < now.getTime()){
                await bookin.deleteOne({_id: booking._id})
            }
        }

        // const filter = time.filter(booking => new Date(booking.Date).getTime() < Date.now() || new Date(booking.Time).getTime() < Date.now())
        // filter.forEach(async booking => {
        //     await bookin.deleteOne({_id: booking._id})
        // })

        return response.json({ message: 'Reservas eliminadas con éxito' });
    } catch (error) {
        response.status(500).json({message:'no se pudo realizar el borrado automatico'})
    }
}

const deleteBookin = async (request, reponse) => {
    const { id } = request.body
    try {
        const bookin = await bookin.findOne({_id:id})
        if(!bookin){
            return response.status(400).json({message:'no existe la reserva'})
        }

        await bookin.deleteOne({_id: id})
        response.status(200).json({message:'se pudo eliminar con exito'})
    } catch (error) {
        response.status(400).json({message:'no se pudo realizar la accion'})
    }
}

module.exports = { bookins, getAllBookin, checkTime, deleteBookin}