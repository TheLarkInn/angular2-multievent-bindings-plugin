import '@angular/common';
import {EventManagerPlugin, EventManager} from '@angular/platform-browser/src/dom/events/event_manager';
import {Injectable} from '@angular/core';

@Injectable()
export class MultiEventPlugin extends EventManagerPlugin {
  manager: EventManager;
  getMultiEventArray(eventName: string): string[] {
    return eventName.split(",")
      .filter((item, index): boolean => { return item && item != '' })
  }

  supports(eventName: string): boolean {
    return this.getMultiEventArray(eventName).length > 1;
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    var zone = this.manager.getZone();
    var eventsArray = this.getMultiEventArray(eventName);

    // Entering back into angular to trigger changeDetection
    var outsideHandler = (event: any) => {
      zone.run(() => handler(event));
    };

    // Executed outside of angular so that change detection is not constantly triggered.
    var addAndRemoveHostListenersForOutsideEvents = () => {
      eventsArray.forEach((singleEventName: string) => {
        this.manager.addEventListener(element, singleEventName, outsideHandler);
      });
    }

    return this.manager.getZone().runOutsideAngular(addAndRemoveHostListenersForOutsideEvents);
  }

  addGlobalEventListener(target: string, eventName: string, handler: Function): Function {
    var zone = this.manager.getZone();
    var eventsArray = this.getMultiEventArray(eventName);
    var outsideHandler = (event: any) => zone.run(() => handler(event));

    return this.manager.getZone().runOutsideAngular(() => {
      eventsArray.forEach((singleEventName: string) => {
        this.manager.addGlobalEventListener(target, singleEventName, outsideHandler);
      })
    });
  }
}

