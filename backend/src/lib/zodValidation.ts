import zod from 'zod';

export async function zodValidator(schema: zod.ZodType, body: unknown) {
    const parsed = schema.safeParse(body);
    if(!parsed.success) {
        const formattedErrors = parsed.error.issues.map((err: any) => ({ path: err.path[0], msg: err.message }));
        return { status: 403, msg: 'zod validation failed', error: formattedErrors }
    }
    return { status: 200, msg: 'zod validation success', object: parsed.data }
}