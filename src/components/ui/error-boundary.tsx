import React from 'react';

export interface ErrorInfo {
  error: Error;
  context?: string;
  userId?: string;
  additionalData?: Record<string, any>;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  tags?: string[];
}

export interface LoggerConfig {
  enableConsoleLogging: boolean;
  enableServerLogging: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  apiEndpoint?: string;
}

class Logger {
  private config: LoggerConfig;
  private errorQueue: ErrorInfo[] = [];
  private isOnline = typeof window !== 'undefined' ? navigator.onLine : true;

  constructor(config: LoggerConfig) {
    this.config = config;
    
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());
      
      window.addEventListener('beforeunload', () => {
        this.flush();
      });
    }
  }

  private handleOnline() {
    this.isOnline = true;
    this.flushQueue();
  }

  private handleOffline() {
    this.isOnline = false;
  }

  private async flushQueue() {
    if (this.errorQueue.length === 0) return;

    const errorsToLog = [...this.errorQueue];
    this.errorQueue = [];

    if (!this.config.enableServerLogging || !this.config.apiEndpoint) {
      return;
    }

    try {
      await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ errors: errorsToLog }),
      });
    } catch (error) {
      console.warn('Failed to log errors to server:', error);
      this.errorQueue.unshift(...errorsToLog);
    }
  }

  private async log(errorInfo: ErrorInfo) {
    if (this.config.enableConsoleLogging) {
      const method = this.getConsoleMethod(errorInfo.severity);
      method(`[${errorInfo.severity.toUpperCase()}] ${errorInfo.context || 'Unknown'}`, {
        error: errorInfo.error,
        additionalData: errorInfo.additionalData,
        timestamp: errorInfo.timestamp,
      });
    }

    if (this.config.enableServerLogging && this.config.apiEndpoint) {
      if (this.isOnline) {
        await this.flushQueue();
        this.errorQueue.push(errorInfo);
        await this.flushQueue();
      } else {
        this.errorQueue.push(errorInfo);
      }
    }
  }

  private getConsoleMethod(severity: ErrorInfo['severity']) {
    switch (severity) {
      case 'low':
        return console.debug;
      case 'medium':
        return console.info;
      case 'high':
        return console.warn;
      case 'critical':
        return console.error;
      default:
        return console.log;
    }
  }

  private createErrorInfo(
    error: Error,
    context?: string,
    additionalData?: Record<string, any>,
    severity: ErrorInfo['severity'] = 'medium'
  ): ErrorInfo {
    return {
      error,
      context,
      additionalData,
      timestamp: new Date(),
      severity,
    };
  }

  async error(error: Error | string, context?: string, additionalData?: Record<string, any>) {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    const errorInfo = this.createErrorInfo(errorObj, context, additionalData, 'high');
    await this.log(errorInfo);
  }

  async warn(error: Error | string, context?: string, additionalData?: Record<string, any>) {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    const errorInfo = this.createErrorInfo(errorObj, context, additionalData, 'medium');
    await this.log(errorInfo);
  }

  async info(message: string, context?: string, additionalData?: Record<string, any>) {
    const errorInfo = this.createErrorInfo(new Error(message), context, additionalData, 'low');
    await this.log(errorInfo);
  }

  async debug(message: string, context?: string, additionalData?: Record<string, any>) {
    if (this.config.logLevel !== 'debug') return;
    
    const errorInfo = this.createErrorInfo(new Error(message), context, additionalData, 'low');
    await this.log(errorInfo);
  }

  async critical(error: Error | string, context?: string, additionalData?: Record<string, any>) {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    const errorInfo = this.createErrorInfo(errorObj, context, additionalData, 'critical');
    await this.log(errorInfo);
  }

  setConfig(config: Partial<LoggerConfig>) {
    this.config = { ...this.config, ...config };
  }

  async flush() {
    await this.flushQueue();
  }

  getErrorCount(): number {
    return this.errorQueue.length;
  }

  getQueuedErrors(): ErrorInfo[] {
    return [...this.errorQueue];
  }
}

const defaultConfig: LoggerConfig = {
  enableConsoleLogging: process.env.NODE_ENV === 'development',
  enableServerLogging: process.env.NODE_ENV === 'production',
  logLevel: 'info',
  apiEndpoint: '/api/errors',
};

export const logger = new Logger(defaultConfig);

export class ErrorHandler {
  static async handleApiError(error: any, context?: string): Promise<never> {
    const errorInfo = typeof error === 'string' ? error : error?.message || 'Unknown API error';
    
    await logger.error(errorInfo, context, {
      status: error?.status,
      url: error?.url,
      method: error?.method,
      response: error?.response,
    });

    throw new Error(errorInfo);
  }

  static async handleValidationError(error: any, context?: string): Promise<never> {
    await logger.warn('Validation error', context, {
      validationErrors: error,
    });

    throw new Error('Validation failed');
  }

  static async handleNetworkError(error: any, context?: string): Promise<never> {
    await logger.error('Network error', context, {
      networkError: true,
      message: error.message,
      code: error.code,
    });

    throw new Error('Network connection failed');
  }

  static async handleAuthError(error: any, context?: string): Promise<never> {
    await logger.warn('Authentication error', context, {
      authError: true,
      message: error.message,
    });

    throw new Error('Authentication failed');
  }

  static async handleDatabaseError(error: any, context?: string): Promise<never> {
    await logger.error('Database error', context, {
      databaseError: true,
      message: error.message,
      code: error.code,
    });

    throw new Error('Database operation failed');
  }

  static async handleGenericError(error: any, context?: string): Promise<never> {
    await logger.error('Generic error', context, {
      message: error.message,
      stack: error.stack,
    });

    throw error || new Error('An unexpected error occurred');
  }

  static wrapAsync<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    context?: string
  ): T {
    return (async (...args: Parameters<T>) => {
      try {
        return await fn(...args);
      } catch (error) {
        await this.handleGenericError(error, context);
      }
    }) as T;
  }

  static wrap<T extends (...args: any[]) => any>(
    fn: T,
    context?: string
  ): T {
    return ((...args: Parameters<T>) => {
      try {
        return fn(...args);
      } catch (error) {
        this.handleGenericError(error, context);
      }
    }) as T;
  }
}

export function createErrorBoundary(
  onError: (error: Error, errorInfo: React.ErrorInfo) => void
) {
  class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error: Error | null }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      logger.error(error, 'React Error Boundary', errorInfo);
      onError(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-red-600">Something went wrong</h2>
              <p className="text-muted-foreground mt-2">
                An unexpected error occurred. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Refresh Page
              </button>
            </div>
          </div>
        );
      }

      return this.props.children;
    }
  }

  return ErrorBoundary;
}

export default logger;