import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const gifts = [
    'CPU i9',
    'RAM 32Gb RBG',
    'RBG keyboard',
]

export default function Shop() {
    const [count, setCount] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/')
        .then(res => {
            return (
                setCount(res.data?.[1])
            )
        })
    }, [])
    console.log(count)

    const [info, setInfo] = useState({
        name: 'Pham Truong Vu',
        age: '22',
        address: 'Son Ha'
    })

    const [gift, setGift] = useState('')

    const handleRamdom = () => {
        const index = Math.floor(Math.random() * gifts.length)
        setGift(gifts[index])
    }

    const handleCount = () => {
        setCount(count + 1)
    }

    const handleUpdate = () => {
        setInfo({
            ...info,
            email: 's2ttts@gmail.com'
        })
    }
    return(
        <div className="list-user-container">
            <h1>{gift || 'chua co phan thuong'}</h1>
            <button type="button" onClick={handleRamdom}>click</button>
            <div></div>
            {count.map(product => ([
                <div key={product.id}>{product.name}</div>
            ]))}
        </div>
    );
}