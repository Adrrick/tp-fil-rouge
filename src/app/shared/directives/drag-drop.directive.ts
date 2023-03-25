import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[tpFilRougeDropFile]',
  standalone: true
})
export class DragDropDirective implements OnInit, OnDestroy {
  @Output() public fileDropped: EventEmitter<FileList> = new EventEmitter<FileList>();
  @Input() public multiple = true;

  public input!: HTMLInputElement;

  private onChangeHandler = this.onChange.bind(this);

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.input = this.buildInput();
    this.input.addEventListener('change', this.onChangeHandler);
    this.el.nativeElement.append(this.input);
  }

  public onChange(e: any): void {
    this.fileDropped.emit(e.target.files);
    this.input.value = '';
  }

  @HostListener('click')
  public onClick(): void {
    this.input.click();
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  public onDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
  
    const files = e.dataTransfer?.files;
  
    if (files) {
      this.fileDropped.emit(files);
    }
  }

  private buildInput = (): HTMLInputElement => {
    const random = Math.floor(Math.random() * 100);
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = this.multiple;
    input.name = 'files' + random;
    input.id = 'files' + random;
    input.style.display = 'none';

    return input;
  }

  public ngOnDestroy(): void {
    this.input.removeEventListener('change', this.onChangeHandler);
  }
}