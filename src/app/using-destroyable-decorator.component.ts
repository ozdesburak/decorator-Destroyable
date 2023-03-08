import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { StreamService } from "./stream.service";
import { Destroyable, untilDestroyed } from "./destroyable.decorator";

@Component({
  selector: "using-destroyable-decorator",
  template: `
    <h2>using decorator to simply the unsubscribes even further</h2>
  `
})
// 1
@Destroyable()
export class UsingDestroyableDecoratorComponent implements OnInit, OnDestroy {
  constructor(private stream: StreamService) {
    console.log("UsingDestroyableDecoratorComponent created");
  }

  ngOnInit() {
    this.stream.hot1$
        .pipe(
          // 2
          untilDestroyed(this)
        )
        .subscribe({
          next: console.log
        });

    this.stream.hot2$
        .pipe(
          untilDestroyed(this)
        )
        .subscribe({
          next: console.log
        });
  }

  ngOnDestroy() {
    console.log("UsingDestroyableDecoratorComponent destroyed");
  }
}
