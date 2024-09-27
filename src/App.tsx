import {useCallback, useEffect} from 'react'
import './App.css'

function App() {

    const cadesplugin: any = window['cadesplugin' as any];

    useEffect(() => {
        var canPromise = !!window.Promise;
        if(canPromise) {
            cadesplugin.then(function () {
                    console.log('Успешно получен доступ к плагину')
                },
                function(err: any) {
                    console.log(err)
                }
            );
        } else {
            window.addEventListener("message", function (event){
                    if (event.data == "cadesplugin_loaded") {
                        console.log('Успешно получен доступ к плагину')
                    } else if(event.data == "cadesplugin_load_error") {
                        console.log('не получен доступ к плагину')
                    }
                },
                false);
            window.postMessage("cadesplugin_echo_request", "*");
        }
    }, []);

    const handleClick = useCallback(() => {
        console.log(cadesplugin)
    }, [])


  return (
    <>
      <button onClick={() => handleClick()}>Check</button>
    </>
  )
}

export default App
