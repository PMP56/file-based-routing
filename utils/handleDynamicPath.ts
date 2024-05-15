import fs from "fs";

export async function handleDynamicRoute(pathname: string) {
    try {
        const allFiles = await fs.promises.readdir(pathname);
        const file = allFiles.find((f) => f.match(/\[[a-zA-Z0-9\._]+\]/));

        const param = file?.replace("[", "").replace("].js", "");
        return { file, param };
    } catch (e) {
        return false;
    }
}
