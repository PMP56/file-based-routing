# File Based Routing

This is a very basic implementation of a file based routing system, similar to what popular frameworks like NextJS use. It uses [Bun](https://bun.sh) JS runtime and [Hono](https://hono.dev/) to setup a HTTPServer.

To run:

`bun run index.ts`

To watch for changes, run:

`bun --watch index.ts`

#### This is how file based routing works:

Each page within the `app` folder is mapped to that particular route in the browser. `index.js` is the default file for each root/subroot but you can also declare routes with other filename such as `blog.js` or `user.js`.

For e.g:

-   `/app/index.js` corresponds to the base URL i.e. `localhost:3000`
-   `/app/blog.js` corresponds to route `localhost:3000/blog`
-   `/app/user.js` corresponds to route `localhost:3000/user`
-   `/app/user/index.js` also corresponds to route `localhost:3000/user`

> Its important to know that each file must have a default export function. Otherwise the module/page wouldn't be found.

There is also support for dynamic routes such as `/[id].js` or `/[userId].js` that would provide the slug/parameter in the context of the default page component. For e.g:

-   `/app/blog/[id].js` corresponds to routes such as `localhost:3000/blog/1` or `localhost:3000/blog/2` or any other route that matches the pattern.

Finally, you can also created API endpoints and respective method functions `GET`, `POST`, `DELETE` or `PUT`.
For e.g.

`/app/api/test/index.js`

```js
export function get(context) {
    return context.json({ msg: "test data" });
}
```

You can call the GET method at this route and it should return the corresponding response. You can also declare POST method as:

```js
export function post(context) {
    //statements here
}
```
