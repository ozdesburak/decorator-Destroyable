/**
 * Adopted to Angular 8 from https://github.com/pgiemza/ng2-rx-destroyable-component
 */

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

const DESTROYED_NOTIFIER_NAME = "__destroyedNotifier$";

// This decorator WILL NOT WORK on a service as a service does not have ngOnInit
export function Destroyable() {
  return (target: any) => {
    const targetPrototype = target.prototype;
    const originalOnDestroy = targetPrototype.ngOnDestroy;
    const originalOnInit = targetPrototype.ngOnInit;
    const originalOnChanges = targetPrototype.ngOnChanges;

    
    // Override the ngOnInit of the component to create &
    // initialize the __destroyedNotifier$ if it's not already
    // initialized in ngOnChanges
    targetPrototype.ngOnInit = function() {
      this[DESTROYED_NOTIFIER_NAME] =
        this[DESTROYED_NOTIFIER_NAME] || new Subject();

      if (originalOnInit) {
        originalOnInit.apply(this);
      }
    };

    // Override the ngOnChanges of the component to create &
    // initialize the __destroyedNotifier$
    targetPrototype.ngOnChanges = function(...args) {
      this[DESTROYED_NOTIFIER_NAME] =
        this[DESTROYED_NOTIFIER_NAME] || new Subject();

      if (originalOnChanges) {
        originalOnChanges.apply(this, args);
      }
    };

    // Override the ngOnDestroy of the component to
    // indicate the component is destroyed by emitting
    // __destroyedNotifier$
    targetPrototype.ngOnDestroy = function() {
      if (originalOnDestroy) {
        originalOnDestroy.apply(this);
      }

      this[DESTROYED_NOTIFIER_NAME].next();
      this[DESTROYED_NOTIFIER_NAME].complete();
    };
  };
}

export function untilDestroyed<T>(target: any) {
  return takeUntil<T>(target[DESTROYED_NOTIFIER_NAME]);
}
