interface IUserPhotosData{
    username: string;
    userAvatar: string;
    userBackground: string;
}

interface IUserThemesData{
    username: string;
    lights: boolean;
}

interface IUserRolesData{
    username: string;
    roles: string[] = [];
}

export {
    IUserPhotosData,
    IUserRolesData,
    IUserThemesData
}