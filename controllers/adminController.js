require('dotenv').config();
const { response, request } = require('express');
const { User } = require('../models/userModel');
const { Product } = require('../models/productModel');
const { Cancha } = require('../models/canchaModel')


const createProduct = async (req, res) => {
  const { Title, Description, Price, Url} = req.body
  try {
    const product = await Product.findOne({Title, Description})
    if(product) {
      return res.status(400).json({message: 'ya existe el producto'});
    }
    if(!product){
      //we use the schema from the userModel
      const NewProduct = new Product ({
        Title,
        Description,
        Price,
        Url
      });
      //save the new product in the data base
      await NewProduct.save();
      res.status(200).json({message: 'se creo con exito'});
    }
  } catch (error) {
    res.status(500).json({message: 'no se pudo realizar la accion de crear productos, disculpe las molestias.', error: error.message});
  }
};

const getAllProducts = async (req, res) => {
  try {
    //we use find({}) to get all productos from the server
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'no se pudo realizar la accion de obtener los productos, disculpe las molestias', error: error.message});
  }
};

const DeleteProducts = async (req, res) => {
  //we use the id from the mongoDB
  const { id } = req.params;
  try {
    // the number from the front is a id, then use these id to find the product in the data base
    const product = await Product.findOne({_id: id});
    // we check if the product exist
    if(!product){
      return res.status(404).json({message: 'no existe el producto'})
    };
    // and if it exist we delete the product by id
    if(product){
      await Product.deleteOne({_id: id});
    }
    res.status(200).json({message:'se pudo eliminar el producto'})
  } catch (error) {
    res.status(500).json({message: 'no se pudo realizar la accion de borrar los productos, disculpe las molestias', error: error.message});
  }
};

const createCancha = async (req, res) => {
  const { Title, Description, Url} = req.body
  try {
    const cancha = await Cancha.findOne({Title, Description})
    if(cancha) {
      return res.status(400).json({message: 'ya existe la cancha'});
    }
    if(!cancha) {
      //we use the schema from the canchaModel
      const NewCancha = new Cancha ({
        Title,
        Url,
        Description
      });
      //then we save the new cancha
      await NewCancha.save();
      res.status(200).json({message: 'se creo con exito'});
    }
  } catch (error) {
    res.status(500).json({message: 'no se pudo realizar la accion de crear cancha, disculpe las molestias', error: error.message});
  }
};

const getAllCancha = async (req, res) => {
  try {
    // we use find({}) to get all from canchas in the data base
    const canchas = await Cancha.find({});
    res.status(200).json(canchas);
  } catch (error) {
    res.status(500).json({ message: 'No se pudieron encontrar los productos', error: error.message });
  }
};

const DeleteCanchas = async (req, res) => {
  //we use the id from the mongoDB
  const { id } = req.params;
  try {
    // the number from the front is a id, then use these id to find the cancha in the data base
    const canchas = await Cancha.findOne({_id: id})
    //we check if the cancha exist
    if(!canchas){
      return res.status(404).json({message:'no existe la cancha'})
    }
    //if it exist we delete the cancha by id
    if(canchas){
      await Cancha.deleteOne({_id: id})
    }
  } catch (error) {
    res.status(500).json({message: 'no se pudo realizar la accion de borrar canchas, disculpe las molestias', error: error.message})
  }
}

const getAllUsers = async(req, res) => {
  try {
    // we use find({}) to get all from users in the data base
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'No se pudieron encontrar usuarios, no se pudo realizar la accion, disculpe las molestias.', error: error.message });
  }
};

//inProgress
// const UserDisable = async (request, response) => {
//   const {id} = request.body
//   try {
//     const users = await User.findOne({_id: id})
//     if(!users){
//       return response.status(400).json({message:'no se encontro al usuario'})
//     }
//   } catch (error) {

//   }
// };

const changeRole = async(req, res) => {
  const {id, newRole} = req.body
  try {
    const user = await User.findOne({_id: id});
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if(!['client','admin'].includes(newRole)){
      res.status(400).json({message:'rol no valido'})
    }
    user.Role = newRole;
    await user.save();
    return res.status(200).json({ message: 'Se cambió el rol correctamente' });
  } catch (error) {
    res.status(500).json({message:'error en ejecutar la funcion', error: error.message})
  }
}

const DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({_id: id});
    if(!user){
      return res.status(404).json({message:'no se encontro el usuario'});
    }
    if(user){
      await User.deleteOne({_id:id})
    }
    res.status(200).json({message:'se pudo eliminar el usuario'})
  } catch (error) {
    res.status(500).json({message:'no se pudo realizar la accion de borrar usuario, disculpe las molestias', error: error.message})
  }
}



module.exports = { createProduct, createCancha, getAllProducts, getAllCancha, getAllUsers, DeleteCanchas, DeleteProducts, DeleteUser, changeRole }