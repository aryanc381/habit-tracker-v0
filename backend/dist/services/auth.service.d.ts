interface ISignupInput {
    email: string;
    password: string;
    fullName: string;
}
interface ILoginInput {
    email: string;
    password: string;
}
export declare function signup(input: ISignupInput): Promise<{
    status: number;
    msg: string;
}>;
export declare function login(input: ILoginInput): Promise<{
    status: number;
    msg: string;
}>;
export {};
//# sourceMappingURL=auth.service.d.ts.map