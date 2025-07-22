interface IUser{
    username: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userNickname: string;
    userDateOfBirth: Date;
    status: boolean;
}

interface IUserData extends IUser{
    userAvatar?: string;
    userBackground?: string;
}

interface IUserAuthData{
    username: string;
    password: string;
    status: boolean;
}

interface IUserAuthLog{
    username: string;
    token: string;
}

interface IUserRecoveryKeyData{
    username: string;
    key: string;
}