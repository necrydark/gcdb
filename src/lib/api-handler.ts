import { NextResponse } from 'next/server';
import { ApiResponse, ApiResponseBuilder, PaginationMeta } from './api-response';

export class ApiHandler {
  static success<T>(
    data: T,
    message?: string,
    pagination?: PaginationMeta,
    status: number = 200,
    requestId?: string
  ) {
    const response = ApiResponseBuilder.success(data, message, pagination, requestId);
    return NextResponse.json(response, { status });
  }

  static error(
    code: string,
    message: string,
    details?: any,
    status: number = 400,
    requestId?: string
  ) {
    const response = ApiResponseBuilder.error(code, message, details, requestId);
    return NextResponse.json(response, { status });
  }

  static notFound(resource = 'Resource', status: number = 404, requestId?: string) {
    const response = ApiResponseBuilder.notFound(resource, requestId);
    return NextResponse.json(response, { status });
  }

  static validationError(
    details: any,
    message = 'Validation failed',
    status: number = 422,
    requestId?: string
  ) {
    const response = ApiResponseBuilder.validationError(details, message, requestId);
    return NextResponse.json(response, { status });
  }

  static unauthorized(
    message = 'Unauthorized access',
    status: number = 401,
    requestId?: string
  ) {
    const response = ApiResponseBuilder.unauthorized(message, requestId);
    return NextResponse.json(response, { status });
  }

  static forbidden(
    message = 'Forbidden access',
    status: number = 403,
    requestId?: string
  ) {
    const response = ApiResponseBuilder.forbidden(message, requestId);
    return NextResponse.json(response, { status });
  }

  static serverError(
    message = 'Internal server error',
    details?: any,
    status: number = 500,
    requestId?: string
  ) {
    const response = ApiResponseBuilder.serverError(message, details, requestId);
    return NextResponse.json(response, { status });
  }

  static badRequest(
    message = 'Bad request',
    details?: any,
    status: number = 400,
    requestId?: string
  ) {
    const response = ApiResponseBuilder.badRequest(message, details, requestId);
    return NextResponse.json(response, { status });
  }

  static created<T>(
    data: T,
    message = 'Resource created successfully',
    requestId?: string
  ) {
    const response = ApiResponseBuilder.created(data, message, requestId);
    return NextResponse.json(response, { status: 201 });
  }

  static updated<T>(
    data: T,
    message = 'Resource updated successfully',
    requestId?: string
  ) {
    const response = ApiResponseBuilder.updated(data, message, requestId);
    return NextResponse.json(response, { status: 200 });
  }

  static deleted(
    message = 'Resource deleted successfully',
    requestId?: string
  ) {
    const response = ApiResponseBuilder.deleted(message, requestId);
    return NextResponse.json(response, { status: 200 });
  }

  static cors(allowedOrigin?: string) {
    const origin = allowedOrigin || 
      (process.env.NODE_ENV === 'production' 
        ? 'http://gcwiki.vercel.app' 
        : 'http://localhost:3333');

    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true"
      }
    });
  }

  static withCorsHeaders(response: NextResponse, allowedOrigin?: string) {
    const origin = allowedOrigin || 
      (process.env.NODE_ENV === 'production' 
        ? 'http://gcwiki.vercel.app' 
        : 'http://localhost:3333');

    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    
    return response;
  }
}