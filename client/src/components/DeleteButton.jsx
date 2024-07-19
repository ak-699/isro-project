import React from 'react'
import axios from '../axios/axios';

const DeleteButton = ({ id }) => {

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/files/${id}`, { withCredentials: true })
            console.log(response.data);
        } catch (error) {
            console.log(error);
            console.log(response);
        }
    }
    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeleteButton
