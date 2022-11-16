const {OrdenesDaoFactory} = require ('../classes/DaoFactory.class.js') 
const DAO = OrdenesDaoFactory.getDao()

export class OrdenesController{
    async getOrdenes(req, res){
        try {
            const verOrdenes = await DAO.getAll()
            res.status(200).json(verOrdenes)
        } catch (error) {
            res.status(error.errorCode).send(error.message); 
        }
    }
    async getOrdersByMail(req, res){ 
        try {
            const username = req.user.username
            let verOrden = await DAO.getByusername(username)
            res.status(200).json(verOrden)
        } catch (error) {  
            res.status(error.errorCode).send(error.message);
        }
    }
}