import {useState, useEffect, use} from 'react';
import Cookies from 'js-cookie'
import { redirect, Link } from 'react-router-dom';
import './index.css';

const Dashboard = () => {
    const token = Cookies.get('jwt_token');
    if (token === undefined){
        <redirect to = '/login' />
    }
    
    const [cardList, setList] = useState([])
    useEffect(() => {
        const getData = async () => {
            let token = Cookies.get('jwt_token')
            const url = `http://localhost:3000/dashboard`
            const opt = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            const response = await fetch(url, opt)
            const data = await response.json()
            //console.log(data)
            
            if (response.ok){
                setList(data)
            }
        }
        getData();
    }, [])

    const renderCardview = () => {
        console.log(cardList);
        return (
            <ul className='dash-list-items'>
                {cardList.map(each => (
                    <Link className='card-link' key = {each.id} to = {`/map/${each.id}`} >
                        <li>
                            <h1 className='card-item'>{each.location}</h1>
                        </li>
                    </Link>
                ))}
            </ul>
        )
    }

    return (
        <div className='dash-con'>
            <h1 className='head'>Select the city to view in Maps</h1>
            {renderCardview()}
        </div>
    )
}
export default Dashboard;