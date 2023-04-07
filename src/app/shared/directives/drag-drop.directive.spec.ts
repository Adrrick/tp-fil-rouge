import { ElementRef } from '@angular/core';
import { DragDropDirective } from './drag-drop.directive';


class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('DragDropDirective', () => {
  it('should create an instance', () => {
    const directive = new DragDropDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
