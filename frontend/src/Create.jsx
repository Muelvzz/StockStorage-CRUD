import "./create.css"
import "./dashboard.css"

import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import api from "./api"

// SAMPLE API TESTING
// {   
//     "category": "dailybugle",  
//     "inventories": 
//         [     {       
//             "name": "hello",       
//             "stock": 100,       
//             "notes": "this is a note"     
//         },     {       
//             "name": "item 2",       
//             "stock": 50,       
//             "notes": "another note"     
//         }   ] 
// }

export default function Create() {

    const [toggleCreate, setToggleCreate] = useState(false)

    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])

    const [inventories, setInventories] = useState([])

    const fileRef = useRef()

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!category) {
            window.alert("Please fill the category above first")
            return
        }

        const inventoryData = {
            category: category,
            inventories: inventories
        }

        const formData = new FormData()

        formData.append("category", category)
        formData.append("inventories_json", JSON.stringify(inventoryData))

        images.forEach((img) => {
            formData.append("images", img)
        })

        try {
            const res = await api.post("/inventory/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            console.log("SUCCESS:", res.data)
            setToggleCreate(false)
        } catch (err) {
            console.error("UPLOAD ERROR:", err)
            window.alert("Error uploading inventory")
        }
    }

    return (
        <>

            {/* NAVIGATION BAR */}
            <nav>
                <div>
                    <h1 id='web-title'>Stockstorage</h1>
                </div>
                <div>
                    <Link to={"/"}>
                        <button 
                            id='menu-btn'
                        >
                            <img src="\arrow-back.png" alt="Arrow Back Icon" />
                        </button>
                    </Link>
                </div>
            </nav>

            <main id="main-create-overlay">

                <div id="main-create-header">
                    <input 
                        name="category"
                        type="text" 
                        placeholder="Enter the Category Name"
                        id="category-btn"
                        value={category}
                        onChange={handleCategory}
                    />
                </div>

                <div id="main-create-content">

                    <button id="add-card-overlay" onClick={() => {
                        setToggleCreate(true),
                        setInventories(prev => [...prev, {
                            name: "",
                            stock: 0,
                            notes: ""
                        }]),
                        setImages(prev => [...prev, ""])
                        }}>
                        <h1>Add +</h1>
                    </button>

                </div>

                { toggleCreate && (
                    <div id="modal-overlay">

                        <div id="modal-content">
                            <div id="modal-header">
                                <h2>Add Inventory</h2>
                                <button id="cancel-btn"  onClick={() => setToggleCreate(false)}>Cancel</button>
                            </div>

                            <hr />

                            <form onSubmit={handleSubmit} id="modal-form">
                                <div id="modal-input">
                                    <h3>Name:</h3>
                                    <input 
                                        name="name"
                                        type="text"
                                        placeholder="Enter the Inventory Name"
                                        onChange={(e) => {
                                            setInventories(prev => {
                                                const updated = [...prev];
                                                updated[updated.length - 1].name = e.target.value
                                                return updated
                                            })
                                        }}
                                        required
                                    />
                                </div>
                                <div id="modal-input">
                                    <h3>Stock:</h3>
                                    <input 
                                        name="stock"
                                        type="number"
                                        placeholder="Enter the number of stocks"
                                        onChange={(e) => {
                                            setInventories(prev => {
                                                const updated = [...prev];
                                                updated[updated.length - 1].stock = parseInt(e.target.value)
                                                return updated
                                            })
                                        }}
                                        required
                                    />
                                </div>
                                <div id="modal-input">
                                    <h3>Image:</h3>
                                    <input 
                                        name="images"
                                        type="file"
                                        ref={fileRef}
                                        onChange={(e) => {
                                            setImages(prev => {
                                                const updated = [...prev];
                                                updated[updated.length - 1] = e.target.files[0];
                                                return updated;
                                            });
                                        }}
                                        required
                                    />
                                </div>
                                <textarea
                                    name="notes"
                                    rows={5}
                                    placeholder="Enter your notes (Optional)"
                                        onChange={(e) => {
                                            setInventories(prev => {
                                                const updated = [...prev];
                                                updated[updated.length - 1].notes = e.target.value
                                                return updated
                                            })
                                        }}
                                ></textarea>

                                <button 
                                    id="add-btn" 
                                >Add</button>
                            </form>

                        </div>

                    </div>
                )}

            </main>

        </>
    )
}