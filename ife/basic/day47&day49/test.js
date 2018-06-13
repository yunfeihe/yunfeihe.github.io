function FPromise(func) {
    let obj = {
        resolve: 1,
        reject: -1,
    }
    let resolveFunc = function(){obj.resolve()};
    let rejectFunc = function(){obj.reject()};
    func(resolveFunc, rejectFunc);
    let p = {
        then: function(func) {
            obj.resolve = func;
            return p;
        },
        catch(func) {
            obj.reject = func;
        }
    };
    return p;
}

function asyncFoo() {
    return FPromise(function(resolve, reject) {
        setTimeout(function () {
            resolve('Async Hello world');
        }, 1);
    });
}

asyncFoo().then(function(result) {
    console.log('ok');
});