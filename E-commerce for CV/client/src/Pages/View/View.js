import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './View.module.scss'
function View() {
    let { supId } = useParams()
    const navigate = useNavigate()
    const [details, setDetails] = useState([])
    const [isLoading, setIsloading] = useState(true)
    useEffect(() => {
        axios.get(`http://localhost:5555/products/${supId}`)
            .then(res => setDetails(res.data))
        setIsloading(false)
    }, [])
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <>

            <div className={styles.mainDiv}>

                <div >
                    <h2> Detailed view</h2>
                </div>
                <Col xs={12} md={4} lg={4} sm={12} key={details._id}>
                    <img src={details.imgUrl} alt='someImg' className={styles.img} />
                    <h2>{details.name}</h2>
                    <button className={styles.btn} onClick={() => navigate('/')}>Go to products</button>
                </Col>
            </div>
        </>
    )
}

export default View