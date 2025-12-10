import "./dashboard.css"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import api from "./api"

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false)

  const [showMenu, setShowMenu] = useState(false)
  const [addInventory, setAddInventory] = useState(false)
  const [editInventory, setEditInventory] = useState(false)
  const [deleteInventory, setDeleteInventory] = useState(false)

  const [searchInput, setSearchInput] = useState("")
  const [inventories, setInventories] = useState([])

  async function loadInventories() {
    const res = await api.get("/inventory/view")
    setInventories(res.data)
  }

  useEffect(() => {
    loadInventories()
  }, [refresh])

  const selectionList = ["Hello", "Hi!", "Nice to meet"]

  const handleSearchInput = (e) => {
    e.preventDefault
    setSearchInput(e.target.value)
    console.log(searchInput)
  }

  return (
    <>

      {/* NAVIGATION BAR */}
      <nav>
        <div>
          <h1 id='web-title'>Stockstorage</h1>
        </div>
        <div>
          <button 
            id='menu-btn'
            onClick={() => setShowMenu(prev => !prev)}
          >
            <img src="\menu-icon.png" alt="Menu Icon" />
          </button>
        </div>
      </nav>

        {/* MENU MODAL */}
        {showMenu && (
        <>
            <div id="menu-modal-overlay">
                <div id="menu-modal-content">

                    <Link to="/create" onClick={() => setAddInventory(true)}>
                    <button className="menu-modal-btn">
                        <img src="\add-inventory.png" alt="New Inventory Icon" />
                        <p>New Inventory</p>
                    </button>
                    </Link>

                    <button 
                    className="menu-modal-btn" 
                    onClick={() => setEditInventory(true)}
                    >
                    <img src="\edit-inventory.png" alt="Edit Inventory Icon" />
                    <p>Edit Inventory</p>
                    </button>

                    <button 
                    className="menu-modal-btn" 
                    onClick={() => setDeleteInventory(true)}
                    >
                    <img src="\delete-inventory.png" alt="Delete Inventory Icon" />
                    <p>Delete Inventory</p>
                    </button>

                </div>
            </div>
        </>
        )}

      <main>

        {/* SEARCH BAR */}
        <div id="search-bar">
            <div id="search-bar-content">

            <div id="search-bar-input">
                <input 
                type="text" 
                placeholder='Enter name or category'
                onChange={handleSearchInput}
                />
            </div>

            <div id="search-bar-filter">
                <select name="category">
                <option value="">Filter by...</option>
                { selectionList.map((option, index) => (
                    <option value={option} key={index}>{ option }</option>
                )) }
                </select>
            </div>
            </div>

        </div>

        <div id="dashboard">
            <div id="dashboard-content">
                {inventories.map((category, index) => (
                  <>
                  <h1>{ category.category }</h1>
                    {category.inventories.map((inv, index) => (
                      <>
                        <p>{ inv.name }</p>
                        <p>{ inv.stock }</p>
                        <p>{ inv.notes }</p>
                        <p>{ inv.image_url }</p>
                        <img src={`${inv.image_url}`} alt={ inv.image_url } />
                      </>
                    ))}
                  </>
                ))}
            </div>
        </div>

      </main>

    </>
  )
}