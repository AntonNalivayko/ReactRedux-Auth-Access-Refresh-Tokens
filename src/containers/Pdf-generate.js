import React, { createRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pdf from 'react-to-pdf';


const ref = createRef();

const PDF = ({ workItems }) => {
    return (
        <>
            <div style={{ backgroundColor: 'grey' }}>
                <div className='post' ref={ref} style={{ width: 800, height: 1000, margin: 'auto', display: 'table', padding: 50, textAlign: 'center', backgroundColor: 'white' }}>
                    <h3>Timesheets</h3>

                    <Table Table striped bordered hover size="sm" style={{ borderRadius: 5, textAlign: 'left' }}>
                        <thead class=''>
                            <th > User name</th>
                            <th> Timesheet </th>
                        </thead>
                        <tr scope="row">
                            <td>{workItems.author.name}</td>
                            <td>{workItems.duration.presentation}</td>
                        </tr>
                    </Table>

                </div>

                <Pdf targetRef={ref} filename='post.pdf' style={{ margin: 'auto', maxWidth: 1000 }}>
                    {({ toPdf }) => <Button onClick={toPdf} variant="danger" size='lg' style={{ position: 'fixed', bottom: 60, right: 50 }}>Download this file in PDF format</Button>}
                </Pdf>

                <Link to='/tasks' class='btn btn-success btn-lg' role='button' style={{ position: 'fixed', bottom: 120, right: 50 }}>Go back</Link>
            </div>
        </>

    )
}

export default PDF;
