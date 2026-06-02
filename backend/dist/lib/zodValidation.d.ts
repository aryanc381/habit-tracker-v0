import zod from 'zod';
export declare function zodValidator(schema: zod.ZodType, body: unknown): Promise<{
    status: number;
    msg: string;
    error: {
        path: any;
        msg: any;
    }[];
    object?: never;
} | {
    status: number;
    msg: string;
    object: unknown;
    error?: never;
}>;
//# sourceMappingURL=zodValidation.d.ts.map