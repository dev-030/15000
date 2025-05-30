import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    
    const response = NextResponse.redirect(new URL(request.url));
    const refreshToken = request.cookies.get('refresh_token')?.value;
    
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {

        const res = await fetch("https://v1.edcluster.com/auth/token/refresh/", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${refreshToken}`,
            },
        }).then((res) => res.json());

        if(!res.access_token) return NextResponse.redirect(new URL('/login', request.url));
        
        response.cookies.set('access_token', res.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            ...(process.env.NODE_ENV === 'production' && {
                domain: '.edcluster.com',
            }),
            expires: new Date(Date.now() + 1000 * 60 * res.expires)        
        });
        
        return response;

    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
}