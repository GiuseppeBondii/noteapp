import './ToDoList.css';
import React, { useState, useEffect } from 'react';

function ToDoList() {

    const [Elem, setElem] = useState(() =>{
        const savedElements = localStorage.getItem('Elem');
        return savedElements ? JSON.parse(savedElements) : [];
    });


    const [newElem, setNewElem] = useState({
        elem: "",
        done: false,
        date:"",
        end:""
    });

    useEffect(() => {
            localStorage.setItem('Elem', JSON.stringify(Elem));
        }, [Elem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (newElem.elem.trim() === "") {
            return;
        }

        const newId = Elem.length;

        setElem([...Elem, { ...newElem, id: newId.toString() , date:"data di aggiunta: "+Date()}]);

        setNewElem({
            elem: "",
            done: false,
        });
    };

    const handleChange = (e) => {
        setNewElem({ ...newElem, elem: e.target.value });
    };

        
    function ischecked(bool, id) {
        return (
            <input 
                type="checkbox" 
                checked={bool} 
                onChange={() => toggleDone(id)} 
            />
        );
    }

    const toggleDone = (id) => {
        setElem(prevElem => 
            prevElem.map(item =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    };

    function printElem(bool, elem,date) {
        return bool ? <p><s>{elem} </s><br></br> <p style={{
            color:'grey',
            'font-size': '0.7rem'
        }}>{date} </p></p> : <p>{elem}<br></br> <p style={{
            color:'grey',
            'font-size': '0.7rem'
        }}>{date} </p></p>;
    }
    
    let del=false;

    function eliminaElementi(){
        if(del){
            for(let i=0; i<Elem.length;i+=1){
                if(Elem[i].done)
                {
                    setElem(prevElem => prevElem.filter(item => item.id !== Elem[i].id));
                }
            };
            del=!del;
        }
    }



    const handleClick = () => {
        del=!del;
        eliminaElementi();
    };


    return (

    <div className='bod'>
    <h1 className='tt'>ToDoList</h1>
    <div>
        {Elem.map(list => (
            <div key={list.id} className='elements'>
                <div className='linea'>
                    {ischecked(list.done, list.id)}
                    {printElem(list.done, list.elem, list.date)}
                </div>
            </div>

        ))}
        <div style={
            {
                'padding-bottom':'40vh'
            }
        }></div>
    </div>
    <div className='insert'>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newElem.elem}
                onChange={handleChange}
                placeholder="Add a new task"
            />
            <div style={{
                display:'flex',
                'flex-direction':'row',
                width: '100%'
            }}>
                <button id='subm' type="submit">+</button>
                <button id='elimina' onClick={handleClick} >&#128465;</button>
            </div>
        </form>
    </div>
    </div>


    );
}

export default ToDoList;