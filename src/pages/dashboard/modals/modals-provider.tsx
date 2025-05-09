import React, { createContext, useContext, useState } from "react";

// Edit Modal Context
const EditModal = createContext(false)
const UpdEditModal = createContext(() => {})

export function useEditModal () {
  return useContext(EditModal)
}

export function useUpdEditModal () {
  return useContext(UpdEditModal)
}

// Delete Modal Context
const DeleteModal = createContext(false)
const UpdDeleteModal = createContext(() =>{})

export function useDeleteModal () {
  return useContext(DeleteModal)
}

export function useUpdDeleteModal () {
  return useContext(UpdDeleteModal)
}

// Main Return
export function ModalsProvider ({children}: {children: React.ReactNode}) {

  const [edit, setEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const updEditModal = () => {
    if(edit){
      setEdit(false)
    }else{
      setEdit(true)
    }
  }

  const updDeleteModal = () => {
    if(deleteModal){
      setDeleteModal(false)
    }else{
      setDeleteModal(true)
    }
  }

  return(

    <DeleteModal.Provider value={deleteModal}>
      <UpdDeleteModal.Provider value={updDeleteModal}>
        <EditModal.Provider value={edit}>
          <UpdEditModal.Provider value={updEditModal}>
            {children}
          </UpdEditModal.Provider>
        </EditModal.Provider>
      </UpdDeleteModal.Provider>
    </DeleteModal.Provider>

  )

} 