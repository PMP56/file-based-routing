export default function handler(context){
    return context.html(`<h1>blogs ${context.get("slug")}</h1>`)
}