import { IsString, IsNotEmpty, IsBoolean, isNumber, IsNumber } from 'class-validator';
import { user } from '../types/user';

export class userDataDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    // @IsBoolean()
    @IsString()
    @IsNotEmpty()
    isAdmin: string = "false";

}

export class messageDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    conversationId: string;

    @IsString()
    @IsNotEmpty()
    from?: string;

    @IsString()
    @IsNotEmpty()
    event?: string;
}

export class CreateChannelDto{
    @IsNotEmpty()
    @IsString()
    channelName: string;

    @IsNotEmpty()
    @IsString()
    channelPic:string;
    
    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    admines?: string[]

    @IsNotEmpty()
    @IsString()
    creator: string


    @IsNotEmpty()
    members?: user[]
}

export class ChangeChannelDataDto{
    @IsNotEmpty()
    @IsString()
    channelName: string;
    
    @IsNotEmpty()j
    @IsString()
    password?: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    channelId: string;
    
    @IsNotEmpty()
    @IsString()
    userId: string

    removeAdmins?: user[];
    addAdmins?: user[];
}

export class JoinChannelDto{
    @IsNotEmpty()
    @IsString()
    channelId: string;

    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsNotEmpty()
    @IsString()
    userId:string;
}

// export class channelDeleteDto{
//     @IsNotEmpty()
//     @IsString()
//     channelId:string;

//     @IsNotEmpty()
//     @IsString()
//     userId:string;
// }

// export class RemoveUserFromChannelDto{
//     @IsNotEmpty()
//     @IsString()
//     channelId:string;

//     @IsNotEmpty()
//     @IsString()
//     userId:string;

//     @IsNotEmpty()
//     @IsString()
//     userToRemove:string;
// }

export class ChannelEditDto{
    @IsNotEmpty()
    @IsString()
    channelId:string;

    @IsNotEmpty()
    @IsString()
    userId:string;


    @IsString()
    userId2?:string;
}

export class ConversationInfoDto{
    @IsNotEmpty()
    @IsNumber()
    conversationId:string;

    @IsNotEmpty()
    @IsString()
    userId:string;

}

































