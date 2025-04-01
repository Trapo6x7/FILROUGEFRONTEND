import { NextResponse } from 'next/server'

export function middleware(request) {
  const authToken = request.cookies.get('token')?.value // Ajout de ?.value
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'

  console.log('Middleware check:', {
    token: authToken,
    path: request.nextUrl.pathname,
    isAuthPage
  })

  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}