
import { PageEvent } from '@angular/material/paginator';

export abstract class Pagination {
  totalItems = 1000;
  pageSize = 10;
  pageIndex = 0;
  currentPage = 1;

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.currentPage = this.pageIndex + 1;

    this.onPageChange();
  }

  abstract onPageChange(): void;

}