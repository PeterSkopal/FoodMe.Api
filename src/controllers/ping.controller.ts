import { Get, Route, Controller, Tags } from 'tsoa';

@Route('ping')
@Tags('Ping')
export class PingController extends Controller {
  
  @Get()
  public getPong(): string {
    return 'pong';
  }
}
