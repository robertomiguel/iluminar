import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   const session = await getToken({ req: request })

    if (!session) {

      const resPage = request.nextUrl.pathname
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('p', resPage)

      return NextResponse.redirect(url)

    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/control', '/pantalla', '/colorfill'],
}