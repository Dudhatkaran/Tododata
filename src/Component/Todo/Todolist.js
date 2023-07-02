import React, { useState } from 'react'
import "./Todolist.css";


const getlocalitems = () => {
    let list = localStorage.getItem('lists')
    // console.log('list::: ', list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }

}

const Todolist = () => {

    const [inputdata, setInputData] = useState("")
    const [items, setItems] = useState(getlocalitems());
    const [togglesubmit, setTogglesubmit] = useState(true);
    const [isEdititem, setIsEdititem] = useState(null);
    const [updateId, setUpdateId] = useState(0);

    const addItem = () => {
        if (!inputdata) {
            alert("please fill the data")
        } else if (inputdata && !togglesubmit) {
            setItems(
                items.map((ele) => {
                    if (ele.id === isEdititem) {
                        return { ...ele, name: inputdata }
                    }
                    return ele;
                })
            )
            setTogglesubmit(true)
            setInputData("")
            setIsEdititem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputdata }
            setItems([...items, allInputData])
            setInputData('')
        }
    }

    const deleteItem = (index) => {
        const updateditems = items.filter((ele) => {
            return index !== ele.id;
        });
        setItems(updateditems)
    }

    const editItem = (id, index) => {
        let newEditItem = items.find((ele) => {
            return ele.id === id
        });
        // console.log('newEditItem::: ', newEditItem);

        setTogglesubmit(false)
        // console.log('setTogglesubmit::: ', togglesubmit);
        setInputData(newEditItem.name)
        setIsEdititem(id);
        setUpdateId(index)
    }

    const updateData = () => {
        items[updateId] = { id: isEdititem, name: inputdata }
        setItems([...items])
        setInputData("")
        setTogglesubmit(true)
    }

    return (
        <>
            <div>
                <div className="header">
                    <h2 style={ { margin: 5 } }>My To Do List</h2>
                    <input type="text" value={ inputdata }
                        onChange={ (e) => setInputData(e.target.value) } placeholder="Title..." />
                    {
                        togglesubmit ?
                            <span onClick={ addItem } className="addBtn">Add</span>
                            :
                            <span onClick={ updateData } className="addBtn">Edit</span>
                    }

                </div>
                <ul className='hello'>
                    { console.log(items) }
                    {
                        items.map((ele, index) => {
                            return (
                                <ul key={ ele.id }>
                                    <li>{ ele.name }
                                        <span style={ { marginRight: "90px" } } onClick={ () => editItem(ele.id, index) } class="close">Edit</span>
                                        <span onClick={ () => deleteItem(ele.id) } class="close">Remove</span>
                                    </li>
                                </ul>
                            )
                        })
                    }

                </ul>
            </div>

        </>
    )
}

export default Todolist
