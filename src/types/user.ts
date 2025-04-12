export interface IUser {
    _id: string;
    Name: string;
    Email: string;
    Password: string;
    UserType: 'user' | 'admin';
    Address: string;
    Phone: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    ProfileImage: string;
  }