require('dotenv').config();
const { response, request } = require('express');
const { User } = require('../models/userModel');
const { Product } = require('../models/productModel');
const { Cancha } = require('../models/canchaModel')



// Zone of products

const createProduct = async (req, res) => {
  //we request from the front the title description price and url of a img
  const { Title, Description, Price, Url} = req.body;
  try {
    //we find a product with title and description
    const product = await Product.findOne({Title, Description});
    //if it existe we return a response 400
    if(product) {
      return res.status(400).json({message: 'ya existe el producto'});
    };
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
    };
  } catch (error) {
    res.status(500).json({message: 'no se pudo realizar la accion de crear productos, disculpe las molestias.', error: error.message});
  };
};

const getAllProducts = async (req, res) => {
  try {
    //we use find({}) to get all productos from the server
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'no se pudo realizar la accion de obtener los productos, disculpe las molestias', error: error.message});
  };
};

const DeleteProducts = async (req, res) => {
  //we use the id from the mongoDB
  const { id } = req.body;
  try {
    // the number from the front is a id, then use these id to find the product in the data base
    const product = await Product.findOne({_id: id});
    // we check if the product exist
    if(!product){
      return res.status(404).json({message: 'no existe el producto'});
    };
    // and if it exist we delete the product by id
    if(product){
      await Product.deleteOne({_id: id});
    };
    res.status(200).json({message:'se pudo eliminar el producto'});
  } catch (error) {
    res.status(500).json({message: 'no se pudo realizar la accion de borrar los productos, disculpe las molestias', error: error.message});
  };
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Zone of canchas

const createCancha = async (req, res) => {
  //we request from the front the title description and url of a img
  const { Title, Description, Url} = req.body
  try {
    //we find a product with title and description
    const cancha = await Cancha.findOne({Title, Description});
    //if it existe we return a response 400
    if(cancha) {
      return res.status(400).json({message: 'ya existe la cancha'});
    };
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
    };
  } catch (error) {
    res.status(500).json({message: 'no se pudo realizar la accion de crear cancha, disculpe las molestias', error: error.message});
  };
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
  const { id } = req.body;
  try {2
    // the number from the front is a id, then use these id to find the cancha in the data base
    const canchas = await Cancha.findOne({_id: id})
    //we check if the cancha exist
    if(!canchas){
      return res.status(404).json({message:'no existe la cancha'})
    };
    //if it exist we delete the cancha by id
    if(canchas){
      await Cancha.deleteOne({_id: id})
    };
    res.status(200).json({message: 'se pudo borrar con exito'})
  } catch (error) {
    res.status(500).json({message: 'no se pudo realizar la accion de borrar canchas, disculpe las molestias', error: error.message})
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Zone of users

const getAllUsers = async(req, res) => {
  try {
    // we use find({}) to get all from users in the data base
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'No se pudieron encontrar usuarios, no se pudo realizar la accion, disculpe las molestias.', error: error.message });
  };
};

const UserDisable = async (req, res) => {
  //we use the id from the mongoDB
  const { id } = req.body;
  try {
    // we use findone({}) to get the user with the same id
    const users = await User.findOne({_id: id})
    // we check if the user exist
    if(!users){
      return res.status(400).json({message:'no se encontro al usuario'})
    };
    // we check if the user is master
    if(users.role === "Master"){
      return res.status(401).json({message: 'No puedes cambiar tu estado si eres Master'})
    };
    //and if the user is not active we execute the next.
    if(!users.isActive){
      users.isActive = true;
    } else {
      users.isActive = false;
    };
    //we save it in the data base
    await users.save();
    res.status(200).json({message: 'se pudo desactivar el usuario con exito'})
  } catch (error) {
    res.status(500).json({ message: 'No se pudieron encontrar usuarios, no se pudo realizar la accion, disculpe las molestias.', error: error.message });
  };
};

const changeRole = async(req, res) => {
  //we request from the front the id and the role
  const { id } = req.body;
  try {
     // we use findone({}) to get the user with the same id
    const user = await User.findOne({ _id: id });
    // we check if the user exist
    if(!user){
      return res.status(400).json({message:'el usuario no existe'})
    };
    //we check if the role of the user is ecual to master
    if (user.role === 'Master') {
      return res.status(401).json({ message: 'No puedes cambiar tu rol de "Master"' });
    };
    //if user is an admin we change the role to client and if the role is client we change to admin
    if(user.role === 'admin'){
      user.role = 'client'
    } else {
      user.role = 'admin'
    };
    //we save it in the data base
    await user.save();
    return res.status(200).json({ message: 'Se cambió el rol correctamente' });
  } catch (error) {
    res.status(500).json({message:'error en ejecutar la funcion', error: error.message})
  };
};

const DeleteUser = async (req, res) => {
 //we use the id from the mongoDB
  const { id } = req.body;
  try {
    const user = await User.findOne({_id: id});
    //if it doesnt exist we return a response 404
    if(!user){
      return res.status(404).json({message:'no se encontro el usuario'});
    };
    if (user.role === 'Master') {
      return res.status(401).json({ message: 'No puedes eliminarte, eres Master' });
    };
    //if it exist we delete the user by id
    await user.deleteOne({_id:id})
    res.status(200).json({message:'se pudo eliminar el usuario'})
  } catch (error) {
    res.status(500).json({message:'no se pudo realizar la accion de borrar usuario, disculpe las molestias', error: error.message})
  }
}



module.exports = { createProduct, createCancha, getAllProducts, getAllCancha, getAllUsers, DeleteCanchas, DeleteProducts, DeleteUser, changeRole, UserDisable}