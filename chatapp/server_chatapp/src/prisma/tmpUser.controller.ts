import { Body, ConsoleLogger, Controller, Get, HttpException, HttpStatus, Injectable, Patch, Post } from "@nestjs/common";
import { TmpUserService } from "./tmpUserAdd.service";


// @Injectable()
@Controller('users')
export class TmpUserController{

    constructor(private readonly tmpUserAddService:TmpUserService){}

    @Post('addUser')
    async addUser(@Body() data: any){

        console.log(data);
        const user = await this.tmpUserAddService.createTmpUser(data);
        console.log(user);
    }
    @Patch('makeFriendship')
    async makeFriendship(@Body() {id, username}: {id: string, username: string}){
        const user1 = await this.tmpUserAddService.getTmpUser({where: {username: username}});
        const user  = await this.tmpUserAddService.getTmpUser({where:{id: id}});

        try{
            const [user1Friends, user2Friends] = await this.tmpUserAddService.makeFriendship(user, user1);
        }
        catch{
            throw new HttpException("user have ths friend", HttpStatus.BAD_REQUEST);
        }
    }

    @Patch('removeFriendship')
    async removeFriendship(@Body() {id, username}: {id: string, username: string}){
        const user1 = await this.tmpUserAddService.getTmpUser({where: {username: username}});
        const user  = await this.tmpUserAddService.getTmpUser({where:{id: id}});

        try{
            // console.log(user1, user);
            const [user1Friends, user2Friends] = await this.tmpUserAddService.removeFriendship(user, user1);
            // console.log(user1Friends, user2Friends);
        }
        catch{
            throw new HttpException("user don't have ths friend", HttpStatus.BAD_REQUEST);
        }

    }

    @Get('getAllUsers')
    async getAllUsers(){
        return (await this.tmpUserAddService.getAllUsers());
    }
}
