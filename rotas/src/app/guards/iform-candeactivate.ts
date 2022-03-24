import { Observable } from 'rxjs';

export interface IFormCanDeactivate{
    podeDesativar(): boolean | Observable<boolean>;
}