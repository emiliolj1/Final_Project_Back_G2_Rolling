require('dotenv').config();
const { response, request } = require('express');
const { Cancha } = require('../models/canchaModel')
const { DateTime } = require("luxon");

//is workin
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


//is workin
const deleteBookin = async (req, res) => {
    const { id, CanchaName } = req.params;
    try {
        // Definimos la operacion pull en una variable solo para simplificar la llamada luego
        const deleteOperation = {
            $pull: {
                Array: { _id: id } //probemos con el id ahora en lugar
            }
        }

        // Buscamos y encontramos la cancha
        await Cancha.findOneAndUpdate(
            { Title: CanchaName},
            deleteOperation,
            { new: true }
        )
        res.status(200).json({ message: 'Successfully deleted' })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'no se pudo realizar la accion, disculpe las molestias'})
    }
};


module.exports = { bookins, getAllBookin, deleteBookin }