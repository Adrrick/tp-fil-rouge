import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

export abstract class Pagination {
  totalItems = 1000;
  pageSize = 20;
  pageIndex = 0;
  currentPage = 1;

  constructor(route: ActivatedRoute) {
    this.handleDefaultPage(route);
  }

  private handleDefaultPage(route: ActivatedRoute): void {
    this.setCurrentPage(parseInt(route.snapshot.queryParamMap.get('page') || "1", 10));
  }

  public handlePageEvent(e: PageEvent) {
    this.setCurrentPage(e.pageIndex + 1);

    this.onPageChange();
  }

  public setCurrentPage(page: number) {
    this.pageIndex = page - 1;
    this.currentPage = page;
  }

  abstract onPageChange(): void;

}