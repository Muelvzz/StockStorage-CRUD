import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [refresh, setRefresh] = useState(false)

  const [showMenu, setShowMenu] = useState(false)
  const [addInventory, setAddInventory] = useState(false)
  const [editInventory, setEditInventory] = useState(false)
  const [deleteInventory, setDeleteInventory] = useState(false)

  // useEffect(() {

  // }, [refresh])

  return (
    <>
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

      { showMenu && (
        <>
          <div id="menu-modal-overlay">
            <div id="menu-modal-content">
              <button className='menu-modal-btn' onClick={() => setAddInventory(true)}>
                <img src="\add-inventory.png" alt="New Inventory Icon" />
                <p>New Inventory</p>
              </button>
              <button className='menu-modal-btn' onClick={() => setEditInventory(true)}>
                <img src="\edit-inventory.png" alt="Edit Inventory Icon" />
                <p>Edit Inventory</p>
              </button>
              <button className='menu-modal-btn' onClick={() => setDeleteInventory(true)}>
                <img src="\delete-inventory.png" alt="Delete Inventory Icon" />
                <p>Delete Inventory</p>
              </button>
            </div>
          </div>
        </>
      ) }

    </>
  )
}

export default App
