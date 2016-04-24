# angular2-multievent-bindings-plugin
A small plugin that allows for binding multiple events into an Angular2 template. 

Currently there is no way to bind multiple events to one expression in angular2 templates like this: 

```html

	<input type='text' (click,keypress,mousedown)=expressionIdWantToExecuteForAllOfTheseEvents($event) />

```

This plugin allows you to do this!!!


# Useage
import this plugin from your node modules and then add it to your `EVENT_MANAGER_PLGUINS`:

```typescript
	
	import {MultiEventPlugin} from 'angular2-multievent-bindings-plugin';
	import {EVENT_MANAGER_PLGUINS} from 'angular2/platform/common_dom';
	import {bootstrap} from 'angular2/platform/browser';
	import {provide} from 'angular2/core';
	import {App, APP_PROVIDERS} from './app';

	bootstrap(App, [
		APP_PROVIDERS,
		provide(EVENT_MANAGER_PLUGINS, { multi: true, useClass: MultiEventPlugin})
	]).catch((error) => console.error)



```