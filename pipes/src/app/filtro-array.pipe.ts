import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroArray',
})
export class FiltroArrayPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if (value.length === 0 || args === undefined) {
            return value;
        }

        let filtro = (args[0] as String).toLowerCase();
        return value.filter(
            (v: any) => v.toLocaleLowerCase().includes(filtro)
        );

    }

    // transform(value: any, args?: string): any {
    //     if (value.length === 0 || args === undefined){
    //         return value;
    //     }

    //     let filter = args.toLocaleLowerCase()
    //     return value.filter(
    //         (v: any) => v.toLocaleLowerCase().indexOf(filter) != -1
    //     );
    // }

}
