import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Home from './AuthError'

/*************** API URL and TOKEN *******************/
const accessToken = 'perm:cm9vdA==.NDktMQ==.LFQD3WeI6Jr9SyKbN02s924HLyScsb';
const apiUrl = 'https://demo-apptrix.myjetbrains.com/youtrack/api/admin/users/?fields=id,login,name,email';

const authAxios = axios.create({
    baseURL: apiUrl,
    headers: { Authorization: `Bearer ${accessToken}` }
})

const Users = () => {

    /***************** Redux Auth Hook ******************/
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    /*************** useState hooks ******************/
    const [users, setUsers] = useState([]);
    const [requestError, setRequestError] = useState();

    /***************** MODAL HOOKS ***********************/
    const [modalInfo, setModalInfo] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)

    const handleShow = () => {
        setShow(true);
        console.log(modalInfo)
    }
    /******************* Fetch DATA **********************/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios.get(`${apiUrl}`);
                setUsers(result.data);
                console.log(users)
            } catch (err) {
                setRequestError(err.message);
            }
        };
        fetchData();
    }, [])

    /*********** CARD MODAL *************/

    const ModalContent = () => {
        return (
            <Modal show={show} onHide={handleClose} style={{ marginTop: 200 }}>
                <Modal.Header closeButton>
                    <Modal.Title>User data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>ID: {modalInfo.id}</h5>
                    <h5>NAME: {modalInfo.name}</h5>
                    <h5>LOGIN: {modalInfo.login}</h5>
                    <h5>EMAIL: {modalInfo.email}</h5>
                    <h5>TYPE: {modalInfo.$type}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }


    return (

        <>
            {!isAuthenticated ? <Home /> :
                <div className='container'>
                    {show ? <ModalContent /> : null}
                    <div class='jumbotron mt-5'>
                        <h1 class='display-4'>Users Page</h1>
                        <p class='lead'>If click on the button loading table users!</p>
                        <hr class='my-4' />
                        <table class="table">
                            {/**************** Table header *****************/}
                            <thead>
                                <th> ID </th>
                                <th> NAME </th>
                                <th> LOGIN </th>
                                <th> EMAIL </th>
                            </thead>
                            {/* /************************ Map API data ************************/}
                            {users.map(user => {
                                return <tr key={user.id} onClick={handleShow} onMouseDown={() => setModalInfo(user)}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.login}</td>
                                    <td>{user.email}</td>
                                </tr>
                            })}
                        </table>
                        {/********************** Error output **********************/}
                        {requestError && <p style={{ color: 'red' }}>{requestError}</p>}
                    </div>
                </div>
            }
        </>
    )
};

export default Users;
