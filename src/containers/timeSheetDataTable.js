import React from 'react';

const OutTableData = ({ workItems }) => {
    return (
        <tr scope="row" >
            <td><p>{workItems.author.name}</p></td>
            <td>{workItems.duration.presentation}</td>
        </tr>
    )
}

export default OutTableData;
