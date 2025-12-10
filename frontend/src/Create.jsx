import "./create.css"
import "./dashboard.css"

import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
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

    // Main states
    const [toggleCreate, setToggleCreate] = useState(false)
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [inventories, setInventories] = useState([])

    // Modal states
    const [name, setName] = useState("")
    const [stock, setStock] = useState(0)
    const [notes, setNotes] = useState("")

    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState([])

    const fileRef = useRef()
    const navigate = useNavigate()

    // ===========================
    // Universal Input Handlers
    // ===========================
    const handleCategory = (e) => setCategory(e.target.value)
    const handleName = (e) => setName(e.target.value)
    const handleStock = (e) => setStock(e.target.value)
    const handleNotes = (e) => setNotes(e.target.value)

    // ===========================
    // Image Handler
    // ===========================
    const handleImage = (e) => {
        const files = Array.from(e.target.files)
        setImage(files[0])

        const urls = files.map(f => URL.createObjectURL(f))
        setPreview(prev => [...prev, ...urls])
    }

    // ===========================
    // Submit category + inventories
    // ===========================
    const handleSubmit = async () => {

        if (!category) {
            window.alert("Please fill the category above first")
            return
        }

        const inventoryData = { category, inventories }

        const formData = new FormData()
        formData.append("category", category)
        formData.append("inventories_json", JSON.stringify(inventoryData))

        images.forEach(img => formData.append("images", img))

        try {
            await api.post("/inventory/create", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            window.alert("Successfully saved!")
            navigate("/")
        } catch (err) {
            console.error("UPLOAD ERROR:", err)
            window.alert("Error uploading inventory")
        }
    }

    // ===========================
    // Add Inventory Handler
    // ===========================
    const handleInventory = (e) => {
        e.preventDefault()

        // Add inventory object
        setInventories(prev => [...prev, { name, stock, notes }])

        // Attach image
        setImages(prev => [...prev, image])

        // Close modal
        setToggleCreate(false)

        // Reset fields
        setName("")
        setStock("")
        setNotes("")
        setImage(null)
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
                        <button id='menu-btn'>
                            <img src="\arrow-back.png" alt="Arrow Back Icon" />
                        </button>
                    </Link>
                </div>
            </nav>

            <main id="main-create-overlay">

                {/* CATEGORY INPUT */}
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

                    {/* INVENTORY LIST */}
                    {inventories.length > 0 &&
                        inventories.map((inv, index) => (
                            <div key={index} className="card-content">
                                <div className="card-left">
                                    <img src={preview[index]} alt={inv.name} />
                                </div>
                                <div className="card-right">
                                    <p>{inv.name}</p>
                                    <p>{inv.stock}</p>
                                    <p>{inv.notes}</p>
                                </div>
                            </div>
                        ))
                    }

                    {/* OPEN MODAL BUTTON */}
                    <button id="add-card-overlay" onClick={() => setToggleCreate(true)}>
                        <h1>Add +</h1>
                    </button>

                </div>

                <button id="add-btn" onClick={handleSubmit}>
                    Submit
                </button>

                {/* MODAL */}
                {toggleCreate && (
                    <div id="modal-overlay">
                        <div id="modal-content">

                            {/* HEADER */}
                            <div id="modal-header">
                                <h2>Add Inventory</h2>
                                <button id="cancel-btn" onClick={() => setToggleCreate(false)}>Cancel</button>
                            </div>

                            <hr />

                            {/* MODAL FORM */}
                            <form id="modal-form" onSubmit={handleInventory}>
                                
                                <div id="modal-input">
                                    <h3>Name:</h3>
                                    <input 
                                        name="name"
                                        type="text"
                                        placeholder="Enter the Inventory Name"
                                        value={name}
                                        onChange={handleName}
                                        required
                                    />
                                </div>

                                <div id="modal-input">
                                    <h3>Stock:</h3>
                                    <input 
                                        name="stock"
                                        type="number"
                                        placeholder="Enter the number of stocks"
                                        value={stock}
                                        onChange={handleStock}
                                        required
                                    />
                                </div>

                                <div id="modal-input">
                                    <h3>Image:</h3>
                                    <input 
                                        name="images"
                                        type="file"
                                        ref={fileRef}
                                        onChange={handleImage}
                                        required
                                    />
                                </div>

                                <textarea
                                    name="notes"
                                    rows={5}
                                    placeholder="Enter your notes (Optional)"
                                    value={notes}
                                    onChange={handleNotes}
                                />

                                <button id="add-btn">Add</button>

                            </form>

                        </div>
                    </div>
                )}

            </main>
        </>
    )
}