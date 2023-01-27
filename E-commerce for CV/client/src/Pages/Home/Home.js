import React from 'react'
import { Helmet } from "react-helmet";
import Products from '../Products/Products';

function Home() {


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Products />


        </>
    )
}

export default Home