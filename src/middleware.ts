import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authService from './services/auth-service'

export function middleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  
  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    if (!token || !authService.verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/admin/:path*'
}