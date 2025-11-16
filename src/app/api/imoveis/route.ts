import { NextRequest } from 'next/server'
import imovelService from '@/services/imovel-service'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const imovel = await imovelService.create(body)
    return successResponse(imovel, 'Imóvel criado', 201)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}

export async function GET(req: NextRequest) {
  try {
    const cidade = req.nextUrl.searchParams.get('cidade') || undefined
    const imoveis = await imovelService.list({ cidade })
    return successResponse(imoveis)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}