// const { ObjectId } = require('mongodb');
require('dotenv').config();
const dayjs = require('dayjs');
const connection = require('./connection');

const getAllMessages = async () => {
  try {
    const db = await connection();
    // console.log('inside getAllMessages db');
    // const allMessages = await db.collection(process.env.DB_NAME).find({}).toArray();
    const allMessages = await db.collection('messages').find({}).toArray();
    // console.log('allMessages', allMessages);
    return allMessages;
  } catch (err) {
    console.log('Error', err);
  }
};

const storeMessage = async (nickname, chatMessage) => {
  try {
    console.log('storeMessage', nickname, chatMessage);
    const dateToStore = dayjs(new Date()).format('DD-MM-YYYY hh:mm:ss');
    const db = await connection();
    await db.collection('messages').insertOne({
      nickname,
      chatMessage,
      created_on: dateToStore,
    });
    const messageReady = `${dateToStore} - ${nickname}: ${chatMessage}`;
    return messageReady;
  } catch (err) {
    console.log('Error', err);
  }
};

module.exports = {
  getAllMessages,
  storeMessage,
};
