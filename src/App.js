import {Container} from 'react-bootstrap';
import Login from './components/Login.js';
import Memos from './components/Memos.js'
import {createMemo, deleteMemo} from './Services/memos.js';
import {connect} from 'react-redux';
import {initiateLogin, logout} from './modules/user.js'
import {initiateGetMemos} from './modules/memos.js'

function App({
                 dispatch,
                 loginPending,
                 loginFailure,
                 token,
                 getMemosPending,
                 getMemosFailure,
                 memos
             }) {


    function handleError(error) {
        console.log('Ya Dun Goofed');
    }

    function handleRequestMemos() {
        dispatch(initiateGetMemos())
    }

    function handleLoginRequest(username, password) {
        dispatch(initiateLogin({username, password}))
    }


    function handleLogoutRequest() {
        dispatch(logout())
    }

    function handleCreateMemo(memo) {
        createMemo(token, memo).then(data => data.json(), handleError).then(json => {
            console.log(json);
            handleRequestMemos();
        }).catch(handleError)

    }

    function handleDeleteMemo(memo) {
        deleteMemo(token, memo).then(data => data.json(), handleError).then(data => {
            handleRequestMemos();
        }).catch(handleError)
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
                <Login
                    handleLoginRequest={handleLoginRequest}
                    loginFailure={loginFailure}
                    loginPending={loginPending}
                />
            }

        </Container>
    );
}

function mapStateToProps(state) {
    return {...state.user, ...state.memos}
}

export default connect(mapStateToProps)(App);
