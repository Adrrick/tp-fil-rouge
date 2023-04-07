import { Pipe, PipeTransform } from '@angular/core';
import User from 'src/app/models/User';

@Pipe({
  name: 'filteredUsers',
  standalone: true,
})
export class FilteredUsersPipe implements PipeTransform {
  transform(users: User[], searchText: string): User[] {
    if (!users) {
      return [];
    }
    if (!searchText) {
      return users;
    }
    searchText = searchText.toLocaleLowerCase();

    return users.filter((it) => {
      return it.username.toLocaleLowerCase().includes(searchText);
    });
  }
}
