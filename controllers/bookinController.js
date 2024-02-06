require('dotenv').config();
const { response, request } = require('express');
const { bookin } = require('../models/bookinModel')



const bookins = async (request, response) => {
    const {Date, Hora, Email} = request.body
    try {
        const booking = await bookin.findOne({Date, Hora})
        if(booking){
            return response.status(400).json({message:'ya existe una reserva en esa hora'})
        }
        if(!booking){
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

const checkTime = async (request, response) => {
    try {
        const bookins = await bookin.find({});
        let now = new Date()
        
        if(!bookins) {
            return response.status(400).json({message:'no existe la reserva'})
        }
        for (const booking of bookins){
            const bookinDateTime = new Date(`${bookin.Date}${bookin.Time}`)
            if(bookinDateTime.getTime() < now.getTime()){
                await bookin.deleteOne({_id: booking._id})
            }
        }
  
        // // const filter = time.filter(booking => new Date(booking.Date).getTime() < Date.now() || new Date(booking.Time).getTime() < Date.now())
        // // filter.forEach(async booking => {
        // //     await bookin.deleteOne({_id: booking._id})
        // // })

        return response.json({ message: 'Reservas eliminadas con éxito' });
    } catch (error) {
        response.status(500).json({message:'no se pudo realizar el borrado automatico'})
    }
}

const deleteBookin = async (request, reponse) => {
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