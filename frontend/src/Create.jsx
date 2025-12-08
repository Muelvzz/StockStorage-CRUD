import "./create.css"
import "./dashboard.css"

import { useState, useRef } from "react"
import { Link } from "react-router-dom"

export default function Create() {

    const [toggleCreate, setToggleCreate] = useState(false)

    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState("")
    const [notes, setNotes] = useState("")

    const fileRef = useRef()

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleStock = (e) => {
        setStock(e.target.value)
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleNotes = (e) => {
        setNotes(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (category !== "") {
            setName("")
            setStock(0)
            setImage("")
            setNotes("")

            setToggleCreate(false)
        } else {
            setToggleCreate(false)
            window.alert("please fill the category above first")
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
                        type="text" 
                        placeholder="Enter the Category Name"
                        id="category-btn"
                        value={category}
                        onChange={handleCategory}
                    />
                </div>

                <div id="main-create-content">

                    <button id="add-card-overlay" onClick={() => setToggleCreate(true)}>
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
                                        type="file"
                                        ref={fileRef}
                                        onChange={handleImage}
                                        required
                                    />
                                </div>
                                <textarea
                                    rows={5}
                                    placeholder="Enter your notes (Optional)"
                                    value={notes}
                                    onChange={handleNotes}
                                ></textarea>

                                <button 
                                    id="add-btn" 
                                    onClick={() => {handleSubmit}}
                                >Add</button>
                            </form>

                        </div>

                    </div>
                )}

            </main>

        </>
    )
}