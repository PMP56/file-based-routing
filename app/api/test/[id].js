export function get(context){
    return context.json({"slug": context.get("slug")})
}