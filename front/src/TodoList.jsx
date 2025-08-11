import { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {

    const listaLocalStorage = JSON.parse(localStorage.getItem('Lista'));

    const [lista, setLista] = useState(listaLocalStorage ? listaLocalStorage : []);
    const [novoItem, setNovoItem] = useState('');

    useEffect(()=>{

        localStorage.setItem('Lista de Tarefas', JSON.stringify(lista));
    }, [lista]);
    
    function adicionaItem(form) {

        form.preventDefault();

        if(!novoItem) {

            return;
        }

        setLista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem('');
        document.getElementById('input-entrada').focus();
    }

    function clicou(index) {

        const listaAux = [...lista];

        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {

        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTudo() {

        setLista([]);
    }

    return(
        <div className='todolist-container'>

            <img src="logoSoft.png" alt="" className="logo-soft" />
            <h1>Lista de tarefas</h1>
   
            <form onSubmit={adicionaItem} className='form'>
                <input 
                    id="input-entrada"
                    type="text"
                    value={novoItem}
                    onChange={(e)=> { setNovoItem(e.target.value) }}
                    placeholder="Adicione uma tarefa"
                />
                <button className="Add" type="submit">Add</button>
            </form>
                {
                    lista.length < 1
                    ?
                    <div style={{textAlign:'center', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="divIcon">
                            <img className="icon" src='list-img.jpg' />
                        </div>
                    </div>
                    :
                    <div className="listaTarefas">
                        {

                            lista.map((item, index)=> (
                                
                                <div
                                key={index}
                                className={item.isCompleted ? "item completo" : "item"}
                                >
                            <span onClick={()=>{ clicou(index) }}>{item.text}</span>
                            <button onClick={()=>{ deleta(index) }} className="del">Deletar</button>
                        </div>
                    ))
                }
                </div>
                }
                {
                    lista.length > 0 &&
                    <button onClick={()=> { deletaTudo() }} className="deleteAll">Apagar tudo</button>
                }
        </div>
    );
}

export default TodoList;