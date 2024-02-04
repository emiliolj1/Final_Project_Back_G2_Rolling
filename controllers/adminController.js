require('dotenv').config();
const { response, request } = require('express');
const User = require('../models/userModel');
const Products = require('../models/cardsModel');
const Cancha = require('../models/canchaModel')


const createProduct = async (request, response) => {
  const { Title, description, id, img, price} = request.body
  try {
    //we use the schema from the userModel
    const NewProduct = new Products ({
      Title,
      id,
      img,
      description,
      price,
    });
    //save the new product in the data base
    await NewProduct.save();
    response.status(200).json({message: 'se creo con exito'});
  } catch (error) {
    response.status(400).json({message: 'no se pudo crear.'});
  }
};

const getAllProducts = async () => {
  try {
    //we use find({}) to get all productos from the server
    const products = await Products.find({});
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ message: 'No se pudieron encontrar los productos' });
  }
};

const createCancha = async () => {
  const { Title, description, id, img, Date} = request.body
  try {
    //we use the schema from the canchaModel
    const NewCancha = new Cancha ({
      Title,
      id,
      img,
      description,
      Date
    });
    //then we save the new cancha
    await NewCancha.save();
    response.status(200).json({message: 'se creo con exito'});
  } catch (error) {
    response.status(400).json({message: 'no se pudo crear.'});
  }
};

const getAllCancha = async () => {
  try {
    // we use find({}) to get all from canchas in the data base
    const canchas = await Cancha.find({});
    response.status(200).json(canchas);
  } catch (error) {
    response.status(500).json({ message: 'No se pudieron encontrar los productos' });
  }
};

const getAllUsers = async() => {
  try {
    // we use find({}) to get all from users in the data base
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ message: 'No se pudieron encontrar usuarios' });
  }
};

const UserDisable = async (request, response) => {
  const {id} = request.body
  try {
    const users = await User.findOne({_id: id})
    if(!users){
      return response.status(400).json({message:'no se encontro al usuario'})
    }
  } catch (error) {

  }
};

const changeRole = async(request, response) => {
  const {id, newRole} = request.body
  try {
    const user = await User.findOne({_id: id});
    if (!user) {
      return response.status(404).json({ message: 'Usuario no encontrado' });
    }
    if(![client, admin].includes(newRole)){
      response.status(200).json({message:'rol no valido'})
    }
    if([client, admin].includes(newRole)){
      await User.save()
      response.status(200).json({message:'se pudo cambiar el rol con exito'})
    }
  } catch (error) {
    response.status(500).json({message:'error en ejecutar la funcion'})
  }
}

const DeleteUser = async (request, response) => {
  const {id} = request.body;
  try {
    const user = await User.findOne({_id: id});
    if(!user){
      return response.status(400).json({message:'no se encontro el usuario'});
    }

    await User.deleteOne({_id:id})

  } catch (error) {
    response.status(400).json({message:'no se pudo realizar la accion'})
  }
}

const DeleteProducts = async (request, response) => {
  //we use an input where the user can write a number
  const { id } = request.body;
  try {
    // the number from the front is a id, then use these id to find the product in the data base
    const product = await Products.findOne({_id: id});
    // we check if the product exist
    if(!product){
      return response.status(400).json({message: 'no existe el producto'})
    };
    // and if it exist we delete the product by id
    await Products.deleteOne({_id: id});

  } catch (error) {
    response.status(400).json({message: 'no se pudo realizar la accion'});
  }
};

const DeleteCanchas = async (request, response) => {
  //we use an input where the user can write a number
  const { id } = request.body
  try {
    // the number from the front is a id, then use these id to find the cancha in the data base
    const canchas = await Cancha.findOne({_id: id})
    //we check if the cancha exist
    if(!canchas){
      return response.status(400).json({message:'no existe la cancha'})
    }
    //if it exist we delete the cancha by id
    await Cancha.deleteOne({_id: id})
  } catch (error) {
    response.status(400).json({message: 'no se pudo realizar la accion'})
  }
}

module.exports = { createProduct, createCancha, getAllProducts, getAllCancha, getAllUsers, DeleteCanchas, DeleteProducts, DeleteUser}