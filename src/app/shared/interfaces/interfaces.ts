export interface User{
    name: string;
    avatarImgPath: string;
    email: string;
    status?: 'Aktiv' | 'Abwesend';
    password: string;
}

export type OverlayType = 'hide' | 'dropDownUserMenu' | 'registeredUserProfile' | 'editProfile' | 'userProfile' | 'createChannel';
