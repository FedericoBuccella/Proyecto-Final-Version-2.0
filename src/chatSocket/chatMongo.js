import { Server as IOServer} from 'socket.io'
import logger from '../config/winston.js'
import ChatDaoFactory from './chatDAOFactory.js'
const DAO = ChatDaoFactory.getDao()
// LADO SERVIDOR
export default async function configChatMongo(expressServer){
    const io = new IOServer(expressServer)
    
    io.on('connection', async socket=>{
        let chatmessages= await DAO.getAll()
        io.emit('serverSend:message',chatmessages)
        try {
            socket.on('client:message', async messageInfo=>{
                try {
                    await DAO.create(messageInfo)
                    chatmessages = await DAO.getAll()
                    
                } catch (error) {
                    console.log(error)
                }
                io.emit('serverSend:message', chatmessages)//EMITO CHATS
            })
           
        } catch (error) {
            logger.error('problema chat lado server', error)
        }
    })
}