import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsocketService } from './websocket.service';
import { WebSocketConfig } from '../_models/WSinterfaces';
import { config } from './websocket.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    WebsocketService
  ]
})
export class WebsocketModule {
  public static config(wsConfig: WebSocketConfig): ModuleWithProviders<any> {
    return {
      ngModule: WebsocketModule,
      providers: [{ provide: config, useValue: wsConfig }]
    };
  }
}
