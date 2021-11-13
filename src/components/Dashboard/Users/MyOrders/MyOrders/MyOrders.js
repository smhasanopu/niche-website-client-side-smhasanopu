import React, { useEffect, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';

const MyOrders = () => {
    const [products, setproduct] = useState([]);
    const { user } = useAuth()
    // console.log(services);
    // console.log(products);


    useEffect(() => {
        fetch(`http://localhost:5000/myorders/?email=${user.email}`)
            .then(res => res.json())
            .then(data => setproduct(data))
    }, [user.email]);
    // Delete a products
    const handleDelete = id => {
        const deleteMassege = window.confirm("Delete the item?");
        if (deleteMassege) {
            const url = `http://localhost:5000/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        const remaining = products.filter(product => product._id !== id);
                        setproduct(remaining);

                    }

                })
        }

    }

    // -------------Delete Confirmation
    return (
        <div>
            <h2>ManageProducts</h2>

            <div className="mt-5 MyOrders container">
                <div className="container">
                    <div className="row">
                        <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 g-4">
                            {
                                products.map(product => <div className="p-2 border border-info"
                                    key={product._id}
                                >
                                    <div className="card-group review">
                                        <div className="card text-center">
                                            <img src={product.img} className="card-img-top" alt="Mom/Dad" />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-title">{product._id}</p>
                                                <p className="card-text"> {product.discription}</p>
                                                <p className="card-title">{product._id}</p>
                                                <button className="btn-success">{product.status}</button>
                                            </div>
                                            <div className="card-footer">

                                                <small className="text-muted">
                                                    <button onClick={() => handleDelete(product._id)} className="btn-danger">Delete</button>
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                </div>)
                            }

                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                </div>

            </div >
        </div>
    );
};

export default MyOrders;