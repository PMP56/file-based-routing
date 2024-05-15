import { Hono, type Context } from "hono";
import fs from "fs";
import path from "path";
import { handleModuleImport } from "./utils/handleModuleImport";
import { handleDynamicRoute } from "./utils/handleDynamicPath";

const app = new Hono<{ Variables: any }>();
const ROOT_DIR = path.resolve(import.meta.dirname, "app");

app.all("/*", async (c) => {
    let filePath = ROOT_DIR + c.req.path;
    const isFile = fs.existsSync(filePath + ".js");

    if (isFile) {
        filePath += ".js";
    } else {
        filePath += "/index.js";
    }

    let data = await handleModuleImport(filePath, c);
    if (!data) {
        //check if dynamic route exists
        const pathArray = (ROOT_DIR + c.req.path).split("/");
        const slug = pathArray.pop();
        const newPath = pathArray.join("/");

        const dynamicRouteDetails = await handleDynamicRoute(newPath);
        if (!dynamicRouteDetails) {
            return c.notFound();
        }

        c.set("slug", slug);
        const modulePath = [newPath, dynamicRouteDetails.file].join("/");
        data = await handleModuleImport(modulePath, c);

        return data;
    } else {
        return data;
    }
});

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 3000,
});
