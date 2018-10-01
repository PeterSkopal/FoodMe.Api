import { Get, Route, Controller, Tags } from 'tsoa';

@Tags('Ping')
@Route('ping')
export class PingController extends Controller {
  
  @Get()
  public getPong(): string {
    return 'pong';
  }
}
