import "./create.css"
import "./dashboard.css"

import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import api from "./api"

// SAMPLE API TESTING
// {   
//     "category": "dailybugle",  
//     "inventories": 
//         [{       
//             "name": "hello",       
//             "stock": 100,       
//             "notes": "this is a note"     
//         },{       
//             "name": "item 2",       
//             "stock": 50,       
//             "notes": "another note"     
//         }] 
// }

export default function Create() {

    // States and other essential components to be used
    const [toggleCreate, setToggleCreate] = useState(false)

    const [category, setCategory] = useState("") // responsible for all the category to be handled
    const [images, setImages] = useState([]) // responsible for all the images to be handled

    const [inventories, setInventories] = useState([]) // responsible for the inventories to be handled

    const fileRef = useRef()

    // handleCategory: updates the category state from text input
    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    // handleSubmit: gather form data, validate, and send to backend
    const handleSubmit = async (e) => {
        e.preventDefault()

        // This checks if the input in the category is being filled
        if (!category) {
            window.alert("Please fill the category above first")
            return
        }

        // This creates the api format which will be sent to the backend
        const inventoryData = {
            category: category,
            inventories: inventories
        }

        const formData = new FormData()

        formData.append("category", category)
        formData.append("inventories_json", JSON.stringify(inventoryData))

        // Append each selected file under the same field name 'images'
        // The backend will map images by index to inventory items — ordering matters
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
                        // opening the modal and pre-populating arrays with a blank inventory slot
                        setToggleCreate(true),
                        setInventories(prev => [...prev, {
                            name: "",
                            stock: 0,
                            notes: ""
                        }]),
                        setImages(prev => [...prev, ""]) // placeholder for file corresponding to the new inventory
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
                                            // update the last pushed inventory object's name
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
                                            // update the last pushed inventory object's stock (ensure integer)
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
                                            // replace the placeholder at the same index with the selected File object
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
                                            // update notes for the last pushed inventory
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
