import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CompanyCard from './CompanyCard'
import { useEffect } from "react";
import axios from "axios";
import { SET_COLLECTIONS } from "../../../redux-store/adminStore.slice";

const CompanyGrid = () => {
    const dispatch = useDispatch();
    // const [collections, setCollections] = useState([]);
    useEffect(() => {
        fetchCollections();
        async function fetchCollections() {
            const axiosData = await axios.get("http://localhost:3690/api/v1/collections")
            if (axiosData.data.success === true) {
                return dispatch(SET_COLLECTIONS(axiosData?.data?.collections));
                // const sortedCollections = [...axiosData?.data?.collections].sort((a, b) =>
                //     b.updatedAt.toLocaleString().localeCompare(a.updatedAt.toLocaleString())
                // );
                // setCollections(sortedCollections);
            }
            return;
        }
    }, []);

    const collections = useSelector(state => state.adminStore.collections)

    if (collections.length === 0) return (
        <h1 className='h-[80%] overflow-auto flex flex-wrap gap-5 items-center justify-evenly p-5 dark:text-white font-bold text-3xl'>Loading</h1>
    )

    return (
        <div className="h-[80%] overflow-auto flex flex-wrap items-start justify-evenly p-5">
            {collections?.map((collection) => (
                <CompanyCard key={collection._id} {...collection} />
            ))}
        </div>
    )
}

export default CompanyGrid;