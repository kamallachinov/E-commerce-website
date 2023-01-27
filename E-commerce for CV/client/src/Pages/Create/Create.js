import React from 'react'
import { Helmet } from "react-helmet";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import styles from './Create.module.scss'
function Create() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create Product</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className={styles.formikContainer}>
                <Formik
                    initialValues={{ imgUrl: '', name: '' }}
                    validationSchema={Yup.object({
                        imgUrl: Yup.string()
                            .min(25, 'Must be 25 characters or more')
                            .required('Required'),
                        name: Yup.string()
                            .max(10, 'Must be 10 characters or less')
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                        resetForm()
                        const myObj = {
                            imgUrl: values.imgUrl,
                            name: values.name
                        }
                        axios.post("http://localhost:5555/products", myObj)

                    }}
                >
                    {(formik, values) => (
                        <div className={styles.mainDiv}>
                            <form onSubmit={formik.handleSubmit} className={styles.form}>
                                <label htmlFor="imgUrl">imgUrl</label>
                                <input
                                    id="imgUrl"
                                    type="text"
                                    {...formik.getFieldProps('imgUrl')}
                                />
                                {formik.touched.imgUrl && formik.errors.imgUrl ? (
                                    <div>{formik.errors.imgUrl}</div>
                                ) : null}

                                <label htmlFor="name">name</label>
                                <input
                                    id="name"
                                    type="text"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div>{formik.errors.name}</div>
                                ) : null}


                                <button type="submit" className={styles.btn}>Submit</button>
                            </form>
                        </div>
                    )}
                </Formik>
            </div>




        </>
    )
}

export default Create