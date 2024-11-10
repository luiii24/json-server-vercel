// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const { NextResponse } = require('next/server');

const server = jsonServer.create()
// middleware.js
function middleware(request) {
    const customHeader = request.headers.get('x-ukk');
    if (!customHeader) {
        return NextResponse.redirect(new URL('https://www.lui.biz.id', request.url));
    }
    return NextResponse.next();
}
// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = {
    server,
    middleware,
    config: {
        matcher: '/', // Sesuaikan dengan jalur spesifik Anda
    },
};
