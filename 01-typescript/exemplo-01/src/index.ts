type Hero = {
    name: string,
    vulgo: string
};

function printObjeto(pessoa: Hero) {
    console.log(pessoa)
}

printObjeto({name:'Bruce Wayne',vulgo:'Batman'});

// decorators

// class decorators
function apiVersion(version: string) {
    return (target: any) => {
        Object.assign(target.prototype, { __version: version, __name: 'leonardo' });
    };
}

// attribute decorator

function minLength(length: number) {
    return (target: any, key: string) => {
        // console.log(target[key])
        let _value = target[key];

        const getter = () => _value;
        const setter = (value: string) => {
            if (value.length < length) {
                throw new Error(`Tamanho da propriedade é menor do que ${length}.`)
            } else {
                _value = value;
            }
        }

        Object.defineProperty(target, key, {
            get: getter,
            set: setter
        });
    }
}

@apiVersion('1.10')
class Api {
    @minLength(3)
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const api = new Api('pra');
console.log(api.__version);
console.log(api.__name);


