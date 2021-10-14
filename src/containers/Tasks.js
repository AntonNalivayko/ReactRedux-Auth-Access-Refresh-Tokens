import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Home from './AuthError';
import { IdWorkItem } from '../actions/auth';


const Tasks = ({ IdWorkItem }) => {

    /*************** API URL and TOKEN *******************/
    const accessToken = 'perm:cm9vdA==.NDktMQ==.LFQD3WeI6Jr9SyKbN02s924HLyScsb';
    const apiUrl = 'https://demo-apptrix.myjetbrains.com/youtrack/api/issues/?fields=id,summary,project(name),author(name),duration(presentation),creator(name),updated';

    const authAxios = axios.create({
        baseURL: apiUrl,
        headers: { Authorization: `Bearer ${accessToken}` }
    })

    /***************** Redux Auth Hook ******************/
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    /*************** useState hooks ******************/
    const [tasks, setTasks] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');
    const [requestError, setRequestError] = useState();

    /******************* TimeSheets Hooks *******************/

    const [projectId, setProjectId ] = useState('');

    const tsHeandler = () =>{
        IdWorkItem(projectId);
    }


    /***************** Fetch API ******************/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios.get(`${apiUrl}`);
                setTasks(result.data);
                console.log(tasks)
            } catch (err) {
                setRequestError(err.message);
            }
        };
        fetchData();
       
    }, [])
    
    /************* ON CHANGE INPUT *****************/
    const onChangeHeandler = (text) => {
        let matches = []
        if (text.length > 2) {
            matches = tasks.filter(task => {
                const regex = new RegExp(`${text}`, 'gi');
                return task.project.name.match(regex)
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setText(text)
    }

    return (

        <>
            {!isAuthenticated ? <Home /> :
                <div className='container'>

                    <div class='jumbotron mt-5' style={{ backgroundColor: 'salt' }}>
                        <h1 class='display-4'>Задачи</h1>
                        <p class='lead'>Here loading table Tasks!</p>
                        <hr class='my-4' />
                        <div class='tasks__container' >

                            {/* /************** Search INPUT *************/}
                            <input type='text'
                                class="form-control md-3" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                onChange={(e) => onChangeHeandler(e.target.value)}
                                value={text} style={{ marginBottom: 20 }}
                                placeholder='search for a Project...'
                            />

                            {/* /********* Title Table Tasks **********/}
                            <table class="table">
                                <thead class=''>
                                    <th> ID </th>
                                    <th> SUMMARY </th>
                                    <th> PROJECT NAME</th>
                                    <th> </th>
                                </thead>
                                
                                {/* /********* Search data output ************/}
                                {suggestions && suggestions.map(task => {
                                    return (
                                        <tr key={task.id}>
                                            <td>{task.id}</td>
                                            <td>{task.summary}</td>
                                            <td>{task.project.name}</td>

                                            <td>
                                                <Link  to='/timesheet'
                                                class='btn btn-success' 
                                                role='button'
                                                onMouseDown={()=>setProjectId(task.id.substr(2))} 
                                                onClick={tsHeandler}
                                                >Timesheet</Link>
                                            </td>
                                        </tr>)
                                })}

                                {/* /****************** Output of all tasks ***********************/}
                                {!!suggestions && tasks.map(task => {
                                    return (
                                        <tr key={task.id} >
                                            <td>{task.id}</td>
                                            <td>{task.summary}</td>
                                            <td>{task.project.name}</td>

                                            <td  >
                                                <Link  to='/timesheet'
                                                class='btn btn-success' 
                                                role='button'
                                                onMouseDown={()=>setProjectId(task.id.substr(2))} 
                                                onClick={tsHeandler}
                                                >Timesheet</Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>

                            {/* /************************ ERROR Requess Output ***************************/}
                            {requestError && <p style={{ color: 'red', fontSize: 32 }}>{requestError}</p>}
                        </div>


                    </div>
                </div>
            }
        </>
    )
};

const mapStateToProps = state => ({
    idProject: state.auth.idProject
});

export default connect(mapStateToProps, { IdWorkItem, })(Tasks);