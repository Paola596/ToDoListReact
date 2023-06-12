import React, {useEffect, useState} from "react";

const URLBASE = "https://assets.breatheco.de/apis/fake/todos/user"
const USERBASE = "paolita"

const Home = () => {
	const [ inputValue, setInputValue] = useState({label:"", done:false});
	const [ todos, setTodos] = useState([]);

	const getTask = async() => {
		try {
			let response = await fetch (`${URLBASE}/${USERBASE}`)
			let data = await response.json()

            if (response.status == 404) {
                console.log("Debes crear el usuario")
                createUser()
            } else {
                setTodos(data)
            }
		} catch(error){
			console.log(error)
		}
	}
	
	const createUser = async () => {
        try {
            let response = await fetch(`${URLBASE}/${USERBASE}`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify([])
            })
            if (response.ok) {
                getTask()
            } else {
                console.log(response)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const addNewTask = async (event) => {
        console.log(event.key)

        if (event.key == "Enter") {
            try {
                let response = await fetch(`${URLBASE}/${USERBASE}`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify([...todos, inputValue])
                })
                if (response.ok) {
                    getTask()
                    setInputValue({ label: "", done: false })
                } else {
                    console.log(response)
                }
            } catch (error) {
                console.log(error)
            }
        }
}
const deleteTask = async(item) => {
	console.log(item)
	try {
		let response = await fetch(`${URLBASE}/${USERBASE}`, {
			method: "PUT",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(todos.filter((_, index) => index != item))
		})
		if (response.ok) {
			getTask()
			setValueEntry({ label: "", done: false })
		} else {
			console.log(response)
		}
	} catch (error) {
		console.log(error)
	}
}

	useEffect(() => {
		getTask()
	}, [])

	return (
		<>
			<p>to dos</p>
			<div className="container">
				<ul>
					<li>
						<input 
							type="text" 
							onChange={(e) => setInputValue({...inputValue, [e.target.name]: e.target.value})} 
							value = {inputValue.label} 
							name = "label"
							onKeyPress= {(e) => {
								addNewTask(e);
							}}
							placeholder="What needs to be done?"/>
					</li>
					
					{todos.map((item, index) =>(
						<li key={index}> {item.label} {" "}
						<span onClick={() => deleteTask(index)}>x</span>
						</li>
					))}

				</ul>
				<div className="sumTask"> {todos.length} tasks left </div>
			</div>
		</>
	);
};

export default Home;
