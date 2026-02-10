export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    timestamp: string;
    requestId?: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  meta: {
    timestamp: string;
    requestId?: string;
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export class ApiResponseBuilder {
  static success<T>(
    data: T,
    message?: string,
    pagination?: PaginationMeta,
    requestId?: string
  ): ApiSuccessResponse<T> {
    return {
      success: true,
      data,
      message,
      meta: {
        pagination,
        timestamp: new Date().toISOString(),
        requestId
      }
    };
  }

  static error(
    code: string,
    message: string,
    details?: any,
    requestId?: string
  ): ApiErrorResponse {
    return {
      success: false,
      error: {
        code,
        message,
        details
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId
      }
    };
  }

  static notFound(resource = 'Resource', requestId?: string): ApiErrorResponse {
    return this.error(
      'NOT_FOUND',
      `${resource} not found`,
      undefined,
      requestId
    );
  }

  static validationError(
    details: any,
    message = 'Validation failed',
    requestId?: string
  ): ApiErrorResponse {
    return this.error('VALIDATION_ERROR', message, details, requestId);
  }

  static unauthorized(
    message = 'Unauthorized access',
    requestId?: string
  ): ApiErrorResponse {
    return this.error('UNAUTHORIZED', message, undefined, requestId);
  }

  static forbidden(
    message = 'Forbidden access',
    requestId?: string
  ): ApiErrorResponse {
    return this.error('FORBIDDEN', message, undefined, requestId);
  }

  static serverError(
    message = 'Internal server error',
    details?: any,
    requestId?: string
  ): ApiErrorResponse {
    return this.error('SERVER_ERROR', message, details, requestId);
  }

  static badRequest(
    message = 'Bad request',
    details?: any,
    requestId?: string
  ): ApiErrorResponse {
    return this.error('BAD_REQUEST', message, details, requestId);
  }

  static created<T>(
    data: T,
    message = 'Resource created successfully',
    requestId?: string
  ): ApiSuccessResponse<T> {
    return this.success(data, message, undefined, requestId);
  }

  static updated<T>(
    data: T,
    message = 'Resource updated successfully',
    requestId?: string
  ): ApiSuccessResponse<T> {
    return this.success(data, message, undefined, requestId);
  }

  static deleted(
    message = 'Resource deleted successfully',
    requestId?: string
  ): ApiSuccessResponse<null> {
    return this.success(null, message, undefined, requestId);
  }
}