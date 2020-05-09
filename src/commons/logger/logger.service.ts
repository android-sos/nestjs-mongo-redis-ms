import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class LoggerService extends Logger {
  private errorLevel: string;
  private _context = '';
  constructor(private configService: ConfigService) {
    super();
    this.errorLevel = (this.configService.get('LOGGER_SETTINGS') || 'OFF').split(',');
  }
    
  setContext(context: string) {
    this._context = context;
  }

  getLevelFromSettings(level: string) {
    return !this.errorLevel.includes('OFF') &&
    this.errorLevel.includes(level)
     ? true: false;
   
  }

  info(message: string, context?: string) {
    this.getLevelFromSettings('info') ? 
    Logger.log(JSON.stringify(message), context || this._context)
    :
    false;
  }

  log(message: string, context?: string) {
    this.getLevelFromSettings('log') ? 
    Logger.log(JSON.stringify(message), context || this._context)
    :
    false;
  }
  error(message: string, trace?: string, context?: string) {
    this.getLevelFromSettings('error') ? 
    Logger.error(JSON.stringify(message), trace, context || this._context)
    :
    false;
  }
  warn(message: string, context?: string) {
    this.getLevelFromSettings('warn') ? 
    Logger.warn(JSON.stringify(message), context || this._context)
    :
    false;
  }
  debug(message: string, context?: string) {
    this.getLevelFromSettings('debug') ? 
    Logger.debug(JSON.stringify(message), context || this._context)
    :
    false;
  }

}