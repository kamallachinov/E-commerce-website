import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Products.module.scss";
import { useNavigate } from "react-router-dom";
import { GrFavorite } from 'react-icons/gr'
import { FavouriteContext } from "../Context/FavouriteContext";
function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [sort, setSort] = useState(false);
    const [search, setSearch] = useState("")
    const { fav, setFav } = useContext(FavouriteContext)
    const { favCounter, setFavCounter } = useContext(FavouriteContext)
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:5555/products")
            .then((res) => setProducts(res.data));
        setIsloading(false);
    }, []);
    if (isLoading) {
        return <h2>Loading datas...</h2>;
    }
    const handleDelete = (id) => {
        if (window.confirm("Delete this item")) {
            axios.delete(`http://localhost:5555/products/${id}`);
            let deleteItem = products.filter((item) => item._id != id);
            setProducts(deleteItem);
            setFavCounter(fav.length)
        }
    };
    const handleView = (id) => {
        navigate(`/products/view/${id}`);
    };
    const handleSort = () => {
        setSort(!sort);
    };
    const handleFav = (favItem) => {
        if (fav.find(x => x._id == favItem._id)) {
            alert("Already fav")
        } else {
            setFav([...fav, favItem])
        }
        setFavCounter(fav.length)
    }
    return (
        <>
            <div className={styles.productsContainer}>

                <Container>
                    <div className={styles.textCenter}>
                        <h2>Products</h2>
                        <button className={styles.btn} onClick={handleSort}>
                            Sort by name
                        </button>
                        <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search...' />
                    </div>
                    <Row className={styles.roww}>
                        {sort === false
                            ? products
                                .filter(product => search == "" ? product : product.name.toLowerCase().includes(search.toLowerCase()))
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((product) => (
                                    <Col
                                        xs={12}
                                        md={4}
                                        lg={4}
                                        sm={12}
                                        key={product._id}
                                        className={styles.coll}
                                    >
                                        <img src={product.imgUrl} alt="someImg" />
                                        <h2>{product.name}</h2>
                                        <div>
                                            <button
                                                className={styles.btn}
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className={styles.btn}
                                                onClick={() => handleView(product._id)}
                                            >
                                                View
                                            </button>
                                            <button className={styles.btn} onClick={() => handleFav(product)}><GrFavorite /></button>
                                        </div>
                                    </Col>
                                ))
                            : products
                                .filter(product => search == "" ? product : product.name.toLowerCase().includes(search.toLowerCase()))

                                .map((product) => (
                                    <Col
                                        xs={12}
                                        md={4}
                                        lg={4}
                                        sm={12}
                                        key={product._id}
                                        className={styles.coll}
                                    >
                                        <img src={product.imgUrl} alt="someImg" />
                                        <h2>{product.name}</h2>
                                        <div>
                                            <button
                                                className={styles.btn}
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className={styles.btn}
                                                onClick={() => handleView(product._id)}
                                            >
                                                View
                                            </button>
                                            <button className={styles.btn} onClick={() => handleFav(product)}><GrFavorite /></button>
                                        </div>
                                    </Col>
                                ))}
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Products;
