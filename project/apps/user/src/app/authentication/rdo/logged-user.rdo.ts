import { Expose } from "class-transformer";

export class LoggedUserInfo {
    @Expose()
    public id: string;

    @Expose()
    public email: string;

    @Expose()
    public accessToken: string;
}