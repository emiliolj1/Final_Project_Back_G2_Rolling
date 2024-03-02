require('dotenv').config();
const { res, req } = require('express');
const { Cancha } = require('../models/canchaModel')
const { DateTime } = require("luxon");

//is workin
const bookins = async (req, res) => {
    //we request from the front the date, time, name and cancha
    const {date, time, name, cancha} = req.body
    try {
        // we create a variable from each req.body
        let nombre = cancha;
        // using the variable we convert the date and time format that comes from the front to string format to store it
        let dateString = date;
        let timeString = time;
        // we use concat to put them together and save them on a date with a time
        let concat = dateString + 'T' + timeString;
        // the we use the format ISO to check if the time is minor to the actual date
        let DateISO = new Date(concat);
        let now =  new Date();
        console.log(DateISO);
        let canchas = await Cancha.findOne({Title : nombre});

        // the we use the format ISO to check if the time is minor to the actual date
        if(DateISO < now ){
            return res.status(400).json({message: 'no puedes hacer reservas para el pasado'});
        };
        //we check if the cancha title is the same to the variable nombre 
        if(canchas.Title === nombre){
            //we push an array to save the bookin
            canchas.Array.push({ date: DateISO, name: name });
            await canchas.save();
            res.status(200).json({message:'se realizo la reserva con exito'});
        }else {
            res.status(404).json({ message: 'No se encontró la cancha especificada' });
        };
    } catch (error) {
        res.status(500).json({message:'no se pudo realizar la accion de reserva cancha, disculpe las molestias'});
    };
};

//is workin
const deleteBookin = async (req, res) => {
    const { id, canchaName } = req.body;
    try {
        // We define the pull operation on a variable just to simplify the call later
        const deleteOperation = {
            $pull: {
                Array: { _id: id } //let's try the id now instead
            }
        };

        // We search and find the cancha
        await Cancha.findOneAndUpdate(
            { Title: canchaName },
            deleteOperation,
            { new: true }
        )
        res.status(200).json({ message: 'Successfully deleted' })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'no se pudo realizar la accion, disculpe las molestias'});
    };
};


module.exports = { bookins, deleteBookin}