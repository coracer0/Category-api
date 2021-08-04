import {Router} from 'express'
import {userController} from '../controllers/userController'
import {checkJwt} from '../middleware/jwt'

class UserRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',[checkJwt],userController.lista);
        this.router.put('/',userController.insert);
        
    }


}

const userRoutes = new UserRoutes();
export default userRoutes.router;