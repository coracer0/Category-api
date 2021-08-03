import {Router} from 'express'
import {userController} from '../controllers/userController'
import {checkJwt} from '../middleware/jwt'
import {checkRol} from '../middleware/rols'

class UserRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',[checkJwt,checkRol([1,2])],userController.lista);
        this.router.get('/med/',[checkJwt,checkRol([1])],userController.listaMedicos);
        this.router.get('/pac/',[checkJwt,checkRol([1])],userController.listaPacientes);
        this.router.put('/',[checkJwt,checkRol([1,2])],userController.insert);
        
    }


}

const userRoutes = new UserRoutes();
export default userRoutes.router;