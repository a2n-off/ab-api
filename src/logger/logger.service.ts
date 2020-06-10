import { Injectable, LoggerService, Scope } from '@nestjs/common';

// @Injectable :
// This basically means every time the LoggerService gets injected in our
// application, it will create a new instance of the class. This is mandatory
// due to the prefix attribute. We do not want to have a single instance of the
// LoggerService and constantly override the prefix option.
@Injectable({scope: Scope.TRANSIENT})
export class BladeLogger implements LoggerService {

  private caller?: string;

  public setCaller(caller: string): void {
    this.caller = caller;
  }

  private static setLog(icon: string, message: string, caller?: string): string {
    return caller ? `${icon} [${caller}] ${message}` : `${icon} [no caller] ${message}`;
  }

  public log(message: string): string {
    return BladeLogger.setLog('🔊', message, this.caller);
  }

  public error(message: string, trace: string): string {
    return BladeLogger.setLog('🔥', `${message} ${trace}`, this.caller);
  }

  public warn(message: string): string {
    return BladeLogger.setLog('🚨', message, this.caller);
  }

  public debug(message: string): string {
    return BladeLogger.setLog('⚓', message, this.caller);
  }

  public verbose(message: string): string {
    return BladeLogger.setLog('🤖', message, this.caller);
  }
}
