//request_types
interface IUserSignUpRequestData{
    username: string;
    password: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userNickname: string;
    userDateOfBirth: Date;
}

interface IUserSignInRequestData{
    username: string;
    password: string;
}

export {
    IUserSignUpRequestData,
    IUserSignInRequestData
}