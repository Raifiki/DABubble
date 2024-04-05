export interface User{
    name: string;
    avatarImgPath: string;
    email: string;
    status?: 'Aktiv' | 'Abwesend';
}