import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import Login from './components/Login.js';
import {useState, useEffect} from 'react';
import Memos from './components/Memos.js'
import {requestLogin} from './Services/user.js';
import {requestMemos, createMemo, deleteMemo} from './Services/memos.js';

function App() {
    const [token, setToken] = useState('');
    const [memos, setMemos] = useState([]);

    function handleError(error) {
        console.log('Ya Dun Goofed');
    }

    function handleRequestMemos() {
        console.log('requesting memos');
        requestMemos(token).then(data => data.json(), handleError).then(json => {
            console.log(json)
            setMemos(json.memo_list)
        }, handleError).catch(handleError)

    }

    useEffect(() => {
        if (token) {
            handleRequestMemos()
        }
    }, [token])

    function handleLoginRequest(username, password) {
        requestLogin({username, password}).then(data => data.json(), handleError).then(json => {
            console.log(json.token)
            if (json.token) {
                setToken(json.token);
            } else {
                console.log(`no token`)
            }
        })


    }




// if (username === 'jhowell' && password === 'password') {
//     setLoggedIn(true);
// }

    function handleLogoutRequest() {
        setToken('');
    }

    async function handleCreateMemo(memo) {
        await createMemo(token, memo).then(data => data.json(), handleError).then(json => {
            console.log(json)
        }).catch(handleError)
        handleRequestMemos();
    }

    async function handleDeleteMemo(memo) {
        await deleteMemo(token, memo).then(data => data.json(), handleError).then(json => {
            console.log(json);
            // setMemos(memos.filter(item => item.id !== memo.id));
            handleRequestMemos();
        })
    }

    return (
        <Container>
            {token ?
                <Memos
                    handleLogoutRequest={handleLogoutRequest}
                    handleCreateMemo={handleCreateMemo}
                    handleDeleteMemo={handleDeleteMemo}
                    memos={memos}
                /> :
                <Login handleLoginRequest={handleLoginRequest}/>
            }
        </Container>
    );
}

export default App;
