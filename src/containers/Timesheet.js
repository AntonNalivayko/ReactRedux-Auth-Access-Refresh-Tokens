import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PDF from './Pdf-generate';
import { useSelector } from 'react-redux';
import OutTableData from './timeSheetDataTable';



const Timesheet = () => {
    /*************** API URL and TOKEN *******************/
    const accessToken = 'perm:cm9vdA==.NDktMQ==.LFQD3WeI6Jr9SyKbN02s924HLyScsb';
    const apiUrl = 'https://demo-apptrix.myjetbrains.com/youtrack/api/workItems/';

    const authAxios = axios.create({
        baseURL: apiUrl,
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    /************************ REDUX HOOKS ***************************/
    const isIdProject = useSelector(state => state.auth.idProject.toString());

    /*************************** REACT HOOKS ******************************/
    const [workItems, setWorkItems] = useState({});
    const [outpdf, setOutpdf] = useState(true);
    const [requestError, setRequestError] = useState();
    const [outData, setOutData] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await authAxios.get(`${apiUrl}128-${isIdProject}?fields=id,author(name),duration(presentation),creator(name),updated`);
                setWorkItems(result.data);
                console.log('OPA OPA', workItems);
                setOutData(true)
            } catch (err) {
                setRequestError(err.message);
            }
        };
        fetchData();
    }, [])


    return (
        <>
            {outpdf ?
                (
                    <div className='container'>
                        <div class='jumbotron mt-5'>
                            <h1 class='display-4'>Timesheet</h1>
                            <hr class='my-4' />

                            {/* /************** TABLE **********/}

                            <Table Table striped bordered hover size="sm" style={{ borderRadius: 5 }}>
                                <thead class=''>
                                    <th >Name</th>
                                    <th> Timesheet </th>
                                </thead>
                                {outData === false ? <p>Нет данных</p> : <OutTableData workItems={workItems} />}
                            </Table>

                            {/* /****************** BUTTONS *******************/}

                             <Link to='/tasks' class='btn btn-primary btn-lg' role='button' style={{ marginRight: 20 }}>Go back</Link>
                            {outData === true ?
                                <Button variant="success" size='lg' onClick={() => setOutpdf(false)}>Generate in PDF</Button>
                                : <p>Нет данных для конвертации</p>
                            }
                        </div>
                    </div>
                ) : (<PDF workItems={workItems} />)}

        </>

    )
}

export default Timesheet;

