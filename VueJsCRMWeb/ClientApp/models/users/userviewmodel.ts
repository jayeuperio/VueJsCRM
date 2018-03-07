export interface IUserViewModel {
    userName: string;
    firstName: string;
    lastName: string;
    middleName: string;
    address: string;
    gender: number;
    authenticated: boolean;
    roles: string[];
    sessExp?: Date;
    position?: string;
}