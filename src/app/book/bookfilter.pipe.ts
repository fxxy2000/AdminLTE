import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookfilter'
})
export class BookfilterPipe implements PipeTransform {

  transform(value: any[], field : any, keyword: any): any {
    if (!value || !field || !keyword) {
      return value;
    }

    let result : any[] = [];
    value.forEach(element => {
      if(element[field] && element[field].toLowerCase().includes(keyword.toLowerCase())) {
        result.push(element);
      }
    })
    return result;
  }
}
