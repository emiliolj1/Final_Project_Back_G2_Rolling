require('dotenv').config();
const { response } = require('express');
const User = require('../models/userModel');
const card = require('../models/cardsModel')


const createProduct = async (request, response) => {
  const { Title, description, id, img, cuantity, price} = response.body
  try {
    const Newcard = new card ({
      Title,
      id,
      cuantity,
      img,
      description,
      price,
    })

    await Newcard.save()
    response.status(200).json({message: 'se creo con exito'})
  } catch (error) {
    response.status(400).json({message: 'no se pudo crear.'})
  }
}

const getAllProducts = async () => {
  try {
    const products = await product.find({})
    response.status(200).json(products)
  } catch (error) {
    response.status(400).json({ message: 'No se pudieron encontrar los productos' })
  }
}

const createCancha = async () => {
  const { Title, description, id, img, Date} = response.body
  try {
    const Newcard = new card ({
      Title,
      id,
      img,
      description,
      Date
    })

    await Newcard.save()
    response.status(200).json({message: 'se creo con exito'})
  } catch (error) {
    response.status(400).json({message: 'no se pudo crear.'})
  }
}

const getAllCancha = async () => {
  try {
    const canchas = await cancha.find({})
    response.status(200).json(canchas)
  } catch (error) {
    response.status(400).json({ message: 'No se pudieron encontrar los productos' })
  }
}

const getAllUsers = async() => {
  try {
    const users = await User.find({})
    response.status(200).json(users)
  } catch (error) {
    response.status(400).json({ message: 'No se pudieron encontrar usuarios' })
  }
};

const DeleteProducts = async (request, response) => {
  const { id } = response.body
  try {

    const product = await card.findOne({_id: id});
    if(!product){
      return response.status(400).json({message: 'no existe el producto'})
    }
    
    await card.deleteOne({_id: id})

  } catch (error) {
    response.status(400).json({message: 'no se pudo realizar la accion'})
  }
}

const DeleteCanchas = async (request, response) => {
  const { id } = response.body
  try {

    const canchas = await cancha.findOne({_id: id})
    if(!cancha){
      return response.status(400).json({message:'no existe la cancha'})
    }

    await cancha.deleteOne({_id: id})
  } catch (error) {
    response.status(400).json({message: 'no se pudo realizar la accion'})
  }
}

module.exports = { createProduct, createCancha, getAllProducts, getAllCancha, getAllUsers, DeleteCanchas, DeleteProducts}