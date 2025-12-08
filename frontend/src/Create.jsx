import "./create.css"
import "./dashboard.css"

import { useState } from "react"
import { Link } from "react-router-dom"

export default function Create() {

    const [toggleCreate, setToggleCreate] = useState(false)

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
                <div id="main-create-content">

                    <button id="add-card-overlay">
                        <h1>Add +</h1>
                    </button>

                </div>
            </main>

        </>
    )
}