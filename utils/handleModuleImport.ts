import type { Context } from "hono";

export async function handleModuleImport(pathname: string, context: Context) {
    const { req } = context;
    try {
        const module = await import(pathname);
        const httpMethod = req.method.toLowerCase();

        if (module[httpMethod]) {
            return module[httpMethod](context);
        } else {
            return module.default(context);
        }
    } catch (e) {
        return false;
    }
}
