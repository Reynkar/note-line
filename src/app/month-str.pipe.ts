import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'monthstr'
})
export class MonthString implements PipeTransform {
    transform(value: string): string {
        let splitted = value.split(" ");
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let monthstr = monthNames[+splitted[1]];
        return (splitted[0] + " " + monthstr);
    }
}