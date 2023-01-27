import React, { useContext } from 'react'
import { Table, Container } from 'reactstrap';
import { AiFillDelete } from 'react-icons/ai'
import styles from './Favourites.module.scss'
import { FavouriteContext } from '../Context/FavouriteContext';
function Favourites() {
    const { fav, setFav } = useContext(FavouriteContext)
    const { setFavCounter } = useContext(FavouriteContext)

    const handleDeleteFromFav = (_id) => {
        if (window.confirm("Delete the item?")) {
            const deleteItem = fav.filter(x => x._id != _id)
            setFav(deleteItem)
            setFavCounter(fav.length)
        }
    }
    return (
        <>
            <div className={styles.tableContainer}>
                <Container>
                    <Table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product's name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fav.map((favv, index) => (
                                    <tr key={index}>
                                        <td><img src={favv.imgUrl} className={styles.img} /></td>
                                        <td>{favv.name}</td>
                                        <td ><AiFillDelete style={{ cursor: "pointer" }} onClick={() => { handleDeleteFromFav(favv._id) }} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>



        </>
    )
}

export default Favourites