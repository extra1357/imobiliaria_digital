import { NextRequest } from 'next/server'
import leadService from '@/services/lead-service'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const lead = await leadService.create(body)
    return successResponse(lead, 'Lead criado', 201)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}

export async function GET() {
  try {
    const leads = await leadService.list()
    return successResponse(leads)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}