// middleware.js
const { NextResponse } = require('next/server');

function middleware(request) {
    // Cek untuk header tertentu (misalnya, 'x-custom-header')
    const customHeader = request.headers.get('x-lui');

    // Jika header tidak ada, redirect ke URL lain
    if (!customHeader) {
        return NextResponse.redirect(new URL('https://www.example.com', request.url));
    }

    // Jika header ada, lanjutkan dengan permintaan
    return NextResponse.next();
}

// Menentukan jalur di mana middleware harus dijalankan
module.exports = {
    middleware,
    config: {
        matcher: '/', // Sesuaikan dengan jalur spesifik Anda
    },
};
